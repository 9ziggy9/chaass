package models

type Game struct {
  ID   uint   `gorm:"primaryKey" json:"id"`
  Name string `json:"name"`
  PGN  string `gorm:"type:text" json:"pgn"`
}
