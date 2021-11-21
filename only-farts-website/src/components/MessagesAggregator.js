// import AsyncMessageDelivery from "./AsyncMessageDelivery";
import MessageOne from "./MessageOne";
import MessageTwo from "./MessageTwo";
import MessageThree from "./MessageThree";
import MessageFour from "./MessageFour";
// import { styled } from "@stitches/react";
import "../styles/messageStyles.css";
import { useTransition, animated } from "@react-spring/web";

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
  // const transition = useTransition();
  return (
    <>
      {/* {messages.length && (
        <Box>
          <AsyncMessageDelivery messages={messages} delay="3000" />
        </Box>
      )} */}

      {/* {messages.length && (
        <AsyncMessageDelivery
          messages={messages}
          delay="4000"
          style={{
            position: "absolute",

            bottom: `${Math.floor(Math.random() * 30)}%`,
            right: `${Math.floor(Math.random() * 30)}%`,
          }}
        />
      )} */}

      {messages.length && <MessageOne messages={messages} delay="3000" />}
      {/* {messages.length && <MessageTwo messages={messages} delay="3000" />}
      {messages.length && <MessageThree messages={messages} delay="4000" />}
      {messages.length && <MessageFour messages={messages} delay="5000" />} */}
      {/* {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="6000" />
      )} */}
    </>
  );
};

export default MessagesAggregator;
