"use client";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTypingContext } from "@/contexts/TypingContext";
import Restart from "../restart";

const Input: React.FC = () => {
  const { state, dispatch } = useTypingContext();
  const [typedWord, setTypedWord] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTypedWord("");
  }, [state.howManyRestarts]);

  useEffect(() => {
    if (state.isGameStarted) return;
    const handleKeyPress = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleInputChange = useCallback((inputValue: string, idx: number) => {
    dispatch({
      type: "UPDATE_CURRENT_CHAR",
      char: inputValue[idx],
      charIdx: idx,
      typedChar: inputValue[idx],
    });
  }, []);

  const handleNewWord = useCallback(() => {
    dispatch({
      type: "UPDATE_CURRENT_WORD",
      word: state.words[state.currentWordIdx + 1],
      wordIdx: state.currentWordIdx + 1,
      typedWord: typedWord,
      historyWord: typedWord,
    });
    dispatch({ type: "RESET_INPUT" });
    setTypedWord("");
  }, [state.currentWordIdx, typedWord]);

  const callOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const idx = inputValue.length - 1;
      setTypedWord(inputValue.trim());

      if (inputValue[idx] === " " && typedWord !== "") {
        //starts a new word on if the input is "" (Ie. spacebar)
        handleNewWord();
        e.currentTarget.value = "";
        return;
      }

      handleInputChange(inputValue, idx);
    },
    [typedWord]
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          id="input"
          value={typedWord}
          disabled={state.isGameFinished}
          ref={inputRef}
          type="text"
          onChange={callOnChange}
          autoComplete="off"
          name="special-input"
          className=" bg-gray-100 placeholder:text-slate-400 p-4 
          rounded-2xl  w-44 focus: outline-none text-xl font-semibold text-gray-500 text-center"
        />
        <Restart />
      </div>

      {!state.isGameStarted && (
        <p className=" text-sm  ml-8 mt-2 opacity-75 ">{`{ Press "${
          state.words[0] ? state.words[0][0] : "any key"
        }" to start }`}</p>
      )}
    </div>
  );
};

export default Input;
