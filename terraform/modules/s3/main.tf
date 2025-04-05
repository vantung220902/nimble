resource "aws_s3_bucket" "bucket" {
  bucket        = var.bucket_name
  force_destroy = var.is_force_destroy
  tags = {
    Environment = var.environment
  }
}

resource "aws_s3_bucket_cors_configuration" "cors" {
  bucket = aws_s3_bucket.bucket.bucket
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = [
      "GET",
      "HEAD",
      "PUT",
      "POST"
    ]
    allowed_origins = [
      "http://localhost:6688",
      "https://${var.web_domain_name}",
      "*.${var.domain_name}"
    ]
    expose_headers = [
      "x-amz-server-side-encryption",
      "x-amz-request-id",
      "x-amz-id-2",
      "ETag"
    ]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket              = aws_s3_bucket.bucket.id
  block_public_acls   = true
  block_public_policy = true
}

resource "aws_s3_bucket_ownership_controls" "ownership" {
  bucket = aws_s3_bucket.bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_ssm_parameter" "s3_storage" {
  name  = "/${var.project_name}/${var.environment}/AWS_S3_STORAGE_BUCKET"
  value = aws_s3_bucket.bucket.id
  type  = "String"
  tags = {
    Environment = var.environment
  }
}
