import "./App.css";
import db from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";

import { useState, useEffect, useRef } from "react";
import { colorCoding } from "./colorCoding";

import "./App.css";

// const msgStyle = () => {};

const DisplayMessages = ({ message }) => {
  //potentially put useState here to control displaying of messages
  const [msgVisibility, setMsgVisibility] = useState("block");

  const MessageStyles = useRef({
    position: "absolute",
    top: `${Math.floor(Math.random() * 50)}%`,
    left: `${Math.floor(Math.random() * 50)}%`,
    transform: "translate(-50%, -50%)",
    display: msgVisibility,
    transition: "display 1s ease",
    color: colorCoding.get(message.emotion),
  });

  // const msgVisibilityTimeout = () => {
  //   setTimeout(() => {
  //     setMsgVisibility("none");
  //   }, 1000);
  // };
  // msgVisibilityTimeout();
  // return (
  // setMsgVisibility("none");
  // const timer = setTimeout(() => {
  //   setMsgVisibility("none");
  // }, 3000);

  return (
    <>
      <h3
        style={MessageStyles.current}
        // style={{ color: colorCoding.get(message.emotion) }}
      >
        {message.message}
      </h3>
      {/* <span>{message.emotion}</span> */}
    </>
  );
};

//Add censorship filter - optional
// const censorFilter = (message) => {
//   const regex = /joder/gi;
//   return message.replaceAll(regex, "j****");
// };

//Add color-coding function - done

//Add statistics page. Use react router

//function for displaying the messages. will have set timeout secs and array as variables. Need to figure out method to make sure that a message is always displayed, regardless of array size.
//Can use a formula to calculate, or can put the messages in order
//three components that choose positioning in three distinct parts of the screen. or 4

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const DisplayAsyncMessages = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {messages.length && (
            <DisplayMessages
              message={messages[Math.floor(Math.random() * messages.length)]}
            />
          )}
        </div>
        {/* {messages.length && (
          <DisplayMessages
            message={messages[Math.floor(Math.random() * messages.length)]}
          />
        )}
        {messages.length && (
          <DisplayMessages
            message={messages[Math.floor(Math.random() * messages.length)]}
          />
        )}
        {messages.length && (
          <DisplayMessages
            message={messages[Math.floor(Math.random() * messages.length)]}
          />
        )} */}
        {/* <ul style={{ listStyleType: "none" }}>
          {console.log(messages)}
          {messages.map((message) => (
            <li key={message.id}>
              <DisplayMessages message={message} />
            </li>
            //3 or 4 components here that will display stuff in the 4 corners of the screen. Will need to make them display things asynchronously
          ))}
        </ul> */}
      </header>
    </div>
  );
}

export default App;
