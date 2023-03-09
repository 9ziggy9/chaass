package api

import (
  "log"
  "net/http"
  "os"
  "github.com/gorilla/mux"
  "gorm.io/driver/sqlite"
  "gorm.io/gorm"
)

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
