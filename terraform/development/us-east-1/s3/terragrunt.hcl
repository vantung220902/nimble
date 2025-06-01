locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment  = local.environment_vars.locals.environment
  project_name = local.environment_vars.locals.project_name
  domain_name  = local.environment_vars.locals.domain_name
  region       = local.region_vars.locals.aws_region
}

terraform {
  source = "${path_relative_from_include()}//modules/s3"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment     = local.environment
  region          = local.region
  project_name    = local.project_name
  domain_name     = local.domain_name
  web_domain_name = "web.${local.domain_name}"
  bucket_name     = "${local.project_name}-user-storage-22"
}
