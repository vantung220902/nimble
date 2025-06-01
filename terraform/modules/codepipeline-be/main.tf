resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket        = "${var.project_name}-${var.repo_name}-${var.environment}-pp-log"
  force_destroy = true
}

resource "aws_s3_bucket" "artifact_store" {
  bucket        = "${var.project_name}-${var.repo_name}-${var.environment}-artifact-ecs"
  force_destroy = true
}

data "aws_iam_policy_document" "bucket_policy" {
  statement {
    sid    = "AllowGetPutDeleteObjects"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${var.aws_account_id}:user/terraform"]
    }
    actions = [
      "s3:PutObjectAcl",
      "s3:PutObject",
      "s3:GetObjectAcl",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:AbortMultipartUpload",
    ]
    resources = ["${aws_s3_bucket.artifact_store.arn}/*"]
  }

  statement {
    sid    = "AllowListBucket"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${var.aws_account_id}:user/terraform"]
    }
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.artifact_store.arn]
  }
}


resource "aws_s3_bucket_policy" "artifact_store" {
  bucket = aws_s3_bucket.artifact_store.id
  policy = data.aws_iam_policy_document.bucket_policy.json
}


resource "aws_s3_bucket_versioning" "versioning_artifact_store" {
  bucket = aws_s3_bucket.artifact_store.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_public_access_block" "codepipeline_bucket_access_block" {
  bucket = aws_s3_bucket.codepipeline_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_codepipeline" "codepipeline" {
  name          = "${var.repo_name}-${var.environment}"
  role_arn      = var.codepipeline_role_arn
  pipeline_type = "V2"

  artifact_store {
    location = aws_s3_bucket.codepipeline_bucket.bucket
    type     = "S3"
  }

  stage {
    name = "Source"
    action {
      name             = "S3Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "S3"
      version          = "1"
      run_order        = 1
      output_artifacts = ["appspecartifact"]

      configuration = {
        PollForSourceChanges = "false"
        S3Bucket             = aws_s3_bucket.artifact_store.id
        S3ObjectKey          = "appspec.zip"
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name     = "Deploy"
      category = "Deploy"
      owner    = "AWS"
      configuration = {
        AppSpecTemplateArtifact        = "appspecartifact"
        AppSpecTemplatePath            = "appspec.yml"
        ApplicationName                = "${var.project_name}-${var.repo_name}-application"
        DeploymentGroupName            = "${var.project_name}-${var.repo_name}-deploy-group"
        Image1ArtifactName             = "appspecartifact"
        Image1ContainerName            = "IMAGE1_NAME"
        TaskDefinitionTemplateArtifact = "appspecartifact"
        TaskDefinitionTemplatePath     = "taskdef.json"
      }
      input_artifacts = ["appspecartifact"]
      provider        = "CodeDeployToECS"
      version         = 1
      run_order       = 1
    }
  }
}
