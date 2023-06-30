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

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputCharIdx = inputValue.length - 1;
    setTypedWord(inputValue.trim());
    if (inputValue === " ") {
      return;
    }
    dispatch({
      type: "UPDATE_CURRENT_CHAR",
      char: inputValue[inputCharIdx],
      charIdx: inputCharIdx,
      typedChar: inputValue[inputCharIdx],
    });
  }, []);

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === " " && typedWord !== "") {
        // Pressed space key
        dispatch({
          type: "UPDATE_CURRENT_WORD",
          word: state.words[state.currentWordIdx + 1],
          wordIdx: state.currentWordIdx + 1,
          typedWord: typedWord,
          historyWord: typedWord,
        });
        e.currentTarget.value = ""; // Reset input
        dispatch({ type: "RESET_INPUT" });
        setTypedWord("");
      }
    },
    [state.currentWordIdx, typedWord, state.words]
  );

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          id="input"
          value={typedWord}
          disabled={state.isGameFinished}
          ref={inputRef}
          className=" bg-gray-100 placeholder:text-slate-400 p-4 
             rounded-2xl  w-44 focus: outline-none text-xl font-semibold text-gray-500 text-center"
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          autoComplete="off"
          name="special-input"
        />
        <Restart />
      </div>
      {!state.isGameStarted && (
        <p className=" text-sm ml-3 mt-2 opacity-75 ">{`{ Press any key to start }`}</p>
      )}
    </div>
  );
};

export default Input;
