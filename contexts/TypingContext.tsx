"use client";
import  {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useMemo,
} from "react";

import { TypingState, TypingAction } from "@/types/contextTypes";

const initState: TypingState = {
  words: [],
  currentWord: "",
  currentWordIdx: 0,
  currentChar: "",
  currentCharIdx: 0,
  typedWords: [],
  typedChars: [],
  testHistory: [],
  //  Set the initial value of the timer
  timerInit: 60,
  isGameFinished: false,
  isGameStarted: false,
  howManyRestarts: 0,
};

const typingReducer = (
  state: TypingState,
  action: TypingAction
): TypingState => {
  switch (action.type) {
    case "SET_WORDS":
      return {
        ...state,
        words: action.words,
      };
    case "START_GAME":
      return {
        ...state,
        isGameStarted: true,
      };
    case "UPDATE_CURRENT_CHAR":
      return {
        ...state,
        currentChar: action.char,
        currentCharIdx: action.charIdx,
        typedChars: [...state.typedChars, action.typedChar],
      };
    case "UPDATE_CURRENT_WORD":
      return {
        ...state,
        currentWord: action.word,
        currentWordIdx: action.wordIdx,
        typedWords: [...state.typedWords, action.typedWord],
        testHistory: [...state.testHistory, action.historyWord],
        currentChar: "",
        currentCharIdx: 0,
      };
    case "RESET_GAME":
      return {
        ...initState,
        howManyRestarts: state.howManyRestarts + 1,
        words: state.words.sort(() => Math.random() - 0.5),
      };
    case "RESET_TYPED_WORDS":
      return {
        ...state,
        typedWords: [],
      };
    case "RESET_INPUT":
      return {
        ...state,
        currentChar: "  ",
        currentCharIdx: 0,
      };
    case "FINISH_GAME":
      return {
        ...state,
        isGameFinished: true,
      };

    default:
      return state;
  }
};

// Create the TypingContext
const TypingContext = createContext<{
  state: TypingState;
  dispatch: React.Dispatch<TypingAction>;
}>({
  state: initState,
  dispatch: () => null,
});

// Create the TypingProvider component
const TypingProvider = ({ children }: { children?: ReactNode | any }) => {
  const [state, dispatch] = useReducer(typingReducer, initState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

 
  return (
    <TypingContext.Provider value={contextValue}>
      {children}
    </TypingContext.Provider>
  );
};

// Custom hook to consume the TypingContext
const useTypingContext = () => useContext(TypingContext);
export { TypingProvider, useTypingContext };
