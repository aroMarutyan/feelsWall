import { useState, useEffect } from "react";
import db from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";

const MessageSnapshot = () => {
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return <div></div>;
};

export default MessageSnapshot;
