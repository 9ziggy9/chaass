package main

import (
  "log"
  "os"
  "github.com/joho/godotenv"
  "github.com/9ziggy9/chaass/api"
  "github.com/9ziggy9/chaass/models"
  "github.com/9ziggy9/chaass/seeders"
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

func purgeDB(db string) {
  if _, err := os.Stat(db); err == nil {
    if err := os.Remove(db); err != nil {
      log.Fatalf("Failed to purge database file: %v", err)
      os.Exit(1)
    }
    log.Printf("Purged database file: %s", db)
  }
}

func main() {
  port, db := loadEnv() // Can exit(1)!

  // PURGE
  purgeDB(db)

  // INITIALIZE
  app := &api.App{}
  app.Initialize(db)

  // MIGRATE
  app.MigrateModels(&models.User{}, &models.Game{})
  app.RunSeeders(seeders.Users, seeders.Games)

  // Note how routes are registered via passing a closure defined
  // From API module, quite interesting, this is done to include db
  // connection created on APP in the scope of route handlers
  app.RegisterRoute(api.GenerateZiggy, "/users", "/ziggy", "GET")
  app.RegisterRoute(api.GenerateGetUsers, "/users", "/", "GET")
  app.RegisterRoute(api.GenerateGetAllGames, "/games", "/", "GET")
  // app.RegisterRoute(api.GenerateCreateGame, "/games", "/", "POST")

  // Make it happen
  app.Run(port)
}
