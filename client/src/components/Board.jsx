import "../index.css";
import Square from "./Square";
import {useRef, useEffect} from "react";
import {COORDS} from "../global.js";
import {useSelector, useDispatch} from "react-redux";

export default function Board() {
  const dispatch = useDispatch();
  const game = useSelector(state => state.game);

  useEffect(() => {
    dispatch({"type": "newGame"});
  }, [dispatch]);

  const selected = useRef({
    piece: null,
    dest: null
  });

  return (
    <div id="game">
      <div id="layer-board">
	{COORDS.map((row, x) => row.map((coord, y) => (
	  <Square
	    style={{
	      backgroundColor: (
		x % 2
		  ? y % 2 ? "var(--my-light-white)" : "var(--my-blue)"
		  : y % 2 ? "var(--my-blue)": "var(--my-light-white)"
	      ),
	      width: "100%",
	      height: "100%",
	      backgroundSize: "contain",
	      backgroundImage: (
		game.board[coord]
		  ? `url(${require(`../img/${game.board[coord]}.png`)})`
		  : ""
	      )
	    }}
	    piece={game.board[coord]?.split("_")[0]}
	    color={game.board[coord]?.split("_")[1]}
	    key={coord}
	    coord={coord}
	    selected={selected}
	  />
	)))}
      </div>
    </div>
  );
}
