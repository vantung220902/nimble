variable "environment" {
  description = "the name of Environment"
  type        = string
  default     = "development"
}

variable "vpc_id" {
  type        = string
  description = "the vpc id"
}

variable "subnet_id" {
  type        = string
  description = "the subnet id"
}

variable "ami_id" {
  type    = string
  default = "The AMI if jumpbox"
}

variable "availability_zones" {
  type        = list(string)
  description = "the availability zone that resource will be launched"
}

variable "az_shortname" {
  type = list(string)
}

variable "jumpbox_key_pair" {
  description = "Jumbox EC2 key pair name"
  type        = string
}

variable "jumpbox_allowed_ips" {
  description = "Jumpbox EC2 allowed SSH Ips"
  type        = list(string)
}

variable "project_name" {
  description = "Project name"
  type        = string
}
