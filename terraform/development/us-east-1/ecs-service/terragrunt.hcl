locals {
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))

  environment           = local.environment_vars.locals.environment
  project_name          = local.environment_vars.locals.project_name
  aws_account_id        = local.account_vars.locals.aws_account_id
  api_svc_repo          = local.environment_vars.locals.api_svc_repo
  api_prefix            = local.environment_vars.locals.api_prefix
  container_port        = local.environment_vars.locals.container_port
  container_cpu         = local.environment_vars.locals.container_cpu
  container_memory      = local.environment_vars.locals.container_memory
  codebuild_role_arn    = local.environment_vars.locals.codebuild_role_arn
  codepipeline_role_arn = local.environment_vars.locals.codepipeline_role_arn
  codedeploy_role_arn   = local.environment_vars.locals.codedeploy_role_arn
}

terraform {
  source = "${path_relative_from_include()}//modules/api-service"
}

dependency "vpc" {
  config_path = find_in_parent_folders("vpc")
  mock_outputs = {
    vpc_id             = "vpc-abcd1234abcd123"
    private_subnet_ids = ["subnet-0a98713c3e9f2d7e8", "subnet-0918274c16074ffdb"]
    private_sg_id      = "sg-00cd718d0d754e668"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]

}

dependency "ecs_cluster" {
  config_path = find_in_parent_folders("ecs")
  mock_outputs = {
    ecs_task_execution_role_arn = "arn:aws:iam::111111111111:role/Name-ECSTaskExecutionRole-ABCD123456"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependency "alb" {
  config_path = find_in_parent_folders("alb")
  mock_outputs = {
    https_listener_arn = "arn:aws:elasticloadbalancing:us-west-2:111111111111:listener/app/api-elb/92c970793514ef35/f514456ec9131776"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan", "init"]
}

dependencies {
  paths = ["../vpc", "../ecs", "../alb"]
}

include {
  path = find_in_parent_folders()
}

inputs = {
  environment                 = local.environment
  project_name                = local.project_name
  aws_account_id              = local.aws_account_id
  repo_name                   = local.api_svc_repo
  codepipeline_role_arn       = local.codepipeline_role_arn
  codedeploy_role_arn         = local.codedeploy_role_arn
  api_prefix                  = local.api_prefix
  routing_priority            = 1
  vpc_id                      = dependency.vpc.outputs.vpc_id
  private_subnet_ids          = dependency.vpc.outputs.private_subnet_ids
  private_sg_ids              = [dependency.vpc.outputs.private_sg_id]
  ecs_cluster_name            = dependency.ecs_cluster.outputs.ecs_cluster_name
  https_listener_arn          = dependency.alb.outputs.https_listener_arn
  ecs_task_execution_role_arn = dependency.ecs_cluster.outputs.ecs_task_execution_role_arn
  service_name                = local.api_prefix
  ecs_id                      = dependency.ecs_cluster.outputs.ecs_cluster_id
  container_port              = local.container_port
}
