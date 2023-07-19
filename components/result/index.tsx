"use client";

import { useTypingContext } from "@/contexts/TypingContext";
import { useEffect, useRef, useState } from "react";
import { TIME } from "@/contexts/TypingContext";
export default function Results({ words }: { words: string[] }) {
  const { state, dispatch } = useTypingContext();
  const [time, setTime] = useState(TIME); //not in reducer state to avoid rerendering of all components
  const [wpm, setWpm] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!state.isGameStarted) {
      clearInterval(intervalRef.current);
      setTime(TIME);
      return;
    }
    if (state.isGameStarted) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    }
  }, [dispatch, state.isGameStarted, state.howManyRestarts]);
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

  useEffect(() => {
    const calculatedWordsPerMinute = Math.floor(
      (correctWords.length / (60 - time)) * 60
    );
    setWpm(calculatedWordsPerMinute);
  }, [correctWords, time]);

  return (
    <div className="flex justify-end w-screen p-14 ">
      <div className="  text-slate-800 flex gap-8 opacity-85 justify-start ">
        <p className="flex flex-col  font-bold  ">
          <span className="text-xl">
            {wpm || 0}
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
