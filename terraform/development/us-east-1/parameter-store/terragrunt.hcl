locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))

  environment    = local.environment_vars.locals.environment
  project_name   = local.environment_vars.locals.project_name
  aws_account_id = local.account_vars.locals.aws_account_id
  region         = local.region_vars.locals.aws_region
}

terraform {
  source = "${path_relative_from_include()}//modules/parameter-store"
}

include {
  path = find_in_parent_folders()
}

inputs =  {
  environment    = local.environment
  project_name   = local.project_name
  aws_account_id = local.aws_account_id
}
