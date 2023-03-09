package main

import (
  "log"
  "os"
  "github.com/joho/godotenv"
  "github.com/9ziggy9/chaass/api"
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

func main() {
  port, db := loadEnv() // Can exit(1)!

  // INITIALIZE DATABASE
  app := &api.App{}
  app.Initialize(db)

  // MIGRATE
  app.MigrateModels(&models.User{})

  // Note how routes are registered via passing a closure defined
  // From API module, quite interesting, this is done to include db
  // connection created on APP in the scope of route handlers
  app.RegisterRoute(api.GenerateZiggy, "/users", "/ziggy", "GET")

  // Make it happen
  app.Run(port)
}
