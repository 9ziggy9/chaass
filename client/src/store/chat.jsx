const OUT = 0;
const IN = 1;

export default function chatReducer(state, action) {
  switch (action.type) {
  case "sendMessage": {
    return {
      ...state,
      msgs: [
        ...state.msgs, {
          dir: OUT,
          txt: action.payload
        }
      ]
    };
  }
  case "recvMessage": {
    return {
      ...state,
      msgs: [
        ...state.msgs, {
          dir: IN,
          txt: action.payload
        }
      ]
    };
  }
  default: {
    return console.log("Huh?");
  }
  }
}
