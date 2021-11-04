import { useEffect, useState } from "react";
import db from "./firebase";
import { onSnapshot, collection } from "@firebase/firestore";
import App from "./App";

// const MessagesStats = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(
//     () =>
//       onSnapshot(collection(db, "messages"), (snapshot) =>
//         setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//       ),
//     []
//   );
// };

const Stats = () => {
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "messages"), (snapshot) =>
        setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  return (
    <div>
      <h1>Statistics</h1>
      <h3>Number of Messages:{messages.length}</h3>
    </div>
  );
};

export default Stats;
