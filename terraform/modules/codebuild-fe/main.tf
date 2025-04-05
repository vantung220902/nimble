resource "aws_s3_bucket" "s3_bucket_log" {
  bucket        = "${var.project_name}-${var.fe_repo_name}-${var.environment}-build-log"
  force_destroy = true
  tags = {
    Environment = var.environment
  }
}

resource "aws_codebuild_project" "codebuild_project" {
  name = "${var.fe_repo_name}-build-main"
  description = "Codebuild for ${var.fe_repo_name}"
  build_timeout = 20
  service_role = var.codebuild_role_arn
  source {
    type = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }
  artifacts {
    type = "CODEPIPELINE"
  }
  environment {
    compute_type = var.compute_type
    image = "aws/codebuild/standard:7.0"
    type = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
    privileged_mode = false
  }

  logs_config {
    cloudwatch_logs {
      group_name = "log-group"
      stream_name = "log-stream"
    }
    s3_logs {
      status = "ENABLED"
      location = "${aws_s3_bucket.s3_bucket_log.id}/build-log"
    }
  }
}
