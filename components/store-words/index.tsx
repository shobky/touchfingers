"use client"

import { useTypingContext } from "@/contexts/TypingContext";
import { useEffect } from "react";

export default function StoreWords({ words }: { words: string[] }) {
    const {dispatch} = useTypingContext()
    useEffect(() => {
        dispatch({ type: "SET_WORDS", words: words });
      }, [words]);
  return <></>
}
