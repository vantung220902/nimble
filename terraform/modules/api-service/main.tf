resource "aws_ecr_repository" "repository" {
  name                 = "${var.project_name}-${var.service_name}-${var.environment}"
  image_tag_mutability = var.image_tag_mutability
  image_scanning_configuration {
    scan_on_push = var.is_scan_on_push
  }

  tags = {
    Name        = "ecr-${var.project_name}-${var.service_name}-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_ecr_lifecycle_policy" "repository_policy" {
  repository = aws_ecr_repository.repository.name
  policy     = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 7 images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 7
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}

resource "aws_lb_target_group" "target_group" {
  name        = "${var.project_name}-${var.service_name}-tg"
  port        = var.container_port
  protocol    = "HTTP"
  target_type = "ip"
  health_check {
    path                = "/${var.api_prefix}/health"
    protocol            = "HTTP"
    port                = var.container_port
    timeout             = 5
    healthy_threshold   = 5
    unhealthy_threshold = 2
    interval            = 30
  }
  vpc_id = var.vpc_id

  tags = {
    Name        = "tg-${var.project_name}-${var.service_name}-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_lb_target_group" "target_group_green" {
  name        = "${var.project_name}-${var.service_name}-tg-green"
  port        = var.container_port
  protocol    = "HTTP"
  target_type = "ip"
  health_check {
    path                = "/${var.api_prefix}/health"
    protocol            = "HTTP"
    port                = var.container_port
    timeout             = 5
    healthy_threshold   = 5
    unhealthy_threshold = 2
    interval            = 30
  }
  vpc_id = var.vpc_id
  tags = {
    Name        = "tg-green-${var.project_name}-${var.service_name}-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_ecs_task_definition" "task_definition" {
  family                   = "${var.project_name}-${var.api_prefix}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = var.ecs_task_execution_role_arn
  skip_destroy             = true
  container_definitions = jsonencode([
    {
      name   = "${var.project_name}-${var.api_prefix}"
      image  = "${aws_ecr_repository.repository.repository_url}:${var.environment}"
      cpu    = var.container_cpu
      memory = var.container_memory
      portMappings = [
        {
          protocol      = "tcp"
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ]
    }
  ])

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  tags = {
    Name        = "task-def-${var.project_name}-${var.service_name}-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_lb_listener_rule" "service_rule" {
  listener_arn = var.https_listener_arn
  priority     = var.routing_priority

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
  condition {
    path_pattern {
      values = ["/${var.api_prefix}", "/${var.api_prefix}/", "/${var.api_prefix}/*"]
    }
  }
}

resource "random_password" "api_key" {
  special = false
  length  = 32
}

resource "aws_ssm_parameter" "api_key" {
  name  = "/${var.project_name}/${var.environment}/API_KEY"
  type  = "String"
  value = random_password.api_key.result

  tags = {
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "app_name" {
  name  = "/${var.project_name}/${var.environment}/APP_NAME"
  type  = "String"
  value = var.app_name
}

resource "aws_ecs_service" "api_service" {
  name                    = "${var.project_name}-${var.api_prefix}"
  cluster                 = var.ecs_id
  task_definition         = aws_ecs_task_definition.task_definition.arn
  enable_ecs_managed_tags = true
  launch_type             = "FARGATE"
  desired_count           = var.min_task_number
  load_balancer {
    target_group_arn = aws_lb_target_group.target_group.arn
    container_name   = "${var.project_name}-${var.api_prefix}"
    container_port   = var.container_port
  }
  network_configuration {
    subnets         = var.private_subnet_ids
    security_groups = var.private_sg_ids
  }
  deployment_controller {
    type = "CODE_DEPLOY"
  }
  lifecycle {
    ignore_changes = [
      task_definition,
      desired_count
    ]
  }
}

resource "aws_codedeploy_app" "codedeploy_app" {
  compute_platform = "ECS"
  name             = "${var.project_name}-${var.repo_name}-application"
}

resource "aws_codedeploy_deployment_group" "deployment_group" {
  app_name               = aws_codedeploy_app.codedeploy_app.name
  deployment_group_name  = "${var.project_name}-${var.repo_name}-deploy-group"
  deployment_config_name = var.deployment_config_name
  service_role_arn       = var.codedeploy_role_arn
  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }
  blue_green_deployment_config {
    deployment_ready_option {
      action_on_timeout = "CONTINUE_DEPLOYMENT"
    }
    terminate_blue_instances_on_deployment_success {
      action                           = "TERMINATE"
      termination_wait_time_in_minutes = 5
    }
  }
  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }
  ecs_service {
    cluster_name = var.ecs_cluster_name
    service_name = aws_ecs_service.api_service.name
  }
  load_balancer_info {
    target_group_pair_info {
      prod_traffic_route {
        listener_arns = [var.https_listener_arn]
      }
      target_group {
        name = aws_lb_target_group.target_group.name
      }
      target_group {
        name = aws_lb_target_group.target_group_green.name
      }
    }
  }
}

resource "aws_appautoscaling_target" "scale_target" {
  service_namespace  = "ecs"
  resource_id        = "service/${var.ecs_cluster_name}/${aws_ecs_service.api_service.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  min_capacity       = var.min_task_number
  max_capacity       = var.max_task_number
}

resource "aws_appautoscaling_policy" "scale_up_policy" {
  name               = "${var.repo_name}-${var.environment}-scale-up-policy"
  service_namespace  = aws_appautoscaling_target.scale_target.service_namespace
  resource_id        = aws_appautoscaling_target.scale_target.resource_id
  scalable_dimension = aws_appautoscaling_target.scale_target.scalable_dimension

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Maximum"
    step_adjustment {
      metric_interval_upper_bound = 0
      scaling_adjustment          = 1
    }
  }
}

resource "aws_appautoscaling_policy" "scale_down_policy" {
  name               = "${var.repo_name}-${var.environment}-scale-down-policy"
  service_namespace  = aws_appautoscaling_target.scale_target.service_namespace
  resource_id        = aws_appautoscaling_target.scale_target.resource_id
  scalable_dimension = aws_appautoscaling_target.scale_target.scalable_dimension

  step_scaling_policy_configuration {
    adjustment_type         = "ChangeInCapacity"
    cooldown                = 60
    metric_aggregation_type = "Maximum"
    step_adjustment {
      metric_interval_upper_bound = 0
      scaling_adjustment          = -1
    }
  }
}

resource "aws_cloudwatch_metric_alarm" "cpu_high" {
  alarm_name          = "ecs-${var.repo_name}-${var.environment}-cpu-high"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 3
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 120
  statistic           = "Maximum"
  threshold           = var.alarm_ecs_high_cpu_threshold
  alarm_description   = "Cluster CPU above threshold"
  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = aws_ecs_service.api_service.name
  }
  alarm_actions = [aws_appautoscaling_policy.scale_up_policy.arn]
}


resource "aws_cloudwatch_metric_alarm" "cpu_low" {
  alarm_name          = "ecs-${var.repo_name}-${var.environment}-cpu-low"
  comparison_operator = "LessThanOrEqualToThreshold"
  evaluation_periods  = 3
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 120
  statistic           = "Average"
  threshold           = var.alarm_ecs_low_cpu_threshold
  alarm_description   = "Cluster CPU below threshold"
  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = aws_ecs_service.api_service.name
  }
  alarm_actions = [aws_appautoscaling_policy.scale_down_policy.arn]
}
