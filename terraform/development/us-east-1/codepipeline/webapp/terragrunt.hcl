locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment           = local.environment_vars.locals.environment
  region                = local.region_vars.locals.aws_region
  project_name          = local.environment_vars.locals.project_name
  webapp_repo_brach     = local.environment_vars.locals.webapp_repo_brach
  webapp_repo           = local.environment_vars.locals.webapp_repo
  code_star_arn         = local.environment_vars.locals.code_star_arn
  codepipeline_role_arn = local.environment_vars.locals.codepipeline_role_arn
  github_path           = local.environment_vars.locals.github_path
}

dependency "secret_manager" {
  config_path = find_in_parent_folders("secrets-manager")
  mock_outputs = {
    secret_arn = "arn:aws:secretsmanager:region:111111111111:secret:secret-id"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependency "codebuild" {
  config_path = find_in_parent_folders("codebuild/webapp")
  mock_outputs = {
    codebuild_name = "webapp"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependencies {
  paths = ["../../secrets-manager", "../../codebuild/webapp"]
}

terraform {
  source = "${path_relative_from_include()}//modules/codepipeline"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment           = local.environment
  region                = local.region
  code_star_arn         = local.code_star_arn
  repo_branch           = local.webapp_repo_brach
  repo_name             = local.webapp_repo
  codepipeline_role_arn = local.codepipeline_role_arn
  github_path           = local.github_path
  stage_build           = local.environment
  codebuild_name        = dependency.codebuild.outputs.codebuild_name
  secret_manager_arn    = dependency.secret_manager.outputs.secret_arn
}
