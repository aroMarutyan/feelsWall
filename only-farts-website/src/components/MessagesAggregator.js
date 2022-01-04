import AsyncAnimMsg from "./AsyncAnimMsg";
import "../styles/messageStyles.css";
import { css, bp } from "../styles/mediaStyles";

const MessagesAggregator = ({ messages }) => {
  const mobileTest = window.innerWidth > bp[1];
  const gridBox = css({
    height: "95vh",
    width: "95vw",
    display: "grid",

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

  return (
    <div className={gridBox({ variant: mobileTest ? "desktop" : "mobile" })}>
      {messages.length && mobileTest && (
        <AsyncAnimMsg
          messages={messages}
          tension="400"
          xCorrectionValue={0}
          yCorrectionValue={0}
          // yCorrectionValue={-Math.floor(Math.random() * 200)}
          multiValue={30}
          xMathSign={"-"}
          yMathSign={"-"}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="50"
          xCorrectionValue={0}
          yCorrectionValue={0}
          multiValue={30}
          xMathSign={""}
          yMathSign={"-"}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="60"
          xCorrectionValue={0}
          yCorrectionValue={0}
          multiValue={30}
          xMathSign={"-"}
          yMathSign={""}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="70"
          xCorrectionValue={0}
          yCorrectionValue={0}
          multiValue={30}
          xMathSign={""}
          yMathSign={""}
        />
      )}
    </div>
  );
};

export default MessagesAggregator;
