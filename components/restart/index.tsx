"use client";
import { useTypingContext } from "@/contexts/TypingContext";
import Image from "next/image";
import React from "react";

export default function Restart() {
  const { state, dispatch } = useTypingContext();
  const input = document
    ? (document.getElementById("input") as HTMLInputElement)
    : "";

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
    state.words.sort(() => Math.random() - 0.5);
    if (input) {
      input.value = "";
    }
  };

  return (
    <button onClick={resetGame}>
      <Image
        className="mt-2 opacity-60 hover:opacity-70  "
        src="/restart.svg"
        width={44}
        height={44}
        alt="restart"
      />
    </button>
  );
}
