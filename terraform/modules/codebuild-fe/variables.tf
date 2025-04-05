variable "environment" {
  description = "The name of environment"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type = string
}

variable "fe_repo_name" {
  description = "Front-end repo name"
  type = string
}

variable "compute_type" {
  type = string
  description = "Information about the compute resource the project build projects will use."
  default = "BUILD_GENERAL1_SMALL"
}

variable "codebuild_role_arn" {
  type = string
  description = "Codebuild role arn"
}
