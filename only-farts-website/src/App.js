import "./App.css";
import db from "./firebase";
import { onSnapshot, collection, addDoc } from "@firebase/firestore";
// import { onSnapshot, collection, doc, setDoc } from "@firebase/firestore";

import { useState, useRef, useEffect } from "react"; //use effect will be used for the display website

import "./App.css";

const DisplayMessages = ({ message }) => {
  return (
    <>
      <h3>{message.message}</h3>
      <span>{message.emotion}</span>
    </>
  );
};

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <DisplayMessages message={message} />
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
