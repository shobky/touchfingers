"use client";
import { useTypingContext } from "@/contexts/TypingContext";
import { useEffect, useRef, useState } from "react";

import { TIME } from "@/contexts/TypingContext";
function Timer() {
  const { state, dispatch } = useTypingContext();
  const intervalRef = useRef<NodeJS.Timeout>();
  const [time, setTime] = useState(TIME); //not in reducer state to avoid rerendering of all components

  // update state to start the game when user types any thing
  useEffect(() => {
    if (state.currentChar !== "") {
      dispatch({ type: "START_GAME" });
    }
  }, [dispatch, state.currentChar]);

  // start the timer if the game has started
  useEffect(() => {
    if (!state.isGameStarted) return clearInterval(intervalRef.current);
    if (state.isGameStarted) {
      intervalRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    }
  }, [dispatch, state.isGameStarted, state.howManyRestarts]);

  // stop timer when game is over after TIME seconds
  useEffect(() => {
    if (time === 0) {
      clearInterval(intervalRef.current);
      dispatch({ type: "FINISH_GAME" });
      setTime(TIME);
    }
  }, [dispatch, time]);

  return (
    <p
      className={`text-xl text-gray-700 font-bold ${
        time === 0 && "_gameFinished"
      }`}
    >
      {time}
    </p>
  );
}

export default Timer;
