import "./App.css";
import db from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";

import { useState, useEffect } from "react";
import { colorCoding } from "./colorCoding";

import { Switch, Route, Routes } from "react-router-dom";

import Stats from "./components/Stats";

import MessagesAggregator from "./components/MessagesAggregator";
import AsyncMessageDelivery from "./components/AsyncMessageDelivery";

import "./App.css";

//Task list
// Export messages state to Stats page - can potentially move state to another file and export to other pages from there
// Implement stats page with number of messages and pie chart. Should look into D3.js for the pie chart
// Implement text transition
// Refactor code and get rid of redundancies
// Move functions to other files, leave only barebones App here

//Add censorship filter - optional
// const censorFilter = (message) => {
//   const regex = /joder/gi;
//   return message.replaceAll(regex, "j****");
// };

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
        <Routes>
          <Route path="/" exact element={<MessagesAggregator />} />
          <Route
            path="/stats"
            exact
            element={
              <Stats
                data={messages}
                outerRadius="200"
                innerRadius="100"
                messages={messages}
              />
            }
          />
        </Routes>
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
