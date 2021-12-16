import { colorCoding } from "../core/colorCoding";

import {
  css,
  slope,
  yAxisIntersection,
  minFontSize,
  maxFontSize,
} from "../styles/mediaStyles";

const DisplayMessages = ({ message }) => {
  const messages = css({
    color: colorCoding.get(message.emotion),
    //add formula to calculate the width - optional
    width: "75%",
    // fontSize: "clamp(1rem, 50%, 5rem)",
    fontSize: `clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${
      slope * 100
    }vw, ${maxFontSize}rem)`,
    // position: "absolute",
  });

  return (
    <>
      <h3 className={messages()}>{message.message}</h3>
    </>
  );
};

export default DisplayMessages;
