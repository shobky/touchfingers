"use client";
import { useTypingContext } from "@/contexts/TypingContext";
import { useEffect, useRef } from "react";

function Timer() {
  const { state, dispatch } = useTypingContext();
  const intervalRef = useRef<NodeJS.Timeout>();

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
        dispatch({ type: "START_TIMER" });
      }, 1000);
    }
  }, [dispatch, state.isGameStarted, state.howManyRestarts]);

  // stop timer when game is over after 60 seconds  
  useEffect(() => {
    if (state.timer === 0) {
      clearInterval(intervalRef.current);
      dispatch({ type: "FINISH_GAME" });
    }
  }, [dispatch, state.timer]);

  return (
    <p
      className={`text-xl text-gray-700 font-bold ${
        state.timer === 0 && "_gameFinished"
      }`}
    >
      {state.timer}
    </p>
  );
}

export default Timer;
