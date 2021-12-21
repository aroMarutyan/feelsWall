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
  const mobileTest = window.innerWidth > 640;

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
          tension="400"
          xCorrectionValue={0}
          yCorrectionValue={0}
          // yCorrectionValue={-Math.floor(Math.random() * 200)}
          multiValue={5}
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
          multiValue={5}
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
          multiValue={5}
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
          multiValue={5}
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
