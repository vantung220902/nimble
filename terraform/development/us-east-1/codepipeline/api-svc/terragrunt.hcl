locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment           = local.environment_vars.locals.environment
  region                = local.region_vars.locals.aws_region
  project_name          = local.environment_vars.locals.project_name
  api_svc_repo          = local.environment_vars.locals.api_svc_repo
  api_svc_repo_brach    = local.environment_vars.locals.api_svc_repo_brach
  aws_account_id        = local.account_vars.locals.aws_account_id
}


terraform {
  source = "${path_relative_from_include()}//modules/codepipeline-be"
}

dependency "iam" {
  config_path = find_in_parent_folders("iam")
  mock_outputs = {
    codedeploy_role_arn    = "arn:aws:iam::046704565145:role/CodeDeploy_ECS_Role"
    codepipeline_role_arn = "arn:aws:iam::046704565145:role/CodePipeline_CodeDeploy_role"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependencies {
  paths = ["../../iam"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment           = local.environment
  region                = local.region
  repo_branch           = local.api_svc_repo_brach
  repo_name             = local.api_svc_repo
  codepipeline_role_arn = dependency.iam.outputs.codepipeline_role_arn
  aws_account_id        = local.aws_account_id
}
