package api

import (
  "log"
  "github.com/gorilla/mux"
  "net/http"
)

func helloUser(w http.ResponseWriter, r *http.Request) {
  log.Printf("Hello, world!")
}

func BuildUserRoutes(master *mux.Router) {
  log.Printf("Building User routes")
  router := master.PathPrefix("/users").Subrouter()
  router.HandleFunc("/", helloUser).Methods("GET")
}
