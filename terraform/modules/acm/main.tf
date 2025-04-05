resource "aws_acm_certificate" "acm_cert" {
  provider                  = aws.us-east-1
  domain_name               = var.domain_name
  subject_alternative_names = var.subject_alternative_names
  validation_method         = var.validate_method

  options {
    certificate_transparency_logging_preference = var.is_certificate_transparency_logging_preference ? "ENABLED" : "DISABLED"
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "route53_record" {
  for_each = {
    for dvo in aws_acm_certificate.acm_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = var.dns_ttl
  zone_id         = var.route53_zone_id
  type            = each.value.type
  depends_on      = [aws_acm_certificate.acm_cert]
}

resource "aws_acm_certificate_validation" "acm_cert_validation" {
  timeouts {
    create = "15m"
  }
  provider                = aws.us-east-1
  certificate_arn         = aws_acm_certificate.acm_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.route53_record : record.fqdn]
  depends_on              = [aws_route53_record.route53_record]
}
