// import AsyncMessageDelivery from "./AsyncMessageDelivery";
import AsyncAnimMsg from "./AsyncAnimMsg";

// import { styled } from "@stitches/react";
import "../styles/messageStyles.css";
// import { useTransition, animated } from "@react-spring/web";

///Figure out what to do with stitches
// const Box = styled("div", {
//   // backgroundColor: "gainsboro",
//   // borderRadius: "9999px",
//   position: "absolute",
//   //Cant get utils to work. Let's see if we even need them
//   utils: {
//     b: (value) => ({
//       bottom: value,
//     }),
//     top: (config) => (value) => ({
//       top: value,
//     }),
//     left: (config) => (value) => ({
//       left: value,
//     }),
//     right: (config) => (value) => ({
//       right: value,
//     }),
//   },
// });

const MessagesAggregator = ({ messages }) => {
  return (
    <>
      {/* {messages.length && (
        <Box>
          <AsyncMessageDelivery messages={messages} delay="3000" />
        </Box>
      )} */}

      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="140"
          xCorrectionValue={0}
          yCorrectionValue={0}
          xMathSign={"-"}
          yMathSign={"-"}
        />
      )}
      {/* {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="160"
          xCorrectionValue={0}
          yCorrectionValue={0}
          xMathSign={""}
          yMathSign={"-"}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="180"
          xCorrectionValue={0}
          yCorrectionValue={0}
          xMathSign={"-"}
          yMathSign={""}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="200"
          xCorrectionValue={0}
          yCorrectionValue={0}
          xMathSign={""}
          yMathSign={""}
        />
      )} */}

      {/* {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="6000" />
      )} */}
    </>
  );
};

export default MessagesAggregator;
