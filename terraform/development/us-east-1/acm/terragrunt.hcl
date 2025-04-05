locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment     = local.environment_vars.locals.environment
  region          = local.region_vars.locals.aws_region
  domain_name     = local.environment_vars.locals.domain_name
  route53_zone_id = local.environment_vars.locals.route53_zone_id
}

terraform {
  source = "${path_relative_from_include()}//modules/acm"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  domain_name               = local.domain_name
  route53_zone_id           = local.route53_zone_id
  subject_alternative_names = ["*.${local.domain_name}", local.domain_name]
  environment               = local.environment
}
