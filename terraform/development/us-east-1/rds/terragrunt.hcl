locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  env          = local.environment_vars.locals.environment
  region       = local.region_vars.locals.aws_region
  project_name = local.environment_vars.locals.project_name
  db_name      = local.environment_vars.locals.db_name
}

terraform {
  source = "${path_relative_from_include()}//modules/rds"
}

dependency "vpc" {
  config_path = find_in_parent_folders("vpc")
  mock_outputs = {
    vpc_id              = "vpc-abcd1234abcd123"
    database_subnet_ids = ["subnet-0a98713c3e9f2d7e8", "subnet-0918274c16074ffdb"]
    private_sg_id       = "sg-00cd718d0d754e668"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependency "ec2" {
  config_path = find_in_parent_folders("ec2")
  mock_outputs = {
    jumpbox_sg_id = "sg-00cd718d0d754e668"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependencies {
  paths = ["../vpc", "../ec2"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  env            = local.env
  region         = local.region
  project_name   = local.project_name
  db_name        = local.db_name
  subnet_ids     = dependency.vpc.outputs.database_subnet_ids
  vpc_id         = dependency.vpc.outputs.vpc_id
  private_sg_ids = [dependency.vpc.outputs.private_sg_id, dependency.ec2.outputs.jumpbox_sg_id]
}
