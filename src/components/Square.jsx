import "../index.css";

export default function Square({coord, piece, style}) {
  function handleClick(e) {
    console.log("Hello, world!");
  }

  return (
    <div
      onClick={handleClick}
      id={coord}
      key={coord}
      style={style}
    ></div>
  );
}
