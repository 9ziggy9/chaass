package main

import (
  "log"
  "net/http"
  "os"
  "github.com/gorilla/websocket"
  "github.com/joho/godotenv"
)

var upgrader = websocket.Upgrader{
  ReadBufferSize: 1024,
  WriteBufferSize: 1024,
  // FIXME: Allowing all CORS requests
  CheckOrigin: func(r *http.Request) bool { return true },
}
      
// ws message listener
func reader(conn *websocket.Conn) {
  for {
    messageType, p, err := conn.ReadMessage()
    if err != nil {
      log.Println(err)
      return
    }

    if err := conn.WriteMessage(messageType, p); err != nil {
      log.Println(err)
      return
    }
  }
}

// websocket endpoint
func serveWs(w http.ResponseWriter, r *http.Request) {
  
}

func main() {
  err := godotenv.Load()
  if err != nil {
    log.Fatal("Error loading .env file")
  }
  port := os.Getenv("PORT")
  log.Println("Opening socket on port "+port+"...")
  log.Fatal(http.ListenAndServe(":"+port, nil))
}
