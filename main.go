package main

import (
  // "encoding/json"
  "log"
  "net/http"
  "os"
  // "github.com/gorilla/mux"
  "github.com/joho/godotenv"
  "gorm.io/driver/sqlite"
  "gorm.io/gorm"
  "github.com/9ziggy9/chaass/models"
)

func loadEnv() (string, string) {
  err := godotenv.Load()
  if err != nil {
    log.Fatalf("Error loading .env file: %v\n", err)
    os.Exit(1)
  }
  port := os.Getenv("PORT")
  db := os.Getenv("DB_FILE")
  return port, db
}

func connectToDB(db string) *gorm.DB {
  conn, err := gorm.Open(
    sqlite.Open(db+"?create=true"),
    &gorm.Config{},
  )
  if err != nil {
    log.Fatalf("Error connecting to database: %v\n", err)
    os.Exit(1)
  }
  return conn
}

func main() {
  port, db := loadEnv() // Can exit(1)!
  dbConn := connectToDB(db) // Can exit(1)!

  dbConn.AutoMigrate(&models.User{})

  // TODO: We are going to abstract this in api module
  // Create a new user
  user := models.User{Name: "Ziggy"}
  result := dbConn.Create(&user)
  if result.Error != nil {
    log.Fatalf("Failed to create user: %v", result.Error)
    os.Exit(1)
  }

  log.Println(port, db)
  log.Println("Loaded module...", models.Hello())
  log.Println("Listening on port "+port+"...")
  log.Fatal(http.ListenAndServe(":"+port, nil))
}
