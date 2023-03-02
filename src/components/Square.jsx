import {COLORS} from "../global.js";

export default function Square({coord, piece, color, style,
                                state, dispatch, selected}) {

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
        dCoord: selected.current.dest[0],
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
        ...style,
	outline: (state?.hl?.id === coord ? "solid 5px "+COLORS.myBlue : ""),
	outlineOffset: (state?.hl?.id === coord ? "-5px" : ""),
      }}
    ></div>
  );
}
