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
  const mobileTest = window.innerWidth > 768;

  // const mobileTest = !/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
  //   navigator.userAgent
  // );

  return (
    <>
      {/* {messages.length && (
        <Box>
          <AsyncMessageDelivery messages={messages} delay="3000" />
        </Box>
      )} */}

      {messages.length && mobileTest && (
        <AsyncAnimMsg
          messages={messages}
          tension="40"
          xCorrectionValue={"50%"}
          yCorrectionValue={"-50%"}
          xMathSign={"-"}
          yMathSign={"-"}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="50"
          xCorrectionValue={"-50%"}
          yCorrectionValue={0}
          xMathSign={""}
          yMathSign={"-"}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="60"
          xCorrectionValue={"50%"}
          yCorrectionValue={"-50%"}
          xMathSign={"-"}
          yMathSign={""}
        />
      )}
      {messages.length && (
        <AsyncAnimMsg
          messages={messages}
          tension="70"
          xCorrectionValue={"-50%"}
          yCorrectionValue={"-50%"}
          xMathSign={""}
          yMathSign={""}
        />
      )}

      {/* {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="6000" />
      )} */}
    </>
  );
};

export default MessagesAggregator;
