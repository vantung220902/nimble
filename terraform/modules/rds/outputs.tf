output "address" {
  description = "the address of the RDS instance"
  value       = aws_db_instance.db_instance.address
}

output "arn" {
  description = "the ARN of the RDS instance"
  value       = aws_db_instance.db_instance.arn
}

output "endpoint" {
  description = "the connection endpoint"
  value       = aws_db_instance.db_instance.endpoint
}

output "hosted_zone_id" {
  description = "the hosted zone id of database instance"
  value       = aws_db_instance.db_instance.hosted_zone_id
}

output "id" {
  description = "the rds instance id"
  value       = aws_db_instance.db_instance.id
}

output "username" {
  description = "the username for the db"
  value       = aws_db_instance.db_instance.username
}

output "password" {
  description = "the password for the db"
  value       = nonsensitive(local.password)
}
