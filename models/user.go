package models

import "gorm.io/gorm"

type User struct {
  gorm.Model
  ID   uint   `gorm:"primaryKey"`
  Name string
}
