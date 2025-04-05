output "ecs_cluster_id" {
  value       = aws_ecs_cluster.ecs_cluster.id
  description = "ECS cluster Id"
}

output "ecs_cluster_arn" {
  value       = aws_ecs_cluster.ecs_cluster.arn
  description = "ECS cluster arn"
}

output "ecs_task_execution_role_arn" {
  value       = aws_iam_role.ecs_task_execution_role.arn
  description = "ECS Task Execution Role ARN"
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.ecs_cluster.name
}
