variable "environment" {
  description = "the name of environment"
  type        = string
  default     = ""
}

variable "is_certificate_transparency_logging_preference" {
  description = "Specifies whether certificate details should be added to a certificate transparency log"
  type        = bool
  default     = true
}

variable "domain_name" {
  description = "The domain name of Route53"
  type        = string
}

variable "subject_alternative_names" {
  description = "A list of domains that should be SANs in the issue certificate"
  type        = list(string)
  default     = []
}

variable "validate_method" {
  description = "Which method to use for validation. DNS or EMAIL are valid, NONE can be used for certificates that were imported into ACM and then into Terraform."
  type        = string
  default     = "DNS"

  validation {
    condition     = contains(["DNS", "EMAIL", "NONE"], var.validate_method)
    error_message = "Valid values are DNS, EMAIL or NONE."
  }
}

variable "validation_record_fqdns" {
  description = "When validation is set to DNS and the DNS validation records are set externally, provide the fqdns for the validation"
  type        = list(string)
  default     = []
}

variable "route53_zone_id" {
  description = "The ID of the hosted zone to contain this record. Required when validation via Route53"
  type        = string
}

variable "dns_ttl" {
  description = "The time to live of dns cache"
  type        = number
  default     = 60
}
