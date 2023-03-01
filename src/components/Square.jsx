import "../index.css";

export default function Square({coord, piece, style}) {
  return (
    <div
      onClick={() => console.log(coord, piece)}
      id={coord}
      style={style}
      className={piece}
    ></div>
  );
}
