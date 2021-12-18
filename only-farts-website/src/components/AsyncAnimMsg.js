import DisplayMessages from "./DisplayMessages";
import React, { useState, useEffect, useRef } from "react";
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
  xMathSign,
  yMathSign,
  tension,
}) => {
  // const [counter1, setCounter1] = useState(1);
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [yPositionValue, setYPositionValue] = useState(
    positionCalculator(yMathSign, nlResVal)
  );
  const [xPositionValue, setXPositionValue] = useState(
    positionCalculator(xMathSign, nlResVal)
  );

  // let dimArr = [wHeight, wWidth];
  // const { opacity } = useSpring({ opacity: isVisible ? 1 : 0 });
  const transition = useTransition(isVisible, {
    //Try to adapt the font formula here
    from: {
      x: xPositionValue,
      y: yPositionValue,
      opacity: 0,
    },
    enter: {
      x: xPositionValue,
      y: yPositionValue,
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
    const posFor = (sign, value) =>
      sign + (value + Math.floor(Math.random() * 10)) + "%";

    if (wWidth <= 320) return posFor(sign, 1);

    if (wWidth >= 1440) return posFor(sign, 45);

    return posFor(sign, positionValue);
  }
  // function positionCalculator(sign, positionValue) {
  //   // return Number(sign + (correctionValue + positionValue));
  //   let res =
  //     Number(sign + positionValue) +
  //     Number(sign + Math.floor(Math.random() * 200));

  //   if (Math.abs(res) >= 180) {
  //     res = 180;
  //     res = Number(sign + res);
  //   }
  //   // console.log(sign + res);
  //   console.log(res);
  //   return res;
  // }

  //This is a good start. Best option is to find a way to bind it within borders, but if not, adjust values so that it stays within borders. More research
  // function getRandomPosition(min, max) {
  //   return Math.random() * (max - min) + min;
  // }
  // function getRandomPosition(...arr) {
  //   return `${(Math.random() * (arr[0] - arr[1]) + arr[1]) * 30}`;
  // }

  useEffect(() => {
    if (isVisible) {
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      setYPositionValue(positionCalculator(yMathSign, nlResVal));
      setXPositionValue(positionCalculator(xMathSign, nlResVal));
    }
  }, [isVisible]);

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
            {/* {console.log(positionValue)} */}
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
