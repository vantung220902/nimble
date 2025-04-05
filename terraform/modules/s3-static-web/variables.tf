variable "environment" {
  description = "The name of environment"
  type        = string
}

variable "aws_account_id" {
  description = "AWS Account Id"
  type = string
}

variable "route53_zone_id" {
  type        = string
  description = "Route53 zone id"
}

variable "domain_name" {
  description = "The domain name of Route53"
  type        = string
}

variable "bucket_name" {
  type        = string
  description = "The bucket name"
}

variable "acm_certificate_arn" {
  type        = string
  description = "API ACM Certificate ARN"
}

variable "default_root_object" {
  type        = string
  description = "Default root index for cloudfront get from s3 bucket"
  default     = "index.html"
}

variable "not_found_response_path" {
  type        = string
  description = "The response content when cloudfront throw error not found resource"
  default     = "/index.html"
}

variable "is_forward_query_string" {
  type        = bool
  description = "Forward the query string to the origin"
  default     = false
}

variable "price_class" {
  type        = string
  description = "Cloudfront price class"
  default     = "PriceClass_All"
}

variable "is_ipv6" {
  type        = bool
  description = "Enable IPv6 on Cloudfront distribution"
  default = false
}

variable "is_force_destroy" {
  type        = bool
  description = "A boolean that indicate all objects (including any locked objects) should be deleted from the bucket can be destroyed without error. these objects are not recoverable."
  default     = true
}


