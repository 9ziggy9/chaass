const newGame = (state) => {
  return {
    ...state,
    "a8": "rook_black", "b8": "knight_black", "c8": "bishop_black",
    "d8": "queen_black", "e8": "king_black", "f8": "bishop_black",
    "g8": "knight_black", "h8": "rook_black",
    "a1": "rook_white", "b1": "knight_white", "c1": "bishop_white",
    "d1": "queen_white", "e1": "king_white", "f1": "bishop_white",
    "g1": "knight_white", "h1": "rook_white",
    "a7": "pawn_black","b7": "pawn_black","c7": "pawn_black",
    "d7": "pawn_black","e7": "pawn_black","g7": "pawn_black",
    "f7": "pawn_black","h7": "pawn_black",
    "a2": "pawn_white","b2": "pawn_white","c2": "pawn_white",
    "d2": "pawn_white","e2": "pawn_white","g2": "pawn_white",
    "f2": "pawn_white","h2": "pawn_white",
  };
};

export default function gameReducer(state={}, action) {
  switch(action.type) {
  case "setHighlight":  return {
    ...state, 
    hl: action.payload
  };
  case "newGame": return {
    ...state,
    board: newGame(state)
  };
  case "makeMove": {
    const {piece, color, pCoord, dCoord} = action.payload;
    return {
      ...state,
      board: {
        ...state.board,
        [pCoord]: null,
        [dCoord]: piece+"_"+color
      }
    };
  }
  default: {
    return state;
  }
  }
};
