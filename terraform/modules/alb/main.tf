resource "aws_alb" "public_alb" {
  name               = "alb-${var.project_name}-api-${var.environment}"
  internal           = false
  load_balancer_type = "application"
  idle_timeout       = 60
  security_groups    = var.public_sg_ids
  subnets            = var.public_subnet_ids
  ip_address_type    = "ipv4"
  tags = {
    Environment = var.environment
    Name        = "alb-${var.project_name}-api-${var.environment}"
  }
}

resource "aws_alb_listener" "http_listener" {
  load_balancer_arn = aws_alb.public_alb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type = "redirect"
    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
  tags = {
    Environment = var.environment
  }

}

resource "aws_alb_listener" "https_listener" {
  load_balancer_arn = aws_alb.public_alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = var.ssl_policy_name
  certificate_arn   = var.acm_certificate_arn
  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "Fixed response content"
      status_code  = "503"
    }
  }
}

resource "aws_route53_record" "alb_record_alias" {
  zone_id = var.route53_zone_id
  name    = var.api_url
  type    = "A"
  alias {
    name                   = aws_alb.public_alb.dns_name
    zone_id                = aws_alb.public_alb.zone_id
    evaluate_target_health = true
  }
}
