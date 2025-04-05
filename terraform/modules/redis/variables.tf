variable "environment" {
  description = "Environment Name"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "vpc_id" {
  description = "VPC Id"
  type        = string
}

variable "node_type" {
  type        = string
  description = "The instance type of the redis instance"
  default     = "cache.t2.small"
}

variable "parameter_group_name" {
  type        = string
  description = "The parameter group name this redis belong to"
  default     = "default.redis7"
}

variable "private_subnet_ids" {
  type        = set(string)
  description = "The list of private subnet ids"
}
