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

func (a *App) RunSeeders(seeders ...interface{}) {
  log.Println("Running seeders... ")
  for _, seeds := range seeders {
    a.DB.Create(seeds)
  }
}

func (a *App) RegisterRoute( // BEGIN ARGS
  routeConstructor func(db *gorm.DB) func(
    w http.ResponseWriter,
    r *http.Request,
  ),
  subRoute string,
  route string,
  method string, // END ARGS
) {
  subRouter := a.Router.PathPrefix(subRoute).Subrouter()
  subRouter.HandleFunc(route, routeConstructor(a.DB)).Methods(method)
}
