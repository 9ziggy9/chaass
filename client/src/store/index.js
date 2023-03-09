import {createStore, combineReducers} from "redux";
import gameReducer from "./game";
import chatReducer from "./chat";

const rootReducer = combineReducers({
  game: gameReducer,
  chat: chatReducer,
});

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState);
};

export default configureStore;
