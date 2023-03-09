package main

import (
  "log"
  "net/http"
  "os"
  "github.com/joho/godotenv"
  "gorm.io/driver/sqlite"
  "gorm.io/gorm"
  "github.com/gorilla/mux"
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

func (a *App) RegisterRoute(
  rh func(w http.ResponseWriter, r *http.Request),
  subRoute string,
  route string,
  method string,
) {
  subRouter := a.Router.PathPrefix(subRoute).Subrouter()
  subRouter.HandleFunc(route, rh).Methods(method)
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
  app := &App{}
  app.Initialize(db)
  app.Run(port)
}
