import DisplayMessages from "./DisplayMessages";
import React, { useState, useEffect } from "react";
import "../styles/messageStyles.css";
// import { styled, css } from "@stitches/react";
import { useTransition, animated, config, useSpring } from "@react-spring/web";

//VITAL - need to figure out how to compute with percentages - DONE
//VITAL - figure out how to keep the messages within bounds. Guess will have something to do with absolute/relative positions, the message aggregator component, and the App-header div. App-header div takes up the whole screen regardless what's there
//VITAL - figure out a way to make them appear async. Delay within the transition animation creates issues. Might need to figure out another way
//Adjust DisplayMessages width so that the next comes out compact and on several lines - DONE, but needs fine tuning
//Need to figure out the correctionValue. Right now cannot have both "-" and additional value, as type coercion is a bitch. Have to choose an implementation. If I put -200 it makes the math and subtracts the result - DONE
//Styles solved!!!
///PUT THE MESSAGES IN A STATE. UPDATE THE STATE WHEN THE ANIMATION ENDS! BETTER WITH STATE ANYWAYS
//It resets anymations onRest, rerendering the component. that's why it moves, changes text and then fades away. We need to figure out a method to have the whole animation cycle without rerendering
//Try with useEffect again. Maybe combine it with one of the animation properties (onRest,etc) to trigger the rerender when the whole animation ends

const MessageOne = ({
  messages,
  xCorrectionValue,
  yCorrectionValue,
  xMathSign,
  yMathSign,
  delay,
}) => {
  // const [counter1, setCounter1] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [positionValue, setPositionValue] = useState(
    `${Math.floor(Math.random() * 100)}%`
  );
  // const { opacity } = useSpring({ opacity: isVisible ? 1 : 0 });
  const transition = useTransition(isVisible, {
    from: {
      x: positionValue,
      y: positionValue,
      opacity: 0,
    },
    enter: {
      x: positionValue,
      y: positionValue,
      opacity: 1,
    },
    leave: { opacity: 0 },
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

    // config: { tension: 220, friction: 120 },

    config: config.molasses,
    onRest: () => setIsVisible(!isVisible),
  });

  function positionCalculator(sign, positionValue, correctionValue) {
    return Number(sign + (correctionValue + positionValue));
  }

  useEffect(() => {
    if (isVisible) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setPositionValue(`${Math.floor(Math.random() * 100)}%`);
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
      className="container"
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

export default MessageOne;

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
