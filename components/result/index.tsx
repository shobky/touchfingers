"use client";

import { useTypingContext } from "@/contexts/TypingContext";
import { useEffect } from "react";

export default function Results({ words }: { words: string[] }) {
  const { state, dispatch } = useTypingContext();

  // this updated the words state to render after fetching from server (don't ask me why it's in the results component)
  useEffect(() => {
    dispatch({ type: "SET_WORDS", words: words });
  }, [words]);

  const correctWords = state.words.filter((word, wordIdx) => {
    return state.testHistory[wordIdx] === word;
  });

  const accuracy = Math.round(
    (correctWords.length / state.testHistory.length) * 100
  );

  const calculateWordsPerMinute = () => {
    const timeTaken = (60 - state.timer) / 1000; // Time taken in seconds
    const wordsPerMinute = (correctWords.length / timeTaken) * 60;
    return Math.round(wordsPerMinute);
  };

  return (
    <div className="flex justify-end w-screen p-14 ">
      <div className="  text-slate-800 flex gap-8 opacity-85 justify-start ">
        <p className="flex flex-col  font-bold  ">
          <span className="text-xl">
            {Math.round(calculateWordsPerMinute() / 1000) || 0}{" "}
            <span style={{ fontSize: ".85em" }}>WPM</span>
          </span>
        </p>

        <p className="flex flex-col font-bold  ">
          <span className="text-xl">{accuracy || 0}%</span>
        </p>
      </div>
    </div>
  );
}
