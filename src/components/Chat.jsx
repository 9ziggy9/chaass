import "../index.css";
import {useState} from "react";

export default function Chat() {
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleTextArea = (e) => {
    setTextAreaValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <>
      <div id="chat-container">
        <h2 id="chat-title">CHAT</h2>
	<div id="chat-inner">
          <div id="chat-feed"></div>
          <div id="chat-input-container">
	    <textarea
              value={textAreaValue}
              onChange={handleTextArea}
              id="chat-text">
            </textarea>
            <button id="chat-send-button">
	      <span className="material-symbols-outlined">
		arrow_forward
	      </span>
            </button>
          </div>
	</div>
      </div>
    </>
  );
}
