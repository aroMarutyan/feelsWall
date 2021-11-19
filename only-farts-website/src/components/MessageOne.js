import DisplayMessages from "./DisplayMessages";
import React, { useState, useEffect } from "react";
import "../styles/messageStyles.css";
// import { styled, css } from "@stitches/react";

const MessageOne = ({ messages, delay, style }) => {
  const [counter1, setCounter1] = useState(1);
  //Need to figure out way to make top bottom right left props
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
    <div
      // className="bottom-right"
      style={AsyncMessageStyles}
      //   style={style}
    >
      <DisplayMessages
        // style={AsyncMessageStyles}

        key={counter1}
        message={messages[Math.floor(Math.random() * messages.length)]}
      />
    </div>
  ) : (
    ""
  );
};

export default MessageOne;
