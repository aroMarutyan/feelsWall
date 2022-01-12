import AsyncAnimMsg from "./AsyncAnimMsg";
import "../styles/messageStyles.css";
import { css, bp, mobileTest, scale } from "../styles/mediaStyles";
import { useState, useEffect } from "react";

const MessagesAggregator = ({ messages }) => {
  // const mobileTest = window.innerWidth > bp[1];
  const [loadingCounter, setLoadingCounter] = useState(0);

  const loadingNum = css({
    color: "black",
    position: "absolute",
    opacity: "1",
  });

  const gridBox = css({
    height: "95vh",
    width: "95vw",
    display: "grid",
    //So wild - when the filter is enabled you cannot click the links in the nav!
    //Blur is heavy on the performance! - 1px blur got the mac to 74degrees in a couple of minutes
    //Filter does not play well with the nav - probably because the nav does not have it's own space
    //Make space for the nav
    // filter: "blur(1px)",

    variants: {
      variant: {
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr 1fr 1fr",
        },
        desktop: {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        },
      },
    },
  });

  let int;

  useEffect(() => {
    int = setInterval(blurring, 30);
    // return () => loadingCounter > 99 && clearInterval(int);
  }, []);

  // let int = setInterval(blurring, 3000);

  function blurring() {
    setLoadingCounter((val) => val + 1);
    loadingCounter >= 99 && clearInterval(int);

    // loadingNum.innerText = `${loadingCounter}%`;
    // loadingNum. = scale(loadingCounter, 0, 100, 1, 0);
    // bg.style.filter = `blur(${scale(loadingCounter, 0, 100, 30, 0)}px)`;
  }

  return (
    <div className={gridBox({ variant: mobileTest ? "desktop" : "mobile" })}>
      {messages.length && mobileTest && (
        <AsyncAnimMsg
          messages={messages}
          tension="23"
          xCorrectionValue={25}
          yCorrectionValue={40}
          // multiValue={10}
          // xMathSign={"+"}
          // yMathSign={Math.random() >= 0.5 ? "+" : "-"}
        />
      )}
      <h3
        className={loadingNum({
          opacity: "scale(loadingCounter, 0, 100, 1, 0)",
        })}
      >
        {loadingCounter}%
      </h3>
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="31"
          xCorrectionValue={25}
          yCorrectionValue={40}
          // multiValue={10}
          // xMathSign={"+"}
          // yMathSign={Math.random() >= 0.5 ? "+" : "-"}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="41"
          xCorrectionValue={25}
          yCorrectionValue={40}
          // multiValue={10}
          // xMathSign={"+"}
          // yMathSign={Math.random() >= 0.5 ? "+" : "-"}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="53"
          xCorrectionValue={25}
          yCorrectionValue={40}
          // multiValue={10}
          // xMathSign={"+"}
          // yMathSign={Math.random() >= 0.5 ? "+" : "-"}
        />
      )}
    </div>
  );
};

export default MessagesAggregator;
