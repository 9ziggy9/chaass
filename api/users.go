package api

import (
  "log"
  "github.com/gorilla/mux"
  "github.com/9ziggy9/chaass/models"
  "net/http"
  "gorm.io/gorm"
)

func helloUser(w http.ResponseWriter, r *http.Request) {
  log.Printf("Hello, world!")
}

func BuildUserRoutes(master *mux.Router) {
  // log.Printf("Building User routes")
  // router := master.PathPrefix("/users").Subrouter()

  // router.HandleFunc("/", helloUser).Methods("GET")

  // router.HandleFunc("/ziggy", func(w http.ResponseWriter, r *http.Request, db *gorm.DB) {
  //   log.Printf("Hello, from Ziggy route")
  //   user := models.User{Name: "Ziggy"}
  //   result := db.Create(&user)
  //   if result.Error != nil {
  //     log.Fatalf("Failed to create user: %v", result.Error)
  //   }
  // }).Methods("GET")
}
