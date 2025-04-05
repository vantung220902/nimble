locals {
  stage = lower(var.environment)
}

resource "aws_ssm_parameter" "stage" {
  name  = "/${var.project_name}/${local.stage}/STAGE"
  value = local.stage
  type  = "String"

  tags = {
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "aws_account_id" {
  name  = "/global/${local.stage}/AWS_ACCOUNT_ID"
  type  = "String"
  value = var.aws_account_id
  tags = {
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "node_env" {
  name  = "/${var.project_name}/${local.stage}/NODE_ENV"
  value = var.node_env
  type  = "String"

  tags = {
    Environment = var.environment
  }
}

