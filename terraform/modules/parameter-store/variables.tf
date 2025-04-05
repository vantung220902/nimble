variable "environment" {
  description = "the name of Environment"
  type        = string
  default     = "development"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "aws_account_id" {
  description = "AWS Account id"
  type        = string
}

variable "node_env" {
  description = "Node Env"
  type = string
  default = "production"
}
