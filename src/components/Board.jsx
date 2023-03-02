import "../index.css";
import Square from "./Square";
import {useEffect, useState, useRef} from "react";

const COORDS = [
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
];

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

export default function Board() {
  const selected = useRef({
    piece: null,
    dest: null,
  });
  const [hl, setHl] = useState(null);

  const [game, setGame] = useState(
    COORDS.flat().reduce((acc, c) => ({...acc, [c]: null}), {})
  );

  useEffect(() => {
    setGame(newGame(game));
  }, []);

  useEffect(() => {
    console.log(game);
  }, [game]);

  return (
    <div id="layer-board">
      {COORDS.map((row, x) => row.map((coord, y) => (
        <Square
          style={{
            backgroundColor: (
              x % 2
		? y % 2 ? "var(--my-white)" : "var(--my-black)"
		: y % 2 ? "var(--my-black)": "var(--my-white)"
            ),
            width: "100%",
            height: "100%",
            backgroundSize: "contain",
            backgroundImage: (
              game[coord]
                ? `url(${require(`../img/${game[coord]}.png`)})`
		: ""
            )
          }}
          piece={game[coord]?.split("_")[0]}
          color={game[coord]?.split("_")[1]}
          key={coord}
          coord={coord}
          selected={selected}
          game={game}
          setGame={setGame}
          hl={hl}
          setHl={setHl}
        />
      )))}
    </div>
  );
}
