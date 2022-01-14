import "./App.css";
import db from "./core/firebase";
import { onSnapshot, collection } from "@firebase/firestore";

import { useState, useEffect } from "react";
// import { DataContext, DataContextProvider } from "./core/databaseSnapshot";
import { css, scale } from "./styles/mediaStyles";
// import { globalCss } from "@stitches/react";

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
  // const [loadingCounter, setLoadingCounter] = useState(0);

  // const globalFontStyles = globalCss({
  //   "@font-face": {
  //     fontFamily: "blankRiver",
  //     src: 'url("fonts/Blank River.ttf")',
  //   },
  // });

  const app = css({
    textAlign: "center",
    // filter: `blur(${scale(loadingCounter, 0, 100, 30, 0)}px)`,
    // backgroundImage: 'url("img/background_wals_white_generated.jpg")',
    // backgroundSize: "auto",
    // minHeight: "100vh",
  });

  const main = css({
    backgroundImage: 'url("img/background_wals_white_generated.jpg")',
    backgroundSize: "auto",
    minHeight: "100vh",
    fontFamily: "blankRiver",
    // height: "95vh",
    fontSize: "16px",
    color: "white",
  });

  const navBar = css({
    display: "flex",
    alignItems: "center",
    color: "black",
    backgroundColor: "transparent",
    minHeight: "1vh",
  });

  const navMainLink = css({
    marginLeft: "2rem",
    // marginTop: "1rem",
    marginRight: "1rem",
    textDecoration: "none",
  });

  const navStatsLink = css({
    marginTop: "0.4rem",
    marginRight: "1rem",
    textDecoration: "none",
  });

  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <div className={app()}>
      <nav>
        {/* <div className="main"> */}
        <div className={navBar()}>
          <h1 className={navMainLink()}>
            <a style={{ textDecoration: "none", color: "black" }} href="/">
              OnlyFarts
            </a>
          </h1>
          <span className={navStatsLink()}>
            <a style={{ textDecoration: "none", color: "black" }} href="/stats">
              Statistics
            </a>
          </span>
        </div>
      </nav>
      <main className={main()}>
        {/* <Stats
          data={messages}
          outerRadius="200"
          innerRadius="100"
          messages={messages}
        /> */}

        {/* Can just put the styles here */}
        {/* <DataContextProvider value={messages}> */}
        {/* <div className="bounding-box"> */}
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
              element={<Stats messages={messages} />}
            />
          </Routes>
        </BrowserRouter>
        {/* </DataContextProvider> */}
        {/* </div> */}
      </main>
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
