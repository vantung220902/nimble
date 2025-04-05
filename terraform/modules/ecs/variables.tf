variable "aws_account_id" {
  description = "AWS Account Id"
  type = string
}

variable "cluster_name" {
  description = "Cluster name"
  type = string
}

variable "environment" {
  description = "Environment Name"
  type = string
}

variable "aws_region" {
  type = string
  description = "Region"
}

variable "role_suffix" {
  description = "Role suffix"
  type = string
}
