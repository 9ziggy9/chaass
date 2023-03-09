package models

type User struct {
  ID   uint   `gorm:"primaryKey" json:"id"`
  Name string `json:"name"`
}
