package api

import (
  // "log"
  "net/http"
  "encoding/json"
  "gorm.io/gorm"
  // "io/ioutil"
  "github.com/9ziggy9/chaass/models"
)

func getAllGames(db *gorm.DB) ([]models.Game, error) {
  var games []models.Game
  result := db.Find(&games)
  if result.Error != nil {
    return nil, result.Error
  }
  return games, nil
}

// func createGame(db *gorm.DB, r *http.Request) (models.Game, error) {
//   var game models.Game
//   err := json.NewDecoder(r.Body).Decode(&game)
//   if err != nil {
//     http.Error(w, err.Error(), http.StatusBadRequest)
//     return nil, err
//   }
//   result := db.Create(&game)
//   if result.Error != nil {
//     return nil,  result.Error
//   }
//   return game, nil
// }

// func GenerateCreateGame(db *gorm.DB) func (
//   w http.ResponseWriter,
//   r *http.Request,
// ) {
//   return func(w http.ResponseWriter, r *http.Request) {
//     body, err := ioutil.ReadAll(r.Body)
//     if err != nil {
//       http.Error(w, err.Error(), http.StatusInternalServerError)
//       return
//     }
//     game, err := createGame(body, )
//     log.Printf("Request body: %s", body)
//     w.Header().Set("Content-Type", "application/json")
//     json.NewEncoder(w).Encode(map[string]interface{}{
//       "body": string(body),
//     })
//   }
// }

func GenerateGetAllGames(db *gorm.DB) func(
  w http.ResponseWriter,
  r *http.Request,
) {
  return func(w http.ResponseWriter, r *http.Request) {
    games, err := getAllGames(db)
    if err != nil {
      http.Error(w, "Database query failed", http.StatusInternalServerError)
      return
    }
    jsonData, err := json.Marshal(games)
    if err != nil {
      http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
      return
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonData)
  }
}
