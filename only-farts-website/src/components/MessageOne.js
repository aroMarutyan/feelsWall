import DisplayMessages from "./DisplayMessages";
import React, { useState, useEffect } from "react";
import "../styles/messageStyles.css";
// import { styled, css } from "@stitches/react";
import { useTransition, animated, config, useSpring } from "@react-spring/web";

const MessageOne = ({ messages, delay }) => {
  // const [counter1, setCounter1] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  // const { opacity } = useSpring({ opacity: isVisible ? 1 : 0 });
  const transition = useTransition(isVisible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },

    // leave: (item) => async (next) => {
    //   await next({ opacity: 0 });
    // await onRest: () => setIsVisible(!isVisible),
    // },
    // reverse: !isVisible,
    // delay: 500,
    // config: { tension: 220, friction: 120 },

    //It resets anymations onRest, rerendering the component. that's why it moves, changes text and then fades away. We need to figure out a method to have the whole animation cycle without rerendering
    //Try with useEffect again. Maybe combine it with one of the animation properties (onRest,etc) to trigger the rerender when the whole animation ends
    config: config.molasses,
    onRest: () => setIsVisible(!isVisible),
    // onDelayEnd: () => setIsVisible(!isVisible),
  });
  //Need to figure out way to make top bottom right left props
  const AsyncMessageStyles = {
    position: "absolute",
    bottom: `${Math.floor(Math.random() * 30)}%`, //need to adjust these values just right
    right: `${Math.floor(Math.random() * 30)}%`,
    // right: "2%",
    // transform: "translate(-20%, -20%)", //Not doing anything
    // display: msgVisibility,
    // transition: "display 1s ease",
    // color: colorCoding.get(message.emotion),
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsVisible(!isVisible);
  //     // console.log(Math.floor(Math.random() * 50));
  //   }, 6000);
  // }, [delay]);

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
    isVisible && (
      <div className="container" style={AsyncMessageStyles}>
        {transition((style, item) =>
          item ? (
            <animated.h1
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
                message={messages[Math.floor(Math.random() * messages.length)]}
              />
            </animated.h1>
          ) : (
            ""
          )
        )}
        {/* Need to do more tests with the button. Seems like there's unintentional rerendering even when going from fade in to fade out */}
        {/* <button onClick={() => setIsVisible((prev) => !prev)}></button> */}
      </div>
    )
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
