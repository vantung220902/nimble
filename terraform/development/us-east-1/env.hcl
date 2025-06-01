locals {
  environment           = "development"
  project_name          = "nimble"
  db_name               = "nimble"
  vpc_cidr              = "10.199.0.0/16"
  public_subnets_cidr   = ["10.199.0.0/24", "10.199.1.0/24"]
  private_subnets_cidr  = ["10.199.2.0/24", "10.199.3.0/24"]
  database_subnets_cidr = ["10.199.4.0/24", "10.199.5.0/24"]
  jumpbox_key_pair      = "terraform_key"
  jumpbox_allowed_ips   = ["0.0.0.0/0"]
  ami_id                = "ami-0953476d60561c955"
  domain_name           = "nimble.tunnguyenv.cloud"
  route53_zone_id       = "Z04478463TXT2HAF39JL6"
  bucket_name           = "nimble-web-app-22"
  api_svc_repo          = "nimble-server"
  api_svc_repo_brach    = "develop"
  api_prefix            = "api-svc"
  container_port        = 4000
  container_cpu         = 512
  container_memory      = 1024
}
