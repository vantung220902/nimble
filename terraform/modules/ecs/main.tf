data "template_file" "ecs_task_execution_iam_role_policy_file" {
  template = file("${path.module}/policy/ecs-task-policy.json")
  vars = {
    aws_account_id = var.aws_account_id
    aws_region     = var.region
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ECSTaskExecutionRole-Fargate${var.role_suffix}-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    Environment = var.environment
  }
}


resource "aws_iam_policy" "ecs_task_execution_policy" {
  name        = "ECS-Task-Execution-Policy${var.role_suffix}-${var.environment}"
  path        = "/"
  description = "Policy that attach to ecs task execution"
  policy      = data.template_file.ecs_task_execution_iam_role_policy_file.rendered

  tags = {
    Environment = var.environment
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecs_task_execution_policy.arn
}

resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${var.cluster_name}-${var.environment}"

  tags = {
    Environment = var.environment

  }
}
