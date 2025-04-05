locals {
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))

  account_id  = local.account_vars.locals.aws_account_id
  aws_profile = local.account_vars.locals.aws_profile
  aws_region  = local.region_vars.locals.aws_region
}


generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "${local.aws_region}"
  profile = "${local.aws_profile}"
  allowed_account_ids = ["${local.account_id}"]
}

# this provider is used for cloudfront
provider "aws" {
  region = "us-east-1"
  alias = "us-east-1"
  profile = "${local.aws_profile}"
  allowed_account_ids = ["${local.account_id}"]
  shared_credentials_files = [ "~/.aws/credentials" ]
}
EOF
}

remote_state {
  backend = "s3"
  config = {
    encrypt        = true
    bucket         = "nimble-terraform-state-${local.account_id}"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = local.aws_region
    dynamodb_table = "iac-terraform-locks"
    profile        = "${local.aws_profile}"
  }
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
}

terraform {
  extra_arguments "reconfigure" {
    commands  = ["init"]
    arguments = ["-reconfigure"]
  }
}


inputs = merge(
  local.account_vars.locals,
  local.region_vars.locals,
  local.environment_vars.locals,
)
