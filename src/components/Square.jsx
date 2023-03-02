import "../index.css";
import {useEffect, useState} from "react";

export default function Square({
  coord, piece, color,
  game, style
}) {
  const [current, setCurrent] = useState(null);

  function handleClick() {
    setCurrent([coord, piece, color]);
  }

  useEffect(() => {
    console.log(current);
  }, [current]);

  return (
    <div
      onClick={handleClick}
      id={coord}
      key={coord}
      style={style}
    ></div>
  );
}
