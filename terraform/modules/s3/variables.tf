variable "environment" {
  description = "Environment"
  type        = string
}

variable "project_name" {
  description = "Project Name"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
}

variable "bucket_name" {
  type        = string
  description = "the name of the S3 bucket"
}

variable "is_force_destroy" {
  type        = bool
  description = "A boolean that indicates all objects (including any locked objects) should be deleted from the bucket can be destroy without error. These objects are not recoverable."
  default     = true
}

variable "web_domain_name" {
  description = "Web Domain name"
  type        = string
}

variable "domain_name" {
  description = "Domain name"
  type        = string
}
