
resource "aws_s3_bucket" "s3_bucket" {
  bucket        = var.bucket_name
  force_destroy = var.is_force_destroy
  tags = {
    Environment = var.environment
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access" {
  bucket                  = aws_s3_bucket.s3_bucket.id
  block_public_acls       = true
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "s3_bucket_versioning" {
  bucket = aws_s3_bucket.s3_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_sse_configuration" {
  bucket = aws_s3_bucket.s3_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_acl" "s3_bucket_acl" {
  bucket     = aws_s3_bucket.s3_bucket.id
  acl        = "private"
  depends_on = [aws_s3_bucket_public_access_block.s3_bucket_public_access]
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_owner_control" {
  bucket = aws_s3_bucket.s3_bucket.id
  rule {
    object_ownership = "ObjectWriter"
  }
}

data "aws_iam_policy_document" "iam_allow_access_to_s3" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalRead"
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions = [
      "s3:GetObject",
    ]
    resources = ["${aws_s3_bucket.s3_bucket.arn}/*"]
    condition {
      test     = "StringLike"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cloudfront_web_cdn.arn]
    }
  }
  statement {
    sid    = "AllowGetPutDeleteObjects"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${var.aws_account_id}:user/terraform_admin"]
    }
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:GetObjectAcl",
      "s3:AbortMultipartUpload",
      "s3:PutObjectAcl"
    ]
    resources = ["${aws_s3_bucket.s3_bucket.arn}/*"]
  }
  statement {
    sid    = "AllowListObjects"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${var.aws_account_id}:user/terraform_admin"]
    }
    actions   = ["s3:ListBucket"]
    resources = ["${aws_s3_bucket.s3_bucket.arn}"]
  }
  depends_on = [aws_s3_bucket.s3_bucket]
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket     = aws_s3_bucket.s3_bucket.id
  policy     = data.aws_iam_policy_document.iam_allow_access_to_s3.json
  depends_on = [aws_s3_bucket_public_access_block.s3_bucket_public_access]
}

resource "aws_s3_bucket_cors_configuration" "s3_bucket_cors" {
  bucket = aws_s3_bucket.s3_bucket.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = [
      "GET",
      "HEAD",
      "PUT",
    ]
    allowed_origins = [
      "http://localhost:6688",
      "https://${var.domain_name}"
    ]
    expose_headers = [
      "x-amz-server-side-encryption",
      "x-amz-request-id",
      "x-amz-id-2"
    ]
    max_age_seconds = 3000
  }
}

resource "aws_cloudfront_origin_access_control" "oac-cdn" {
  name                              = "webstatic"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cloudfront_web_cdn" {
  enabled         = true
  is_ipv6_enabled = var.is_ipv6
  price_class     = var.price_class
  origin {
    origin_id                = "origin-s3-bucket-${aws_s3_bucket.s3_bucket.id}"
    domain_name              = aws_s3_bucket.s3_bucket.bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.oac-cdn.id
  }

  default_root_object = var.default_root_object

  custom_error_response {
    error_code            = 404
    error_caching_min_ttl = 360
    response_code         = 400
    response_page_path    = var.not_found_response_path
  }

  default_cache_behavior {
    allowed_methods = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods  = ["GET", "HEAD"]
    forwarded_values {
      query_string = var.is_forward_query_string
      cookies {
        forward = "none"
      }
    }
    max_ttl                = 1200
    default_ttl            = 300
    min_ttl                = 0
    target_origin_id       = "origin-s3-bucket-${aws_s3_bucket.s3_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = var.acm_certificate_arn
    ssl_support_method  = "sni-only"
  }
  aliases = [var.domain_name]

  tags = {
    Environment = var.environment
  }
}

resource "aws_route53_record" "cdn_record" {
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.cloudfront_web_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.cloudfront_web_cdn.hosted_zone_id
    evaluate_target_health = true
  }
}
