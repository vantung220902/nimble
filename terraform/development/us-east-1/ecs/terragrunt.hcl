locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment    = local.environment_vars.locals.environment
  aws_account_id = local.account_vars.locals.aws_account_id
  region         = local.region_vars.locals.aws_region
  project_name   = local.environment_vars.locals.project_name
}

terraform {
  source = "${path_relative_from_include()}//modules/ecs"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment    = local.environment
  aws_account_id = local.aws_account_id
  role_suffix    = local.project_name
  cluster_name   = "ecs-${local.project_name}-${local.environment}"
}
