locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))

  environment     = local.environment_vars.locals.environment
  region          = local.region_vars.locals.aws_region
  web_domain      = "web.${local.environment_vars.locals.domain_name}"
  bucket_name     = "${local.environment_vars.locals.bucket_name}-${local.environment}"
  route53_zone_id = local.environment_vars.locals.route53_zone_id
  aws_account_id  = local.account_vars.locals.aws_account_id
}

terraform {
  source = "${path_relative_from_include()}//modules/s3-static-web"
}

dependency "acm" {
  config_path = find_in_parent_folders("acm")
  mock_outputs = {
    acm_certificate_arn = "arn:aws:acm:us-west-2:111111111111:certificate/random-id"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "init", "plan"]
}

dependencies {
  paths = ["../acm"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment         = local.environment
  region              = local.region
  domain_name         = local.web_domain
  bucket_name         = local.bucket_name
  acm_certificate_arn = dependency.acm.outputs.acm_certificate_arn
  route53_zone_id     = local.route53_zone_id
  aws_account_id      = local.aws_account_id
}
