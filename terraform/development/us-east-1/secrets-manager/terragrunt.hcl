locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment = local.environment_vars.locals.environment
  project_name = local.environment_vars.locals.project_name
  region      = local.region_vars.locals.aws_region
}

terraform {
  source = "${path_relative_from_include()}//modules/secrets-manager"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  secret_name = "api-${local.project_name}/${local.environment}"
  environment = local.environment
}
