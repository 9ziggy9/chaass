package api

import (
  "log"
  "net/http"
  "encoding/json"
  "gorm.io/gorm"
  "github.com/9ziggy9/chaass/models"
)

func GenerateGetUsers(db *gorm.DB) func(
  w http.ResponseWriter,
  r *http.Request,
) {
  return func(w http.ResponseWriter, r *http.Request) {
    data := struct {
      Message string `json:"message"`
    }{
      Message: "Hello, world",
    }
    jsonData, err := json.Marshal(data)
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
