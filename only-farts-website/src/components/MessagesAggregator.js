import { useState, useEffect } from "react";
import db from "../core/firebase";
import { onSnapshot, collection } from "@firebase/firestore";
import AsyncMessageDelivery from "./AsyncMessageDelivery";

const MessagesAggregator = () => {
  const [messages, setMessages] = useState([]);

  //Most likely all messages rerender because of the useEffect
  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <>
      <h2>
        {messages.length && (
          <AsyncMessageDelivery messages={messages} delay="3000" />
        )}
      </h2>
      {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="4000" />
      )}
      {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="5000" />
      )}
      {messages.length && (
        <AsyncMessageDelivery messages={messages} delay="6000" />
      )}
    </>
  );
};

export default MessagesAggregator;
