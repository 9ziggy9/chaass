package main

import (
  "log"
  "net/http"
  "os"
  "github.com/joho/godotenv"
  "gorm.io/driver/sqlite"
  "gorm.io/gorm"
  "github.com/gorilla/mux"
  "github.com/9ziggy9/chaass/api"
  "github.com/9ziggy9/chaass/models"
)

// BEGIN APPLICATION INTERFACE
type App struct {
  Router *mux.Router
  DB *gorm.DB
}

func (a *App) Initialize(db string) {
  conn, err := gorm.Open(sqlite.Open(db+"?create=true"), &gorm.Config{})
  if err != nil {
    log.Fatalf("Error connecting to database: %v\n", err)
    os.Exit(1)
  }
  a.Router = mux.NewRouter()
  a.DB = conn
}

func (a *App) Run(port string) {
  log.Println("Listening on port "+port+"...")
  log.Fatal(http.ListenAndServe(":"+port, a.Router))
}

func (a *App) MigrateModels(ms ...interface{}) {
  err := a.DB.AutoMigrate(ms...)
  if err != nil {
    log.Fatal("Error migrating model: %v", err)
    os.Exit(1)
  }
}

func (a *App) RegisterRoute(
  routeConstructor func(db *gorm.DB) func(
    w http.ResponseWriter,
    r *http.Request,
  ),
  subRoute string,
  route string,
  method string,
) {
  subRouter := a.Router.PathPrefix(subRoute).Subrouter()
  subRouter.HandleFunc(route, routeConstructor(a.DB)).Methods(method)
}
// END APPLICATION INTERFACE

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
  app := &App{}
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
