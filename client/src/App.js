import React, {useReducer, useEffect} from "react";
import Board from "./components/Board";
import gameReducer from "./store/game.jsx";
import Chat from "./components/Chat";
import {Switch, Route} from "react-router-dom";
import {COORDS} from "./global.js";

function chatReducer(state, action) {
  switch (action.type) {
  case "sendMessage": {
    return {
      ...state,
      outMsgs: [...state.outMsgs, action.payload]
    };
  }
  default: {
    return console.log("Huh?");
  }
  }
}

function App() {
  const [gameState, gameDispatch] = useReducer(
    gameReducer, {
      hl: null,
      board: COORDS.flat().reduce((acc, c) => ({...acc, [c]: null}), {})
    }
  );

  const [chatState, chatDispatch] = useReducer(chatReducer, {
    outMsgs: [],
    incMsgs: [],
  });

  useEffect(() => {
    gameDispatch({type: "newGame"});
  }, []);

  return (
    <>
      <Switch>
        <Route path="/" exact>
	  <Board state={gameState} dispatch={gameDispatch}/>
        </Route>
        <Route path="/chat-debug">
          <Chat state={chatState} dispatch={chatDispatch}/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
