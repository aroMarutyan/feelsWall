import "./App.css";
import db from "./core/firebase";
import { onSnapshot, collection } from "@firebase/firestore";

import { useState, useEffect, useContext } from "react";
// import { DataContext, DataContextProvider } from "./core/databaseSnapshot";

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Stats from "./components/Stats";

import MessagesAggregator from "./components/MessagesAggregator";
// import AsyncMessageDelivery from "./components/AsyncMessageDelivery";

import "./App.css";

//Task list
// Move datafetching to another component. use Context - OPTIONAL
// Figure out method for changing top, bottom, etc. without creating duplicate components
// Clean up the whole data==messages mess in Stats
// Create * page for nonexistent paths - "This page does not exist. Go back"
// Implement Stiches and see if it's actually worth it
// Implement text transition
// Add try catch - OPTIONAL
// Implement "message being sent" animation for the message page
// Refactor code, get rid of redundancies, and clean up. Including directories and default React shit
// Figure out what's the deal with the confusing firebase functions - called but never used
// Document every function with the cool document function. This is at the very end
// UNLIKELY - figure out method to prevent components form rerendering every time a message is sent to the database
// OPTIONAL - make censorship filter. For the kicks

//Add censorship filter - optional
// const censorFilter = (message) => {
//   const regex = /joder/gi;
//   return message.replaceAll(regex, "j****");
// };

function App() {
  // const { messages } = useContext(DataContext);
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
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "1%",
            left: "2%",
          }}
        >
          <h1 style={{ marginTop: "0", marginRight: "1em" }}>
            <a href="/">OnlyFarts</a>
          </h1>
          <span style={{ marginTop: "0.5em", marginRight: "1em" }}>
            <a href="/stats">Statistics</a>
          </span>
        </div>
        {/* <Stats
          data={messages}
          outerRadius="200"
          innerRadius="100"
          messages={messages}
        /> */}

        {/* Can just put the styles here */}
        {/* <DataContextProvider value={messages}> */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              exact
              element={<MessagesAggregator messages={messages} />}
            />
            <Route
              path="/stats"
              exact
              element={
                <Stats
                  // data={messages}
                  outerRadius="200"
                  innerRadius="100"
                  messages={messages}
                />
              }
            />
          </Routes>
        </BrowserRouter>
        {/* </DataContextProvider> */}
      </header>
      {/* <h2>
        {messages.length && (
          <AsyncMessageDelivery messages={messages} delay="3000" />
        )}
      </h2>
      {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="4000" />
      )}
      {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="5000" />
      )}
      {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="6000" />
      )} */}
    </div>
  );
}

export default App;
