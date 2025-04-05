output "public_alb_arn" {
  value = aws_alb.public_alb.arn
}

output "http_listener_arn" {
  value = aws_alb_listener.http_listener.arn
}

output "https_listener_arn" {
  value = aws_alb_listener.https_listener.arn
}
