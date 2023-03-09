package api

import (
  "log"
  "net/http"
  "encoding/json"
  "gorm.io/gorm"
  "github.com/9ziggy9/chaass/models"
)

func getAllUsers(db *gorm.DB) ([]models.User, error) {
  var users []models.User
  result := db.Select("id, name").Find(&users)
  if result.Error != nil {
    return nil, result.Error
  }
  return users, nil
}

func GenerateGetUsers(db *gorm.DB) func(
  w http.ResponseWriter,
  r *http.Request,
) {
  return func(w http.ResponseWriter, r *http.Request) {
    users, err := getAllUsers(db)
    if err != nil {
      http.Error(w, "Database query failed", http.StatusInternalServerError)
      return
    }
    jsonData, err := json.Marshal(users)
    if err != nil {
      http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
      return
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonData)
  }
}

func GenerateZiggy(db *gorm.DB) func(
  w http.ResponseWriter,
  r *http.Request,
) {
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
