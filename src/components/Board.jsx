import Square from "./Square";
import {COORDS, COLORS} from "../global.js";
import {useRef} from "react";

export default function Board({state, dispatch}) {
  const selected = useRef({
    piece: null,
    dest: null,
  });

  return (
    <div id="layer-board">
      {COORDS.map((row, x) => row.map((coord, y) => (
        <Square
          style={{
            backgroundColor: (
              x % 2
	    	? y % 2 ? COLORS.myWhite : COLORS.myBlack
		: y % 2 ? COLORS.myBlack : COLORS.myWhite
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
          dispatch={dispatch}
          selected={selected}
        />
      )))}
    </div>
  );
}
