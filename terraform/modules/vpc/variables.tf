variable "environment" {
  description = "the name of Environment"
  type        = string
  default     = "development"
}

variable "vpc_cidr" {
  description = "the CIDR block of VPC"
  type        = string
}

variable "public_subnets_cidr" {
  type        = list(string)
  description = "the CIDR block for the public subnets"
}

variable "private_subnets_cidr" {
  type        = list(string)
  description = "the CIDR block for the private subnets"
}

variable "database_subnets_cidr" {
  type = list(string)
  description = "the CIDR block for the database subnets"
}

variable "availability_zones" {
  type = list(string)
  description = "the availability zone that resource will be launched"
}

variable "az_shortname" {
  type = list(string)
}

variable "project_name" {
  description = "Project name"
  type = string
}
