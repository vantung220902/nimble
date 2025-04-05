variable "environment" {
  description = "The name of environment"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "repo_name" {
  type = string
  description = "Repository name"
}

variable "codebuild_role_arn" {
  type = string
  description = "Codebuild role arn"
}

variable "compute_type" {
  type = string
  description = "Information about the compute resource the project build projects will use."
  default = "BUILD_GENERAL1_SMALL"
}

variable "vpc_id" {
  type = string
  description = "VPC Id"
}

variable "private_subnet_ids" {
  type = list(string)
  description = "Private Subnet IDs"
}

variable "private_security_group_ids" {
  type = list(string)
  description = "Private Security groups"
}

