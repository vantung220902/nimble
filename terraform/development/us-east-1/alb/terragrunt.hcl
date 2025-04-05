locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  environment     = local.environment_vars.locals.environment
  region          = local.region_vars.locals.aws_region
  project_name    = local.environment_vars.locals.project_name
  domain_name     = local.environment_vars.locals.domain_name
  route53_zone_id = local.environment_vars.locals.route53_zone_id
  api_url         = "api.${local.domain_name}"
}

terraform {
  source = "${path_relative_from_include()}//modules/alb"
}

dependency "vpc" {
  config_path = find_in_parent_folders("vpc")
  mock_outputs = {
    public_subnet_ids = ["subnet-0a98713c3e9f2d7e8", "subnet-0918274c16074ffdb"]
    public_sg_id      = "sg-00cd718d0d754e668"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependency "acm" {
  config_path = find_in_parent_folders("acm")
  mock_outputs = {
    acm_certificate_arn = "arn:aws:acm:us-west-2:111111111111:certificate/random-id"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependencies {
  paths = ["../vpc", "../acm"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment         = local.environment
  project_name        = local.project_name
  api_url             = local.api_url
  route53_zone_id     = local.route53_zone_id
  public_subnet_ids   = dependency.vpc.outputs.public_subnet_ids
  public_sg_ids       = [dependency.vpc.outputs.public_sg_id]
  acm_certificate_arn = dependency.acm.outputs.acm_certificate_arn
}
