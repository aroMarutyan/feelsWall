import { colorCoding } from "../core/colorCoding";
import { useState } from "react";

const DisplayMessages = ({ message }) => {
  //potentially put useState here to control displaying of messages
  const [msgVisibility, setMsgVisibility] = useState("block");

  const MessageStyles = {
    // position: "absolute",
    // top: `${Math.floor(Math.random() * 50)}%`,
    // left: `${Math.floor(Math.random() * 50)}%`,
    // transform: "translate(-20%, -20%)",
    display: msgVisibility,
    transition: "display 1s ease", //Not doing anything
    color: colorCoding.get(message.emotion),
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMsgVisibility("none");
  //   }, delay);
  // }, [delay]);

  // setTimeout(() => {
  //   setMsgVisibility("none");
  // }, 3000);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setMsgVisibility(true);
  //   }, delay);
  // }, [delay]);

  // return visible ? <div>{props.children}</div> : <div />;

  // const msgVisibilityTimeout = () => {
  //   setTimeout(() => {
  //     setMsgVisibility("none");
  //   }, 1000);
  // };
  // msgVisibilityTimeout();
  // return (
  // setMsgVisibility("none");
  // const timer = setTimeout(() => {
  //   setMsgVisibility("none");
  // }, 3000);

  return msgVisibility ? (
    <>
      <h3
        style={MessageStyles}
        // style={{ color: colorCoding.get(message.emotion) }}
      >
        {message.message}
      </h3>
      {/* <span>{message.emotion}</span> */}
    </>
  ) : (
    <></>
  );
};

export default DisplayMessages;
