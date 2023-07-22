"use client";

import { useTypingContext } from "@/contexts/TypingContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Results({ words }: { words: string[] }) {
  const { state, dispatch } = useTypingContext();

  const time = state.timerInit
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
    const timeTaken = (time - state.timer) / 1000; // Time taken in seconds
    const wordsPerMinute = (correctWords.length / timeTaken) * 60;
    return Math.round(wordsPerMinute);
  };

  return (
    <div className="flex justify-end ">
      <div className="  text-slate-800 flex gap-8 opacity-85 justify-start items-center ">
        <p className="flex flex-col  font-bold  ">
          <span className="text-xl">
            {Math.round(calculateWordsPerMinute() / 1000) || 0}{" "}
            <span style={{ fontSize: ".85em" }}>WPM</span>
          </span>
        </p>

        <p className="flex flex-col font-bold  ">
          <span className="text-xl">{accuracy || 0}%</span>
        </p>
        <Link href="/settings">
          <Image
            alt="settings"
            width="48"
            height="48"
            src="/gear.svg"
            className=" w-6 opacity-80 relative -top-[1px] cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}
