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
          tension="40"
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
          tension="50"
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
          tension="60"
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
          tension="70"
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
