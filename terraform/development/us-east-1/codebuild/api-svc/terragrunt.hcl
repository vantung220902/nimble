locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment        = local.environment_vars.locals.environment
  region             = local.region_vars.locals.aws_region
  project_name       = local.environment_vars.locals.project_name
  api_svc_repo       = local.environment_vars.locals.api_svc_repo
  codebuild_role_arn = local.environment_vars.locals.codebuild_role_arn
}

terraform {
  source = "${path_relative_from_include()}//modules/codebuild-be"
}

dependency "vpc" {
  config_path = find_in_parent_folders("vpc")
  mock_outputs = {
    vpc_id             = "vpc-abcd1234abcd123"
    private_subnet_ids = ["subnet-0a98713c3e9f2d7e8", "subnet-0918274c16074ffdb"]
    private_sg_id      = "sg-00cd718d0d754e668"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependencies {
  paths = ["../../vpc"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment                = local.environment
  project_name               = local.project_name
  repo_name                  = local.api_svc_repo
  codebuild_role_arn         = local.codebuild_role_arn
  compute_type               = "BUILD_GENERAL1_MEDIUM"
  vpc_id                     = dependency.vpc.outputs.vpc_id
  private_subnet_ids         = dependency.vpc.outputs.private_subnet_ids
  private_security_group_ids = [dependency.vpc.outputs.private_sg_id]
}
