import "./App.css";
import db from "./firebase";
import { collection, addDoc } from "@firebase/firestore";
import {
  sadness,
  happiness,
  disgust,
  love,
  surprise,
  fear,
  anger,
} from "./dictionary";

import { useState } from "react";

const App = () => {
  const [formValue, setFormValue] = useState("");
  const [emotion, setEmotion] = useState("");

  const emotionDetector = (message) => {
    const lowerCaseMsg = message.toLowerCase();

    const messageChecker = (array) => {
      const lowerCaseDict = array.join(",").toLowerCase().split(",");
      return (
        lowerCaseDict.some((word) => lowerCaseMsg.includes(word)) &&
        setEmotion(`${array[0]}`)
      );
    };

    messageChecker(sadness);
    messageChecker(happiness);
    messageChecker(disgust);
    messageChecker(love);
    messageChecker(surprise);
    messageChecker(fear);
    messageChecker(anger);
  };

  const handleNewMessage = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "messages");

    const payload = { message: formValue, emotion: emotion };
    const docRef = await addDoc(collectionRef, payload);

    setFormValue("");
    console.log(`The emotion is ${emotion}`);
    setEmotion("");
    console.log(`The ID of this message is ${docRef.id}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>OnlyFarts</h1>
        <form onSubmit={handleNewMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
          />

          <button
            type="submit"
            onClick={() => emotionDetector(formValue)}
            disabled={!formValue}
          >
            🕊️
          </button>
        </form>

        <h2>{formValue}</h2>
      </header>
    </div>
  );
};

export default App;
