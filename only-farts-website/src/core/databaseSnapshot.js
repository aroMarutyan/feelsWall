import db from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";
import { createContext, useState, useEffect } from "react";

const Context = createContext("Default Value");

const [messages, setMessages] = useState([]);

useEffect(
  () =>
    onSnapshot(collection(db, "messages"), (snapshot) =>
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    ),
  []
);
