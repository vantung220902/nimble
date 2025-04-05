resource "aws_secretsmanager_secret" "secret_manager" {
  name                    = var.secret_name
  recovery_window_in_days = 0
  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Environment = "${var.environment}"
  }
}

variable "example" {
  default = {
    key = "value"
  }

  type = map(string)
}

resource "aws_secretsmanager_secret_version" "example" {
  secret_id     = aws_secretsmanager_secret.secret_manager.id
  secret_string = jsonencode(var.example)
}
