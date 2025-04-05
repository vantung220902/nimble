variable "environment" {
  description = "The name of environment"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "service_name" {
  description = "Service Name"
  type        = string
}

variable "ecs_task_execution_role_arn" {
  description = "ECS Task Execution Arn"
  type        = string
}

variable "image_tag_mutability" {
  description = "The tag mutability setting for the repository."
  type        = string
  default     = "MUTABLE"
}

variable "is_scan_on_push" {
  description = "Indicate whether images are scanned after being pushed to the repository."
  type        = bool
  default     = true
}

variable "container_port" {
  description = "Container Port"
  type        = number
}

variable "container_cpu" {
  description = "Container CPU"
  type        = number
  default     = 512
}

variable "container_memory" {
  description = "Container RAM"
  type        = number
  default     = 2048
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "routing_priority" {
  description = "Priority of routing"
  type        = string
}

variable "https_listener_arn" {
  description = "Target Group of listener"
  type        = string
}

variable "api_prefix" {
  description = "Api Prefix"
  type        = string
}

variable "app_name" {
  description = "App name"
  type        = string
  default     = "API Service"
}

variable "ecs_id" {
  description = "ECS Id"
  type        = string
}

variable "min_task_number" {
  description = "Minimum task number"
  type        = number
  default     = 1
}

variable "max_task_number" {
  description = "Maximum task number"
  type        = number
  default     = 2
}

variable "private_subnet_ids" {
  type        = set(string)
  description = "The list of private subnet ids"
}

variable "private_sg_ids" {
  type        = set(string)
  description = "The list of private security groups"
}

variable "deployment_config_name" {
  type        = string
  description = "The name of the group's deployment config"
  default     = "CodeDeployDefault.ECSAllAtOnce"
}

variable "codedeploy_role_arn" {
  type        = string
  description = "Codedeploy role arn"
}

variable "codepipeline_role_arn" {
  type        = string
  description = "Codepipeline role arn"
}

variable "ecs_cluster_name" {
  type        = string
  description = "ECS cluster name"
}

variable "aws_account_id" {
  description = "AWS Account Id"
  type        = string
}

variable "repo_name" {
  description = "Repo name"
  type        = string
}

variable "alarm_ecs_high_cpu_threshold" {
  description = "Max threshold average Memory percentage allowed in a 2 minutes interval (use 0 to disable this alarm)."
  default     = 85
}

variable "alarm_ecs_low_cpu_threshold" {
  description = "Min threshold average Memory percentage allowed in a 2 minutes interval (use 0 to disable this alarm)."
  default     = 10
}
