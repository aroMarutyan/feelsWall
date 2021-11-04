import "./App.css";
import db from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";

import { useState, useEffect } from "react";
import { colorCoding } from "./colorCoding";

import "./App.css";

// const msgStyle = () => {};

//Task list
// Export messages state to Stats page - can potentially move state to another file and export to other pages from there
// Implement stats page with number of messages and pie chart
// Implement text transition
// Refactor code and get rid of redundancies
// Move functions to other files, leave only barebones App here

const DisplayMessages = ({ message }) => {
  //potentially put useState here to control displaying of messages
  const [msgVisibility, setMsgVisibility] = useState("block");

  const MessageStyles = {
    // position: "absolute",
    // top: `${Math.floor(Math.random() * 50)}%`,
    // left: `${Math.floor(Math.random() * 50)}%`,
    // transform: "translate(-20%, -20%)",
    display: msgVisibility,
    transition: "display 1s ease", //Not doing anything
    color: colorCoding.get(message.emotion),
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMsgVisibility("none");
  //   }, delay);
  // }, [delay]);

  // setTimeout(() => {
  //   setMsgVisibility("none");
  // }, 3000);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMsgVisibility(true);
  //   }, delay);
  // }, [delay]);

  // return visible ? <div>{props.children}</div> : <div />;

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

  return msgVisibility ? (
    <>
      <h3
        style={MessageStyles}
        // style={{ color: colorCoding.get(message.emotion) }}
      >
        {message.message}
      </h3>
      {/* <span>{message.emotion}</span> */}
    </>
  ) : (
    <></>
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

export function MessagesState(messages) {
  useEffect(() => {}, [messages]);
}

function App() {
  const [messages, setMessages] = useState([]);

  // const mountUnmountComponent = (counter, delay)=>{
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setCounter1(counter + 1);
  //     }, delay);
  //   }, [counter]);
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCounter1(counter1 + 1);
  //   }, 3000);
  // }, [counter1]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCounter2(counter2 + 1);
  //   }, 4000);
  // }, [counter2]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCounter3(counter3 + 1);
  //   }, 5000);
  // }, [counter3]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCounter4(counter4 + 1);
  //   }, 6000);
  // }, [counter4]);

  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  const DisplayAsyncMessage1 = ({ message, delay }) => {
    const [counter1, setCounter1] = useState(1);
    const AsyncMessageStyles = {
      position: "absolute",
      bottom: `${Math.floor(Math.random() * 30)}%`, //need to adjust these values just right
      right: `${Math.floor(Math.random() * 30)}%`,
      // right: "2%",
      transform: "translate(-20%, -20%)", //Not doing anything
      // display: msgVisibility,
      transition: "display 1s ease",
      // color: colorCoding.get(message.emotion),
    };
    useEffect(() => {
      setTimeout(() => {
        setCounter1(counter1 + 1);
        // console.log(Math.floor(Math.random() * 50));
      }, delay);
    }, [counter1, delay]);

    return counter1 > 0 ? (
      <div style={AsyncMessageStyles}>
        <DisplayMessages
          key={counter1}
          message={messages[Math.floor(Math.random() * messages.length)]}
        />
      </div>
    ) : (
      ""
    );
  };
  const DisplayAsyncMessage2 = ({ message, delay }) => {
    const [counter1, setCounter1] = useState(0);
    const AsyncMessageStyles = {
      position: "absolute",
      bottom: `${Math.floor(Math.random() * 50)}%`,
      left: `${Math.floor(Math.random() * 50)}%`,
      transform: "translate(-80%, -80%)",
      // display: msgVisibility,
      transition: "display 1s ease",
      // color: colorCoding.get(message.emotion),
    };
    useEffect(() => {
      setTimeout(() => {
        setCounter1(counter1 + 1);
      }, delay);
    }, [counter1, delay]);
    return (
      <div style={AsyncMessageStyles}>
        <DisplayMessages
          key={counter1}
          message={messages[Math.floor(Math.random() * messages.length)]}
        />
      </div>
    );
  };
  const DisplayAsyncMessage3 = ({ message, delay }) => {
    const [counter1, setCounter1] = useState(0);
    const AsyncMessageStyles = {
      position: "absolute",
      top: `${Math.floor(Math.random() * 50)}%`,
      right: `${Math.floor(Math.random() * 50)}%`,
      transform: "translate(-20%, -20%)",
      // display: msgVisibility,
      transition: "display 1s ease",
      // color: colorCoding.get(message.emotion),
    };
    useEffect(() => {
      setTimeout(() => {
        setCounter1(counter1 + 1);
      }, delay);
    }, [counter1, delay]);
    return (
      <div style={AsyncMessageStyles}>
        <DisplayMessages
          key={counter1}
          message={messages[Math.floor(Math.random() * messages.length)]}
        />
      </div>
    );
  };
  const DisplayAsyncMessage4 = ({ message, delay }) => {
    const [counter1, setCounter1] = useState(0);
    const AsyncMessageStyles = {
      position: "absolute",
      top: `${Math.floor(Math.random() * 50)}%`,
      left: `${Math.floor(Math.random() * 50)}%`,
      transform: "translate(-20%, -20%)",
      // display: msgVisibility,
      transition: "display 1s ease",
      // color: colorCoding.get(message.emotion),
    };
    useEffect(() => {
      setTimeout(() => {
        setCounter1(counter1 + 1);
      }, delay);
    }, [counter1, delay]);
    return (
      <div style={AsyncMessageStyles}>
        <DisplayMessages
          style={AsyncMessageStyles}
          key={counter1}
          message={messages[Math.floor(Math.random() * messages.length)]}
        />
      </div>
    );
  };

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
          <h1 style={{ marginTop: "0", marginRight: "1em" }}>OnlyFarts</h1>
          <span style={{ marginTop: "0.5em", marginRight: "1em" }}>
            <a href="/Stats.js">Statistics</a>
          </span>
        </div>
        {/* <div>{messages.length && <DisplayAsyncMessages arr={messages} />}</div> */}
        {/* <div>
          {messages.length && (
            <DisplayMessages
              key={counter1}
              delay="3000"
              message={messages[Math.floor(Math.random() * messages.length)]}
            />
          )}
        </div>
        {messages.length && (
          <DisplayMessages
            key={counter2}
            delay="3000"
            message={messages[Math.floor(Math.random() * messages.length)]}
          />
        )}
        {messages.length && (
          <DisplayMessages
            key={counter3}
            delay="3000"
            message={messages[Math.floor(Math.random() * messages.length)]}
          />
        )}
        {messages.length && (
          <DisplayMessages
            key={counter4}
            delay="3000"
            message={messages[Math.floor(Math.random() * messages.length)]}
          />
        )} */}
        {messages.length && <DisplayAsyncMessage1 delay="3000" />}
        {/* {messages.length && <DisplayAsyncMessage2 delay="4000" />} */}
        {/* {messages.length && <DisplayAsyncMessage3 delay="5000" />} */}
        {/* {messages.length && <DisplayAsyncMessage4 delay="6000" />} */}
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
