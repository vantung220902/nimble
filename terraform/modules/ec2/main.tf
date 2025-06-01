locals {
  instance_type = "t2.micro"
  public_id     = "0.0.0.0/0"
  local_id      = "127.0.0.1/32"
}

data "aws_iam_policy_document" "ec2_assume_role_policy" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "ec2_allow_ssm" {
  name               = "Allow-SSM-EC2-${var.environment}"
  description        = "Allows EC2 instances to call AWS services on your behalf."
  assume_role_policy = data.aws_iam_policy_document.ec2_assume_role_policy.json
}

resource "aws_iam_role_policy_attachment" "ec2_policy_attachment" {
  for_each = toset([
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  ])

  role       = aws_iam_role.ec2_allow_ssm.id
  policy_arn = each.value
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = aws_iam_role.ec2_allow_ssm.name
  role = aws_iam_role.ec2_allow_ssm.name
}


resource "aws_instance" "jumpbox" {
  ami                         = var.ami_id
  availability_zone           = element(var.availability_zones, 0)
  ebs_optimized               = false
  instance_type               = local.instance_type
  monitoring                  = false
  iam_instance_profile        = aws_iam_instance_profile.ec2_profile.name
  key_name                    = var.jumpbox_key_pair
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.jumpbox_sg.id]
  source_dest_check           = true
  associate_public_ip_address = true
  root_block_device {
    volume_type           = "gp2"
    volume_size           = 8
    delete_on_termination = true
  }

  tags = {
    Environment = "${var.environment}"
    Name        = "jumpbox-${var.project_name}-${var.environment}"
  }

  depends_on = [aws_security_group.jumpbox_sg]
}

resource "aws_security_group" "jumpbox_sg" {
  vpc_id      = var.vpc_id
  name        = "${var.project_name} jump box SG ${var.environment}"
  description = "${var.project_name} jump box SG ${var.environment}"
  tags = {
    Name        = "jump-box-sg-${var.project_name}-${var.environment}"
    Environment = "${var.environment}"
  }
}

resource "aws_vpc_security_group_egress_rule" "jumpbox_sg_allow_all_out" {
  description       = "Allow all traffic in"
  security_group_id = aws_security_group.jumpbox_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = local.public_id
}

resource "aws_vpc_security_group_ingress_rule" "jumpbox_sg_all_local_in" {
  security_group_id = aws_security_group.jumpbox_sg.id
  ip_protocol       = "-1"
  cidr_ipv4         = local.local_id
  description       = "Allow localhost in"
}

resource "aws_vpc_security_group_ingress_rule" "jumpbox_sg_allow_ips" {
  security_group_id = aws_security_group.jumpbox_sg.id
  ip_protocol       = "tcp"
  from_port         = 22
  to_port           = 22
  for_each          = toset(var.jumpbox_allowed_ips)
  cidr_ipv4         = each.value
  description       = "Allow ips"
}

