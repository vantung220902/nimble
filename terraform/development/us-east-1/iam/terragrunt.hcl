locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  env              = local.environment_vars.locals.environment
  region           = local.region_vars.locals.aws_region
  aws_account_id   = local.account_vars.locals.aws_account_id
}

terraform {
  source = "${path_relative_from_include()}//modules/iam"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  aws_account_id         = local.aws_account_id
}
