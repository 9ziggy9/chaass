import "../index.css";

export default function Square({coord, style}) {
  return (
    <div
      id={coord}
      style={style}
    ></div>
  );
}
