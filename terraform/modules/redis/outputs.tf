output "redis_host" {
  value = aws_elasticache_replication_group.redis_replica.primary_endpoint_address
}

output "redis_port" {
  value = aws_elasticache_replication_group.redis_replica.port
}
