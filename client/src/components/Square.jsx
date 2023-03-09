import "../index.css";
import {useSelector, useDispatch} from "react-redux";

export default function Square({coord, piece, color, selected, x, y}) {
  const dispatch = useDispatch();
  const game = useSelector(state => state.game);

  function handleClick(e) {
    if (!selected.current.piece) {
      if (!piece) return;
      selected.current.piece = [coord, piece, color];
      dispatch({type: "setHighlight", payload: e.target});
      return;
    }
    if (!selected.current.dest) {
      selected.current.dest = [coord, piece, color];
      dispatch({type: "makeMove", payload: {
        piece: selected.current.piece[1],
        color: selected.current.piece[2],
        pCoord: selected.current.piece[0],
        dCoord: selected.current.dest[0]
      }});
      selected.current.piece = null;
      selected.current.dest = null;
      dispatch({type: "setHighlight", payload: null});
      return;
    }
  }

  return (
    <div
      onClick={handleClick}
      id={coord}
      key={coord}
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
	    ? `url(${require(`../img/${piece+"_"+color}.png`)})`
	  : ""
        ),
        outline: (game?.hl?.id === coord ? "solid 5px var(--my-violet)" : ""),
        outlineOffset: (game?.hl?.id === coord ? "-5px" : ""),
      }}
    ></div>
  );
}
