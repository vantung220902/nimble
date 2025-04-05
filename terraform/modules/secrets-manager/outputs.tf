output "secret_id" {
  value = aws_secretsmanager_secret.secret_manager.id
}

output "secret_arn" {
  value = aws_secretsmanager_secret.secret_manager.arn
}
