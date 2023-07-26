"use client";

import { useTypingContext } from "@/contexts/TypingContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Results({
  timer,
  time,
}: {
  timer: number;
  time: number;
}) {
  const { state, dispatch } = useTypingContext();

  const correctWords = state.words.filter((word, wordIdx) => {
    return state.testHistory[wordIdx] === word;
  });

  const accuracy = Math.round(
    (correctWords.length / state.testHistory.length) * 100
  );

  const calculateWordsPerMinute = () => {
    const timeTaken = (time - timer) / 1000; // Time taken in seconds
    const wordsPerMinute = (correctWords.length / timeTaken) * 60;
    return Math.round(wordsPerMinute);
  };

  return (
    <div className="flex justify-end absolute right-0  p-7 md:p-14 gap-8 items-center ">
      <div className="text-slate-800 flex gap-8 opacity-85 justify-start items-center text-lg md:text-xl ">
        <p className="flex flex-col  font-bold  ">
          <span>
            {Math.round(calculateWordsPerMinute() / 1000) || 0}{" "}
            <span style={{ fontSize: ".85em" }}>WPM</span>
          </span>
        </p>
        <p className="flex flex-col font-bold  ">
          <span>{accuracy || 0}%</span>
        </p>
      </div>
    </div>
  );
}
