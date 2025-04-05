locals {
  public_id = "0.0.0.0/0"
}

resource "aws_vpc" "vpc" {
  cidr_block           = var.vpc_cidr
  instance_tenancy     = "default"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "vpc-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name        = "igw-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_subnet" "public_subnet" {
  vpc_id = aws_vpc.vpc.id

  count                   = length(var.public_subnets_cidr)
  cidr_block              = element(var.public_subnets_cidr, count.index)
  availability_zone       = element(var.availability_zones, count.index)
  map_public_ip_on_launch = false

  tags = {
    Name        = "public-subnet-${var.project_name}-${element(var.az_shortname, count.index)}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_subnet" "private_subnet" {
  vpc_id                  = aws_vpc.vpc.id
  count                   = length(var.private_subnets_cidr)
  cidr_block              = element(var.private_subnets_cidr, count.index)
  availability_zone       = element(var.availability_zones, count.index)
  map_public_ip_on_launch = false

  tags = {
    Name        = "private-subnet-${var.project_name}-${element(var.az_shortname, count.index)}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_subnet" "database_subnet" {
  vpc_id                  = aws_vpc.vpc.id
  count                   = length(var.database_subnets_cidr)
  cidr_block              = element(var.database_subnets_cidr, count.index)
  availability_zone       = element(var.availability_zones, count.index)
  map_public_ip_on_launch = false

  tags = {
    Name        = "database-subnet-${var.project_name}-${element(var.az_shortname, count.index)}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_eip" "nat_eip" {
  depends_on = [aws_internet_gateway.igw]

  tags = {
    Name        = "nat-eip-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = element(aws_subnet.public_subnet.*.id, 0)
  depends_on    = [aws_internet_gateway.igw]

  tags = {
    Name        = "nat-gw-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }
}


resource "aws_route_table" "private_subnet_rtb" {
  vpc_id = aws_vpc.vpc.id
  count  = length(var.private_subnets_cidr)

  tags = {
    Name        = "private-subnet-rtb-${var.project_name}-${element(var.az_shortname, count.index)}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_route_table" "public_subnet_rtb" {
  vpc_id = aws_vpc.vpc.id
  count  = length(var.public_subnets_cidr)

  tags = {
    Name        = "public-subnet-rtb-${var.project_name}-${element(var.az_shortname, count.index)}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_route_table" "database_subnet_rtb" {
  vpc_id = aws_vpc.vpc.id
  count  = length(var.database_subnets_cidr)

  tags = {
    Name        = "database-subnet-rtb-${var.project_name}-${element(var.az_shortname, count.index)}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_route" "route_public_igw" {
  count                  = length(var.public_subnets_cidr)
  route_table_id         = element(aws_route_table.public_subnet_rtb.*.id, count.index)
  destination_cidr_block = local.public_id
  gateway_id             = aws_internet_gateway.igw.id
}

resource "aws_route" "route_private_nat_gw" {
  destination_cidr_block = local.public_id
  count                  = length(var.private_subnets_cidr)
  route_table_id         = element(aws_route_table.private_subnet_rtb.*.id, count.index)
  gateway_id             = aws_nat_gateway.nat_gw.id
}

resource "aws_route" "route_database_nat_gw" {
  destination_cidr_block = local.public_id
  count                  = length(var.database_subnets_cidr)
  route_table_id         = element(aws_route_table.database_subnet_rtb.*.id, count.index)
  gateway_id             = aws_nat_gateway.nat_gw.id
}

resource "aws_route_table_association" "rtb_association_public" {
  count          = length(var.public_subnets_cidr)
  subnet_id      = element(aws_subnet.public_subnet.*.id, count.index)
  route_table_id = element(aws_route_table.public_subnet_rtb.*.id, count.index)
}

resource "aws_route_table_association" "rtb_association_private" {
  count          = length(var.private_subnets_cidr)
  subnet_id      = element(aws_subnet.private_subnet.*.id, count.index)
  route_table_id = element(aws_route_table.private_subnet_rtb.*.id, count.index)
}

resource "aws_route_table_association" "rtb_association_database" {
  count          = length(var.database_subnets_cidr)
  subnet_id      = element(aws_subnet.database_subnet.*.id, count.index)
  route_table_id = element(aws_route_table.database_subnet_rtb.*.id, count.index)
}


resource "aws_security_group" "private_subnet_sg" {
  vpc_id      = aws_vpc.vpc.id
  name        = "${var.project_name} private SG ${var.environment}"
  description = "${var.project_name} private SG ${var.environment}"
  tags = {
    Name        = "private-sg-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_vpc_security_group_ingress_rule" "private_sg_allow_http" {
  security_group_id = aws_security_group.private_subnet_sg.id
  ip_protocol       = "tcp"
  from_port         = 80
  to_port           = 80
  cidr_ipv4         = local.public_id
  description       = "Allow http port"
}

resource "aws_vpc_security_group_ingress_rule" "private_sg_allow_https" {
  security_group_id = aws_security_group.private_subnet_sg.id
  ip_protocol       = "tcp"
  from_port         = 443
  to_port           = 443
  cidr_ipv4         = local.public_id
  description       = "Allow https port"
}

resource "aws_vpc_security_group_ingress_rule" "private_sg_allow_server_port" {
  security_group_id = aws_security_group.private_subnet_sg.id
  ip_protocol       = "tcp"
  from_port         = 4000
  to_port           = 4000
  cidr_ipv4         = local.public_id
  description       = "Allow server port"
}

resource "aws_vpc_security_group_egress_rule" "private_sg_allow_all_out" {
  description       = "Allow all traffic out"
  security_group_id = aws_security_group.private_subnet_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = local.public_id
}


resource "aws_security_group" "public_subnet_sg" {
  vpc_id      = aws_vpc.vpc.id
  name        = "${var.project_name} public SG ${var.environment}"
  description = "${var.project_name} public SG ${var.environment}"
  tags = {
    Name        = "public-sg-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_vpc_security_group_ingress_rule" "public_sg_allow_all_in" {
  description       = "Allow all traffic in"
  security_group_id = aws_security_group.public_subnet_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = local.public_id
}

resource "aws_vpc_security_group_egress_rule" "public_sg_allow_all_out" {
  description       = "Allow all traffic out"
  security_group_id = aws_security_group.public_subnet_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = local.public_id
}

