import DisplayMessages from "./DisplayMessages";
import React, { useState, useEffect } from "react";
import "../styles/messageStyles.css";
// import { styled, css } from "@stitches/react";
import { useTransition, animated } from "@react-spring/web";
import { nlResVal } from "../styles/mediaStyles";

// Tasks left to do:
// 1. Solve async displaying of the messages - try playing around with the config value - DONE
// 2. Create a bounding box so the messages do not go out of bounds
// 2.1. Position the elements in the different parts of the screen - DONE
// 3. Add frosted glass loading to messages website
// 4. Animate sending message - DONE
// 4.1 OPTIONAL Add stars
// Optimize for different screens and mobile devices
// 5. Style everything
// 6. Clean up code
// 7. Secure firebase and add rules
// 8. Figure out deployment

// Need to figure out formula for the positioning - all the variables and numbers must be derived from the window dimensions.
// The dimension values are in an array now so that they can be sorted and used as min and max. Not sure how useful that is
// You really need to play around with the numbers. Take into account both computer and phone screens - vertical vs horizontal

// The displacement/jitter that sometimes occurs has to do with the div.containerr sizes. Maybe because of display:flex stuff. Need to figure out
const AsyncAnimMsg = ({
  messages,
  xCorrectionValue,
  yCorrectionValue,
  multiValue,
  xMathSign,
  yMathSign,
  tension,
}) => {
  const wWidth = window.innerWidth;
  // const wHeight = window.innerHeight;
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [xPositionValue, setXPositionValue] = useState(
    positionCalculator(xMathSign, nlResVal)
  );
  const [yPositionValue, setYPositionValue] = useState(
    positionCalculator(yMathSign, nlResVal)
  );

  const transition = useTransition(isVisible, {
    from: {
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 0,
    },
    enter: {
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: 1,
    },
    leave: { opacity: 0 },
    // from: {
    //   x: xPositionValue,
    //   y: yPositionValue,
    //   opacity: 0,
    // },
    // enter: {
    //   x: xPositionValue,
    //   y: yPositionValue,
    //   opacity: 1,
    // },
    // leave: { opacity: 0 },

    config: { mass: 1, tension: tension, friction: 30 },
    onRest: () => setIsVisible(!isVisible),
  });

  function positionCalculator(sign, positionValue) {
    const posFor = (sign, value) =>
      sign +
      (value +
        Math.floor(Math.random() * multiValue) +
        xCorrectionValue +
        yCorrectionValue) +
      "%";

    if (wWidth <= 320) return posFor(sign, 1);

    if (wWidth >= 1440) return posFor(sign, 10);

    return posFor(sign, positionValue);
  }

  useEffect(() => {
    if (isVisible) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setXPositionValue(positionCalculator(xMathSign, nlResVal));
      setYPositionValue(positionCalculator(yMathSign, nlResVal));
    }
  }, [isVisible]);

  return (
    // <div className="Testing div">
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
          <animated.div
            // className="bottom-right"
            // style={{
            //   opacity: opacity.to({
            //     range: [0.0, 0.75, 1.0],
            //     output: [0, 1, 0],
            //   }),
            // }}
            style={style}
          >
            <DisplayMessages
              message={message}

              // message={messages[Math.floor(Math.random() * messages.length)]}
            />
            {/* {console.log(positionValue)} */}
          </animated.div>
        ) : (
          ""
        )
      )}
      {/* Need to do more tests with the button. Seems like there's unintentional rerendering even when going from fade in to fade out */}
      {console.log(xPositionValue)}
      {/* {console.log(yPositionValue)} */}
    </div>
    // <button onClick={() => setIsVisible((prev) => !prev)}></button>
    // </div>
  );
};

export default AsyncAnimMsg;
