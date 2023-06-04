"use client";
import { useTypingContext } from "@/contexts/TypingContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import ts from "typescript";

export default function Restart() {
  const { state, dispatch } = useTypingContext();
  // const input = document.getElementById("input");
  const router = useRouter();

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
    state.words.sort(() => Math.random() - 0.5);

    // if (input) {
    //   // @ts-ignore
    //   input.value = "";
    // }
  };

  const refreshForNow = () => {
    window.location.reload();
    state.words.sort(() => Math.random() - 0.5);
  };
  return (
    <button onClick={refreshForNow}>
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
