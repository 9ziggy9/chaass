import "../index.css";
import Square from "./Square";
import {useRef} from "react";
import {COORDS} from "../global.js";

export default function Board({state, dispatch}) {
  return (
    <div id="layer-board">
      {COORDS.map((row, x) => row.map((coord, y) => (
        <Square
          style={{
            backgroundColor: (
              x % 2
		? y % 2 ? "var(--my-white)" : "var(--my-black)"
		: y % 2 ? "var(--my-black)" : "var(--my-white)"
            ),
            width: "100%",
            height: "100%",
            backgroundSize: "contain",
            backgroundImage: (
              state.board[coord]
                ? `url(${require(`../img/${state.board[coord]}.png`)})`
		: ""
            )
          }}
          piece={state.board[coord]?.split("_")[0]}
          color={state.board[coord]?.split("_")[1]}
          key={coord}
          coord={coord}
          state={state}
        />
      )))}
    </div>
  );
}
