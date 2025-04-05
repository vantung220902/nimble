output "acm_certificate_arn" {
  description = "the arn of the certificate"
  value       = element(concat(aws_acm_certificate_validation.acm_cert_validation.*.certificate_arn, aws_acm_certificate.acm_cert.*.arn, [""]), 0)

}
