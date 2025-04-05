variable "environment" {
  description = "the name of Environment"
  type        = string
  default     = "development"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "db_name" {
  type        = string
  description = "the name of rds instance"
}

variable "subnet_ids" {
  type        = list(string)
  description = "the list of database subnet ids"
}

variable "engine_version" {
  type        = string
  description = "the postgresql engine version of database"
  default     = "16.3"
}

variable "publicly_accessible" {
  type        = bool
  description = "Specifics whatever the rds instance is publicity accessed"
  default     = true
}

variable "instance_class" {
  type        = string
  description = "the instance class of rds instance"
  default     = "db.t3.micro"
}

variable "username" {
  type        = string
  description = "username for database instance"
  default     = "superadmin"
}

variable "allocated_storage" {
  type        = number
  description = "the allocated storage in gigabytes"
  default     = 10
}

variable "storage_type" {
  type        = string
  description = "One of standard (magnetic), gp2 (general purpose SSD), or io1 (provisioned IOPS SSD)"
  default     = "gp2"
}

variable "storage_encrypted" {
  type        = bool
  description = "Specifics whatever the rds instance is encrypted"
  default     = true
}

variable "vpc_id" {
  type        = string
  description = "the VPC id"
}

variable "multi_az" {
  type        = bool
  description = "Specifics whatever the rds instance is deployed in multi az"
  default     = false
}

variable "skip_final_snapshot" {
  type        = bool
  description = "Skip final snapshot"
  default     = true
}

variable "private_sg_ids" {
  type        = list(string)
  description = "the list of private security group ids"

}

variable "ca_cert_identifier" {
  type        = string
  description = "Specifics the identifier of the CA certificate for the DB instance"
  default     = "rds-ca-rsa2048-g1"
}
