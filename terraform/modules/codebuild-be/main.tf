resource "aws_s3_bucket" "build_log" {
  bucket = "${var.project_name}-${var.repo_name}-${var.environment}-build-log"
}

resource "aws_codebuild_project" "codebuild_project" {
  name          = "${var.repo_name}-build-main"
  description   = "Codebuild for ${var.repo_name}"
  build_timeout = 50
  service_role  = var.codebuild_role_arn

  source {
    type      = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }
  artifacts {
    type = "CODEPIPELINE"
  }
  environment {
    compute_type                = var.compute_type
    image                       = "aws/codebuild/standard:7.0"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode             = true
    type                        = "LINUX_CONTAINER"
  }

  vpc_config {
    vpc_id             = var.vpc_id
    subnets            = var.private_subnet_ids
    security_group_ids = var.private_security_group_ids
  }
  logs_config {
    cloudwatch_logs {
      group_name  = "log-group"
      stream_name = "log-stream"
    }
    s3_logs {
      status   = "ENABLED"
      location = "${aws_s3_bucket.build_log.id}/build-log"
    }
  }
}
