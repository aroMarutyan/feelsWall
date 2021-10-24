import "./App.css";
import db from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";

import { useState, useEffect } from "react";

import "./App.css";

const DisplayMessages = ({ message }) => {
  return (
    <>
      <h3>{message.message}</h3>
      <span>{message.emotion}</span>
    </>
  );
};

//Add censorship filter

//Add color-coding function

//Add statistics page. Use react router

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
