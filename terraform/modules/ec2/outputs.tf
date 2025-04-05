output "ec2_jumpbox_id" {
  value = aws_instance.jumpbox.id
}

output "jumpbox_sg_id" {
  value = aws_security_group.jumpbox_sg.id
}
