"use client";
import { useTypingContext } from "@/contexts/TypingContext";
import { useEffect, useRef, useState } from "react";
import Results from "../result";

function Timer() {
  const intervalRef = useRef<NodeJS.Timeout>();
  const { state, dispatch } = useTypingContext();
  const time = state.timerInit;

  const [timer, setTimer] = useState(time);
  // update state to start the game when user types any thing
  useEffect(() => {
    if (!state.isGameStarted) {
      setTimer(time);
    }
  }, [state.howManyRestarts]);
  useEffect(() => {
    if (state.currentChar !== "" && !state.isGameStarted) {
      dispatch({ type: "START_GAME" });
    }
  }, [dispatch, state.currentChar]);
  // start the timer if the game has started
  useEffect(() => {
    if (!state.isGameStarted) return clearInterval(intervalRef.current);
    if (state.isGameStarted) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
  }, [state.isGameStarted, state.howManyRestarts]);

  // stop timer when game is over after 60 seconds
  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalRef.current);
      dispatch({ type: "FINISH_GAME" });
    }
  }, [dispatch, timer]);

  return (
    <>
      <Results time={time} timer={timer} />
      <p
        className={`text-xl text-gray-700 font-bold absolute text-center w-fit m-auto right-0 left-0 top-[20%]  ${
          timer === 0 && "_gameFinished"
        }`}
      >
        {timer}
      </p>
    </>
  );
}

export default Timer;
