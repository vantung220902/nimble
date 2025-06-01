variable "environment" {
  description = "The name of environment"
  type        = string
}

variable "aws_account_id" {
  description = "AWS Account Id"
  type = string
}

variable "repo_name" {
  type        = string
  description = "Repo name"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "codepipeline_role_arn" {
  type = string
  description = "Codepipeline role arn"
}
