import { colorCoding } from "../core/colorCoding";
import { useState, useEffect } from "react";

import { css, dynamicFontSize } from "../styles/mediaStyles";

const DisplayMessages = ({ message, isVisible }) => {
  const minFontSize = 1.6;
  const maxFontSize = 2.8;
  const fontSize = dynamicFontSize(minFontSize, maxFontSize);
  const [rotate, setRotate] = useState(rotateRandom(30));
  const messages = css({
    color: colorCoding.get(message.emotion),
    //add formula to calculate the width - optional
    width: "75%",
    fontSize: `clamp(${minFontSize}rem, ${fontSize}rem, ${maxFontSize}rem)`,
    // position: "absolute",
    transform: `rotate(${rotate}deg)`,
  });

  function rotateRandom(val) {
    return `${Math.random() >= 0.5 ? "+" : "-"}${Math.random() * val}`;
  }

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
