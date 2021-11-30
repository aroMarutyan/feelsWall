import "./App.css";
import db from "./firebase";
import { collection, addDoc } from "@firebase/firestore";
import {
  sad,
  happy,
  disgusted,
  love,
  surprised,
  afraid,
  angry,
} from "./dictionary";

import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const App = () => {
  const [formValue, setFormValue] = useState("");
  const [emotion, setEmotion] = useState("");
  const [emotionStrength, setEmotionStrength] = useState(new Map());

  const emotionDetector = (message) => {
    const lowerCaseMsg = message.toLowerCase();

    const messageChecker = (array) => {
      let wordCount = 0;
      const lowerCaseDict = array.join(",").toLowerCase().split(",");
      lowerCaseDict.map((word) => lowerCaseMsg.includes(word) && wordCount++);
      setEmotionStrength(emotionStrength.set(array[0], wordCount));
    };

    const emotionStrengthEvaluator = (map) => {
      const filteredEmotionStrength = [...map].filter((arr) => arr[1] > 0);
      const sortedEmotionStrength = filteredEmotionStrength.sort(
        (a, b) => b[1] - a[1]
      );
      setEmotion(
        sortedEmotionStrength.length ? sortedEmotionStrength[0][0] : "other"
      );
    };

    messageChecker(sad);
    messageChecker(happy);
    messageChecker(disgusted);
    messageChecker(love);
    messageChecker(surprised);
    messageChecker(afraid);
    messageChecker(angry);

    emotionStrengthEvaluator(emotionStrength);
  };

  const handleNewMessage = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "messages");
    let finalMsg = formValue.charAt(0).toUpperCase() + formValue.slice(1);

    const payload = {
      message: finalMsg,
      emotion: emotion,
    };
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
        <animated.div>
          <div style={{ position: "absolute" }}>
            <h2>{formValue}</h2>
          </div>
        </animated.div>
      </header>
    </div>
  );
};

export default App;
