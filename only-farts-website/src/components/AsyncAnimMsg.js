import DisplayMessages from "./DisplayMessages";
import React, { useState, useEffect, useRef } from "react";
import "../styles/messageStyles.css";
// import { styled, css } from "@stitches/react";
import { useTransition, animated } from "@react-spring/web";

//VITAL - figure out how to keep the messages within bounds. Guess will have something to do with absolute/relative positions, the message aggregator component, and the App-header div. App-header div takes up the whole screen regardless what's there
//VITAL - figure out a way to make them appear async. Delay within the transition animation creates issues. Might need to figure out another way
//Try to play around with the config settings. Maybe can get delay there
//Adjust DisplayMessages width so that the next comes out compact and on several lines - DONE, but needs fine tuning
//Need to figure out the correctionValue. Right now cannot have both "-" and additional value, as type coercion is a bitch. Have to choose an implementation. If I put -200 it makes the math and subtracts the result - DONE
//Styles solved!!!

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
  xMathSign,
  yMathSign,
  tension,
}) => {
  // const [counter1, setCounter1] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [positionValue, setPositionValue] = useState(
    Math.floor(Math.random() * 100)
  );
  const wHeight = window.innerHeight / 10;
  const wWidth = window.innerWidth / 4;
  let dimArr = [wHeight, wWidth];
  // const { opacity } = useSpring({ opacity: isVisible ? 1 : 0 });
  const transition = useTransition(isVisible, {
    //Try to adapt the font formula here
    from: {
      x: "-50%",
      y: "-50%",
      opacity: 0,
    },
    enter: {
      x: "50%",
      y: "50%",
      opacity: 1,
    },
    leave: { opacity: 0 },
    // from: {
    //   x: Number(xMathSign + (wWidth - positionValue)),
    //   y: Number(yMathSign + (wHeight - positionValue)),
    //   opacity: 0,
    // },
    // enter: {
    //   x: Number(xMathSign + (wWidth - positionValue)),
    //   y: Number(yMathSign + (wHeight - positionValue)),
    //   opacity: 1,
    // },
    // leave: { opacity: 0 },
    // from: {
    //   x: positionCalculator(xMathSign, xCorrectionValue, positionValue),
    //   y: positionCalculator(yMathSign, yCorrectionValue, positionValue),
    //   opacity: 0,
    // },
    // enter: {
    //   x: positionCalculator(xMathSign, xCorrectionValue, positionValue),
    //   y: positionCalculator(yMathSign, yCorrectionValue, positionValue),
    //   opacity: 1,
    // },
    // leave: { opacity: 0 },

    config: { mass: 1, tension: tension, friction: 30 },
    // config: { mass: 1, tension: tension, friction: 120 },
    onRest: () => setIsVisible(!isVisible),
  });

  function positionCalculator(sign, positionValue) {
    // return Number(sign + (correctionValue + positionValue));
    let res =
      Number(sign + positionValue) +
      Number(sign + Math.floor(Math.random() * 200));

    if (Math.abs(res) >= 180) {
      res = 180;
      res = Number(sign + res);
    }
    // console.log(sign + res);
    console.log(res);
    return res;
  }

  //This is a good start. Best option is to find a way to bind it within borders, but if not, adjust values so that it stays within borders. More research
  function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
  }
  // function getRandomPosition(...arr) {
  //   return `${(Math.random() * (arr[0] - arr[1]) + arr[1]) * 30}`;
  // }

  useEffect(() => {
    if (isVisible) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      // setPositionValue(getRandomPosition(dimArr.sort()));
      // console.log(positionValue);
      setPositionValue(getRandomPosition(1, 10) * 30);
    }
  }, [isVisible]);

  // useEffect(() => {
  //   if (!isVisible) {
  //     setTimeout(() => {
  //       setIsVisible(true);
  //     }, 2000);
  //   }
  // }, [isVisible]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCounter1(counter1 + 1);
  //     // console.log(Math.floor(Math.random() * 50));
  //   }, delay);
  // }, [counter1, delay]);

  return (
    // <div className="Testing div">
    <div
      className="containerr"
      // style={{ position: "absolute" }}
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
            {console.log()}
          </animated.div>
        ) : (
          ""
        )
      )}
      {/* Need to do more tests with the button. Seems like there's unintentional rerendering even when going from fade in to fade out */}
    </div>
    // <button onClick={() => setIsVisible((prev) => !prev)}></button>
    // </div>
  );
};

export default AsyncAnimMsg;

// return (
//   isVisible && (
//     <div className="container" style={AsyncMessageStyles}>
//       {transition((style, item) =>
//         item ? (
//           <animated.div
//             // className="bottom-right"
//             // style={AsyncMessageStyles}
//             style={style}
//           >
//             <DisplayMessages
//               // key={counter1}
//               message={messages[Math.floor(Math.random() * messages.length)]}
//             />
//           </animated.div>
//         ) : (
//           ""
//         )
//       )}
//     </div>
//   )
// );

// {
//   range: [0.0, 0.75, 1.0],
//   output: [0, 1, 0],
// }
