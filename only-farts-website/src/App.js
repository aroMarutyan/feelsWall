import "./App.css";
import db from "./core/firebase";
import { onSnapshot, collection } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { css } from "./styles/mediaStyles";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Stats from "./components/Stats";
import MessagesAggregator from "./components/MessagesAggregator";

///Task list

// Add try catch - OPTIONAL
// Refactor code, get rid of redundancies, and clean up. Including directories and default React shit
// Figure out what's the deal with the confusing firebase functions - called but never used
// Document every function with the cool document function. This is at the very end

//Add spray cans to the messaging website

function App() {
  const [messages, setMessages] = useState([]);

  const app = css({
    textAlign: "center",
  });

  const main = css({
    backgroundImage: 'url("img/background_wals_white_generated.jpg")',
    backgroundSize: "auto",
    minHeight: "90vh",
    // maxHeight: "95vh",
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
              FeelsWall
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
      </main>
    </div>
  );
}

export default App;
