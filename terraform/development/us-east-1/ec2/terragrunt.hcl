locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  env                 = local.environment_vars.locals.environment
  region              = local.region_vars.locals.aws_region
  project_name        = local.environment_vars.locals.project_name
  availability_zones  = ["${local.region_vars.locals.aws_region}a", "${local.region_vars.locals.aws_region}b"]
  az_shortname        = ["AZ A", "AZ B"]
  ami_id              = local.environment_vars.locals.ami_id
  jumpbox_key_pair    = local.environment_vars.locals.jumpbox_key_pair
  jumpbox_allowed_ips = local.environment_vars.locals.jumpbox_allowed_ips
}

terraform {
  source = "${path_relative_from_include()}//modules/ec2"
}

dependency "vpc" {
  config_path = find_in_parent_folders("vpc")
  mock_outputs = {
    vpc_id    = "vpc-abcd1234abcd123"
    public_subnet_ids = ["subnet-0a98713c3e9f2d7e8"]
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
  env                 = local.env
  region              = local.region
  project_name        = local.project_name
  availability_zones  = local.availability_zones
  az_shortname        = local.az_shortname
  ami_id              = local.ami_id
  jumpbox_key_pair    = local.jumpbox_key_pair
  jumpbox_allowed_ips = local.jumpbox_allowed_ips
  vpc_id              = dependency.vpc.outputs.vpc_id
  subnet_id           = element(dependency.vpc.outputs.public_subnet_ids, 0)
}
