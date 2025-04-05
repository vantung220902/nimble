data "template_file" "env_file" {
  template = file("${path.module}/env.json")
  vars = {
    secret_manager_arn = var.secret_manager_arn
    stage_build        = var.stage_build
  }
}

resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket        = "${var.project_name}-${var.repo_name}-${var.environment}-pp-log"
  force_destroy = true
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
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["SourceArtifact"]

      configuration = {
        ConnectionArn    = var.code_star_arn
        FullRepositoryId = "${var.github_path}/${var.repo_name}"
        BranchName       = var.repo_branch
        DetectChanges    = "true"
      }

    }
  }

  stage {
    name = "Build"
    action {
      name             = var.codebuild_name
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["SourceArtifact"]
      output_artifacts = ["BuildArtifact"]
      version          = "1"
      configuration = {
        ProjectName          = var.codebuild_name
        EnvironmentVariables = data.template_file.env_file.rendered
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
        AppSpecTemplateArtifact        = "BuildArtifact"
        AppSpecTemplatePath            = "appspec.yml"
        ApplicationName                = "${var.project_name}-${var.repo_name}-application"
        DeploymentGroupName            = "${var.project_name}-${var.repo_name}-deploy-group"
        Image1ArtifactName             = "BuildArtifact"
        Image1ContainerName            = "IMAGE1_NAME"
        TaskDefinitionTemplateArtifact = "BuildArtifact"
        TaskDefinitionTemplatePath     = "taskdef.json"
      }
      input_artifacts = ["BuildArtifact"]
      provider        = "CodeDeployToECS"
      version         = 1
      run_order       = 1
    }
  }
}
