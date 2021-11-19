import db from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";
import { createContext, useState, useEffect } from "react";

export const DataContext = createContext([]);

export const DataContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  // const dataContext = messages;

  return (
    <DataContext.Provider value={messages}>{children}</DataContext.Provider>
  );
};
// export const { Consumer } = Context;
