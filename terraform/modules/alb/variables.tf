variable "environment" {
  type        = string
  description = "Environment"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "route53_zone_id" {
  type        = string
  description = "Route53 Zone Id"
}

variable "api_url" {
  type        = string
  description = "Api url"
}

variable "public_sg_ids" {
  type        = list(string)
  description = "Public security group ids"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "Public subnet ids"
}

variable "acm_certificate_arn" {
  type        = string
  description = "API ACM Certificate ARN"
}

variable "ssl_policy_name" {
  type        = string
  description = "SSL policy name"
  default     = "ELBSecurityPolicy-TLS-1-2-Ext-2018-06"
}
