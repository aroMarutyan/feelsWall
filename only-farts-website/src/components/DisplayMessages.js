import { colorCoding } from "../core/colorCoding";
import { useState, useEffect } from "react";

import { css, dynamicFontSize } from "../styles/mediaStyles";

const DisplayMessages = ({ message, isVisible }) => {
  const minFontSize = 1.3;
  const maxFontSize = 2.7;
  const fontSize = dynamicFontSize(minFontSize, maxFontSize);
  const [rotate, setRotate] = useState(rotateRandom(30));
  const messages = css({
    color: colorCoding.get(message.emotion),
    //add formula to calculate the width - optional
    width: "75%",
    // fontSize: "clamp(1rem, 50%, 5rem)",
    fontSize: `clamp(${minFontSize}rem, ${fontSize[1]}rem + ${
      fontSize[0] * 100
    }vw, ${maxFontSize}rem)`,
    // position: "absolute",
    transform: `rotate(${rotate}deg)`,
  });

  function rotateRandom(val) {
    return `${Math.random() >= 0.5 ? "+" : "-"}${Math.random() * val}`;
  }

  dynamicFontSize(minFontSize, maxFontSize);

  useEffect(() => {
    if (isVisible) {
      setRotate(rotateRandom(30));
    }
  }, [isVisible]);

  return (
    <>
      <h3 className={messages()}>{message.message}</h3>
    </>
  );
};

export default DisplayMessages;
