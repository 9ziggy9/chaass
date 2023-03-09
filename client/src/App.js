import Board from "./components/Board";
import Chat from "./components/Chat";
import {Switch, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
	  <Board />
        </Route>
        <Route path="/chat-debug">
          <Chat />
        </Route>
      </Switch>
    </>
  );
}

export default App;
