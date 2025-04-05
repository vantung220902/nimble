locals {
  password  = random_password.password.result
  public_id = "0.0.0.0/0"

}

resource "random_password" "password" {
  special = false
  length  = 16
}

resource "aws_db_subnet_group" "db_subnet_group" {
  name = "db-subnet-group-${var.project_name}-${var.environment}"
  subnet_ids = flatten([
    var.subnet_ids
  ])
}

resource "aws_security_group" "database_sg" {
  vpc_id      = var.vpc_id
  name        = "${var.project_name} database SG ${var.environment}"
  description = "${var.project_name} database SG ${var.environment}"
  tags = {
    Name        = "private-sg-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_vpc_security_group_ingress_rule" "database_sg_allow_local" {
  security_group_id            = aws_security_group.database_sg.id
  to_port                      = 5432
  from_port                    = 5432
  ip_protocol                  = "tcp"
  for_each                     = toset(var.private_sg_ids)
  referenced_security_group_id = each.value
}

resource "aws_vpc_security_group_egress_rule" "database_sg_allow_all_out" {
  description       = "Allow all traffic in"
  security_group_id = aws_security_group.database_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = local.public_id
}


resource "aws_db_instance" "db_instance" {
  lifecycle {
    ignore_changes = [password]
  }
  identifier             = "rds-${var.project_name}-${var.environment}-db"
  engine                 = "postgres"
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  username               = var.username
  password               = local.password
  port                   = 5432
  db_name                = var.db_name
  ca_cert_identifier     = var.ca_cert_identifier
  allocated_storage      = var.allocated_storage
  skip_final_snapshot    = var.skip_final_snapshot
  storage_type           = var.storage_type
  publicly_accessible    = var.publicly_accessible
  multi_az               = var.multi_az
  storage_encrypted      = var.storage_encrypted
  vpc_security_group_ids = [aws_security_group.database_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.id

  tags = {
    Name        = "rds-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }

  depends_on = [aws_db_subnet_group.db_subnet_group, aws_security_group.database_sg]
}


resource "aws_ssm_parameter" "database_url" {
  name  = "/${var.project_name}/${var.environment}/DATABASE_URL"
  type  = "String"
  value = "postgresql://${aws_db_instance.db_instance.username}:${local.password}@${aws_db_instance.db_instance.endpoint}/${var.db_name}"

  tags = {
    Environment = "${var.environment}"
  }
}
