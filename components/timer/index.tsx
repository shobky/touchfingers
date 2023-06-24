"use client";
import { useTypingContext } from "@/contexts/TypingContext";
import { stat } from "fs";
import { useEffect, useRef } from "react";

function Timer() {
  const { state, dispatch } = useTypingContext();
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (state.currentChar !== "x") {
      dispatch({ type: "START_GAME" });
    }
  }, [dispatch, state.currentChar]);

  useEffect(() => {
    if (!state.isGameStarted) return clearInterval(intervalRef.current);
    if (state.isGameStarted) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: "START_TIMER" });
      }, 1000);
    }
  }, [dispatch, state.isGameStarted]);

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
