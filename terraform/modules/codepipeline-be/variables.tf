variable "environment" {
  description = "The name of environment"
  type        = string
}

variable "repo_branch" {
  type        = string
  description = "Branch name"
  default     = "develop"
}

variable "repo_name" {
  type        = string
  description = "Repo name"
}

variable "codebuild_name" {
  type        = string
  description = "Codebuild name"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "codepipeline_role_arn" {
  type = string
  description = "Codepipeline role arn"
}

variable "code_star_arn" {
  type        = string
  description = "CodeStar Arn"
}

variable "secret_manager_arn" {
  description = "Secret manager ARN."
  type        = string
}

variable "stage_build" {
  type        = string
  description = "Stage Build"
}

variable "github_path" {
  type        = string
  description = "Gitlab path"
}
