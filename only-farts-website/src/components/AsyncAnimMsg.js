import DisplayMessages from "./DisplayMessages";
import React, { useState, useEffect } from "react";
import "../styles/messageStyles.css";
import { useTransition, animated } from "@react-spring/web";
import { nlResVal, bp } from "../styles/mediaStyles";

const AsyncAnimMsg = ({
  messages,
  xCorrectionValue,
  yCorrectionValue,
  tension,
}) => {
  const wWidth = window.innerWidth;
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [xPositionValue, setXPositionValue] = useState(
    xPositionCalculator(nlResVal)
  );
  const [yPositionValue, setYPositionValue] = useState(
    yPositionCalculator(Math.random() >= 0.5 ? "+" : "-", nlResVal)
  );

  const transition = useTransition(isVisible, {
    //randomize x between 0 and 30
    //randomize y between -50 and 50
    //randomize sign for ALL elements
    //Use correction value to adjust the values
    //Modify nl reg formula to accept and use new values
    //Right side messages closer to the center

    from: {
      x: xPositionValue,
      y: yPositionValue,
      opacity: 0,
      filter: "blur(0.5px)",
    },
    enter: {
      x: xPositionValue,
      y: yPositionValue,
      opacity: 1,
    },
    leave: { opacity: 0 },

    config: { mass: 1, tension: tension, friction: 30 },
    onRest: () => setIsVisible(!isVisible),
  });

  function xPositionCalculator(positionValue) {
    const posFor = (value) =>
      value + Math.floor(Math.random() * xCorrectionValue) + "%";

    if (wWidth <= bp[0]) return posFor(1);

    if (wWidth >= bp[3]) return posFor(15);

    return posFor(positionValue);
  }
  function yPositionCalculator(sign, positionValue) {
    const posFor = (sign, value) =>
      sign + (value + Math.floor(Math.random() * yCorrectionValue)) + "%";

    return posFor(sign, positionValue);
  }

  useEffect(() => {
    if (isVisible) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setXPositionValue(xPositionCalculator(nlResVal));
      setYPositionValue(
        yPositionCalculator(Math.random() >= 0.5 ? "+" : "-", nlResVal)
      );
    }
  }, [isVisible]);

  return (
    <div
      className="containerr"
      style={{
        // position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            <DisplayMessages message={message} isVisible={isVisible} />
          </animated.div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default AsyncAnimMsg;
