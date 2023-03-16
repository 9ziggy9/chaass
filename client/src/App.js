import Board from "./components/Board";
import Chat from "./components/Chat";
import {Switch, Route} from "react-router-dom";
import ReactDOM from "react-dom";
import {useState, createContext, useContext} from "react";

function ModalPortal({children}) {
  const {modal, handleModal, modalContent} = useContext(ModalContext);
  return modal ? ReactDOM.createPortal(
    <div id="modal-container">
      <div
        id="modal-overlay"
        onClick={() => handleModal()}
      ></div>
      <div id="modal-content">
        {modalContent}
      </div>
    </div>,
    document.getElementById("portal-root")
  ) : null;
};

function useModal() {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState("Stuff in here.");
  const handleModal = (content = false) => {
    setModal(!modal);
    if (content) {
      setModalContent(content);
    }
  };
  return {modal, handleModal, modalContent};
}

const ModalContext = createContext();
const ModalProvider = ({children}) => {
  const {modal, handleModal, modalContent} = useModal();
  return (
    <ModalContext.Provider value={{modal, handleModal, modalContent}}>
      <ModalPortal/>
      {children}
    </ModalContext.Provider>
  );
};

const ChatModalBtn = () => {
  const {handleModal} = useContext(ModalContext);
  return (
    <button onClick={() => handleModal(<Chat />)}>
      OPEN SESAME
    </button>
  );
};

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
	  <Board />
          <ModalProvider>
            <ChatModalBtn />
          </ModalProvider>
        </Route>
        <Route path="/chat-debug">
          <Chat />
        </Route>
      </Switch>
    </>
  );
}

export default App;
