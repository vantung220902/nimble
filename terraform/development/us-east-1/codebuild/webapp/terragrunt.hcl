locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment        = local.environment_vars.locals.environment
  region             = local.region_vars.locals.aws_region
  project_name       = local.environment_vars.locals.project_name
  webapp_repo        = local.environment_vars.locals.webapp_repo
  codebuild_role_arn = local.environment_vars.locals.codebuild_role_arn
}

terraform {
  source = "${path_relative_from_include()}//modules/codebuild-fe"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment        = local.environment
  project_name       = local.project_name
  fe_repo_name       = local.webapp_repo
  codebuild_role_arn = local.codebuild_role_arn
  compute_type       = "BUILD_GENERAL1_MEDIUM"
}
