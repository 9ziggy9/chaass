import "../index.css";

export default function Square({coord, piece, style, state}) {
  function handleClick(e) {
    // if (!selected.current.piece) {
    //   if (!piece) return;
    //   selected.current.piece = [coord, piece, color];
    //   setHl(e.target);
    //   return;
    // }
    // if (!selected.current.dest) {
    //   selected.current.dest = [coord, piece, color];
    //   setGame({
    //     ...game,
    //     [selected.current.piece[0]]: null,
    //     [selected.current.dest[0]]:
    // 	  selected.current.piece[1]+"_"+selected.current.piece[2],
    //   });
    //   selected.current.piece = null;
    //   selected.current.dest = null;
    //   setHl(null);
    //   return;
    // }
  }

  return (
    <div
      onClick={handleClick}
      id={coord}
      key={coord}
      style={{
        ...style,
	outline: (state?.hl?.id === coord ? "solid 5px var(--my-blue)" : ""),
	outlineOffset: (state?.hl?.id === coord ? "-5px" : ""),
      }}
    ></div>
  );
}
