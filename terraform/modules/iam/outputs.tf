output "codedeploy_role_arn" {
  value = aws_iam_role.codedeploy.arn
}

output "codepipeline_role_arn" {
  value = aws_iam_role.codepipeline.arn
}
