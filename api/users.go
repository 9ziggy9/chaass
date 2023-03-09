package api

import (
  "log"
  "net/http"
  "gorm.io/gorm"
  "github.com/9ziggy9/chaass/models"
)

func GenerateZiggy(db *gorm.DB) func(w http.ResponseWriter, r *http.Request) {
  return func(w http.ResponseWriter, r *http.Request) {
    ziggy := models.User{Name: "Ziggy"}
    result := db.Create(&ziggy)
    if result.Error != nil {
      http.Error(w, "Error creating user", http.StatusInternalServerError)
      return
    }
    log.Printf("Created user: %d", ziggy.ID)
  }
}
