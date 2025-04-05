locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment  = local.environment_vars.locals.environment
  region       = local.region_vars.locals.aws_region
  project_name = local.environment_vars.locals.project_name
}

terraform {
  source = "${path_relative_from_include()}//modules/redis"
}

dependency "vpc" {
  config_path = find_in_parent_folders("vpc")
  mock_outputs = {
    vpc_id             = "vpc-abcd1234abcd123"
    private_subnet_ids = ["subnet-0a98713c3e9f2d7e8", "subnet-0918274c16074ffdb"]
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependencies {
  paths = ["../vpc"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment = local.environment
  project_name = local.project_name
  vpc_id = dependency.vpc.outputs.vpc_id
  private_subnet_ids = dependency.vpc.outputs.private_subnet_ids
}
