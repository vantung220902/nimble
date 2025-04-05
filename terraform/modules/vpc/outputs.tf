output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "public_subnet_ids" {
  value = aws_subnet.public_subnet.*.id
}

output "private_subnet_ids" {
  value = aws_subnet.private_subnet.*.id
}

output "database_subnet_ids" {
  value = aws_subnet.database_subnet.*.id
}

output "nat_gw_id" {
  value = aws_nat_gateway.nat_gw.id
}

output "private_sg_id" {
  value = aws_security_group.private_subnet_sg.id
}

output "public_sg_id" {
  value = aws_security_group.public_subnet_sg.id
}
