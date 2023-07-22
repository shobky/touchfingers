"use client";
import { useTypingContext } from "@/contexts/TypingContext";
import Image from "next/image";
import React from "react";

export default function Restart() {
  const { state, dispatch } = useTypingContext();
  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
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
