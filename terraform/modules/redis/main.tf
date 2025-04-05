locals {
  max_byte_length = 16
  password        = random_password.password.result
  public_id       = "0.0.0.0/0"
}

resource "random_password" "password" {
  special = false
  length  = 16
}

resource "aws_elasticache_subnet_group" "subnet_group" {
  name       = "redis-subnet-group-${var.project_name}-${var.environment}"
  subnet_ids = var.private_subnet_ids
  tags = {
    Environment = var.environment
  }
}

resource "aws_security_group" "redis_sg" {
  vpc_id      = var.vpc_id
  name        = "redis-sg-${var.project_name}-${var.environment}"
  description = "Allow traffic access redis"
  tags = {
    Environment = var.environment
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_redis_port" {
  security_group_id = aws_security_group.redis_sg.id
  ip_protocol       = "tcp"
  from_port         = 6379
  to_port           = 6379
  cidr_ipv4         = local.public_id
}

resource "aws_vpc_security_group_egress_rule" "all_all_traffic" {
  security_group_id = aws_security_group.redis_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = local.public_id
}

resource "aws_elasticache_replication_group" "redis_replica" {
  replication_group_id       = "redis-replica-${var.project_name}-${var.environment}"
  engine                     = "redis"
  node_type                  = var.node_type
  num_node_groups            = 1
  parameter_group_name       = var.parameter_group_name
  port                       = 6379
  security_group_ids         = [aws_security_group.redis_sg.id]
  subnet_group_name          = aws_elasticache_subnet_group.subnet_group.name
  at_rest_encryption_enabled = true
  description                = "redis-replica-${var.project_name}-${var.environment}"

  tags = {
    Environment = var.environment
  }

}

resource "aws_elasticache_cluster" "cluster" {
  cluster_id           = "redis-cluster-${var.project_name}-${var.environment}"
  replication_group_id = aws_elasticache_replication_group.redis_replica.id

  tags = {
    Environment = var.environment
  }
}

resource "aws_ssm_parameter" "REDIS_HOST" {
  name  = "/${var.project_name}/${var.environment}/REDIS_HOST"
  type  = "String"
  value = aws_elasticache_replication_group.redis_replica.primary_endpoint_address
  tags = {
    Environment = var.environment
  }
}


resource "aws_ssm_parameter" "REDIS_PORT" {
  name  = "/${var.project_name}/${var.environment}/REDIS_PORT"
  type  = "String"
  value = aws_elasticache_replication_group.redis_replica.port
  tags = {
    Environment = var.environment
  }
}
