output "ecr_arn" {
  description = "Full ARN of the repository"
  value       = aws_ecr_repository.repository.arn
}

output "ecr_name" {
  description = "The name of the repository"
  value       = aws_ecr_repository.repository.name
}

output "ecr_registry_id" {
  description = "The registry ID where the repository was created"
  value       = aws_ecr_repository.repository.registry_id
}

output "repository_url" {
  description = "The URL of the repository"
  value = aws_ecr_repository.repository.repository_url
}

output "target_group_arn" {
  value = aws_lb_target_group.target_group.arn
}
