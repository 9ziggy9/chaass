import React, {useReducer, useEffect} from "react";
import Board from "./components/Board";
import gameReducer from "./store/game.jsx";
import chatReducer from "./store/chat.jsx";
import Chat from "./components/Chat";
import {Switch, Route} from "react-router-dom";
import {COORDS} from "./global.js";

function App() {
  const [gameState, gameDispatch] = useReducer(
    gameReducer, {
      hl: null,
      board: COORDS.flat().reduce((acc, c) => ({...acc, [c]: null}), {})
    }
  );

  const [chatState, chatDispatch] = useReducer(chatReducer, {
    msgs: [],
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
