locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))

  env                   = local.environment_vars.locals.environment
  region                = local.region_vars.locals.aws_region
  project_name          = local.environment_vars.locals.project_name
  vpc_cidr              = local.environment_vars.locals.vpc_cidr
  public_subnets_cidr   = local.environment_vars.locals.public_subnets_cidr
  private_subnets_cidr  = local.environment_vars.locals.private_subnets_cidr
  database_subnets_cidr = local.environment_vars.locals.database_subnets_cidr
  availability_zones    = ["${local.region_vars.locals.aws_region}a", "${local.region_vars.locals.aws_region}b"]
  az_shortname          = ["AZ A", "AZ B"]
}

terraform {
  source = "${path_relative_from_include()}//modules/vpc"
}

include {
  path = find_in_parent_folders()
}

inputs = {
  env                   = local.env
  region                = local.region
  vpc_cidr              = local.vpc_cidr
  public_subnets_cidr   = local.public_subnets_cidr
  private_subnets_cidr  = local.private_subnets_cidr
  database_subnets_cidr = local.database_subnets_cidr
  availability_zones    = local.availability_zones
  az_shortname          = local.az_shortname
}
