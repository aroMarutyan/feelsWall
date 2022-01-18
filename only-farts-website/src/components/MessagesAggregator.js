import AsyncAnimMsg from "./AsyncAnimMsg";
import "../styles/messageStyles.css";
import { css, mobileTest } from "../styles/mediaStyles";

const MessagesAggregator = ({ messages }) => {
  const gridBox = css({
    height: "88vh",
    width: "95vw",
    display: "grid",
    gridGap: "1rem",
    placeItems: "center",

    variants: {
      variant: {
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "1fr 1fr 1fr",
        },
        desktop: {
          gridTemplateColumns: "1fr 1fr 1fr",
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
          tension="33"
          xCorrectionValue={25}
          yCorrectionValue={40}
        />
      )}
      {messages.length && mobileTest && (
        <AsyncAnimMsg
          messages={messages}
          tension="27"
          xCorrectionValue={25}
          yCorrectionValue={40}
        />
      )}
      {messages.length && mobileTest && (
        <AsyncAnimMsg
          messages={messages}
          tension="48"
          xCorrectionValue={25}
          yCorrectionValue={40}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="36"
          xCorrectionValue={25}
          yCorrectionValue={40}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="41"
          xCorrectionValue={25}
          yCorrectionValue={40}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="53"
          xCorrectionValue={25}
          yCorrectionValue={40}
        />
      )}
    </div>
  );
};

export default MessagesAggregator;
