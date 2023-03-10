package seeders

import (
  "github.com/9ziggy9/chaass/models"
)

var Users = [] models.User{
  {Name: "Alice"},
  {Name: "Bob"},
  {Name: "Charlie"},
  {Name: "Ziggy"},
}

var Games = [] models.Game{
  {Name: "Test1", PGN: "1. e4 e5 2. Nf3 Nc6"},
  {Name: "Test2", PGN: "1. d4 d5 2. Nf3 Nc6"},
  {Name: "Test3", PGN: "1. c4 c5 2. Nf3 Nc6"},
}
