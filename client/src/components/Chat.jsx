import "../index.css";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

export default function Chat() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const dispatch = useDispatch();
  const chat = useSelector(state => state.chat);

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
          <div id="chat-feed">
	    {chat?.msgs.map((msg,i) =>
              <div key={`msg-${i}`}
                   className={`${msg.dir ? "inc-msg" : "out-msg"}`}>
                <p className="msg">
		  {msg.txt}
                </p>
              </div>)}
          </div>
          <div id="chat-input-container">
	    <textarea
              value={textAreaValue}
              spellCheck="false"
              onChange={handleTextArea}
              id="chat-text">
            </textarea>
            <button
              onClick={() => dispatch({type: "sendMessage", payload: textAreaValue})}
              id="chat-send-button">
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
