"use client";
import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react";

// Define the state shape
interface TypingState {
  words: string[];
  currentWord: string;
  currentWordIdx: number;
  currentChar: string;
  currentCharIdx: number;
  typedWords: string[];
  typedChars: string[];
  testHistory: string[];
  timer: number;
  isGameFinished?: boolean;
  isGameStarted?: boolean;
  howManyRestarts: number;
}

const initState: TypingState = {
  words: [],
  currentWord: "",
  currentWordIdx: 0,
  currentChar: '',
  currentCharIdx: 0,
  typedWords: [],
  typedChars: [],
  testHistory: [],
  timer: 60, // Set the initial value of the timer
  isGameFinished: false,
  isGameStarted: false,
  howManyRestarts: 0,
};

// Define the available actions
type TypingAction =
  | { type: "SET_WORDS"; words: string[] }
  | {
      type: "UPDATE_CURRENT_CHAR";
      char: string;
      charIdx: number;
      typedChar: string;
    }
  | {
      type: "UPDATE_CURRENT_WORD";
      word: string;
      wordIdx: number;
      typedWord: string;
      historyWord: string;
    }
  | { type: "RESET_INPUT" }
  | { type: "RESET_TYPED_WORDS" }
  | { type: "START_TIMER" }
  | { type: "FINISH_GAME" }
  | { type: "RESET_GAME" }
  | { type: "START_GAME" };

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
    case "START_TIMER":
      return {
        ...state,
        timer: state.timer - 1,
      };
    case "FINISH_GAME":
      return {
        ...state,
        isGameFinished: true,
      };
    case "RESET_GAME":
      return {
        ...state,
        howManyRestarts: state.howManyRestarts + 1,
        isGameStarted: false,
        currentChar: "x",
        currentWord: "",
        currentWordIdx: 0,
        currentCharIdx: 0,
        typedWords: [],
        typedChars: [],
        isGameFinished: false,
        timer: 60,
        testHistory: [],
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

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  useEffect(() => {
    state.words.sort(() => Math.random() - 0.5);
  }, []);

  return (
    <TypingContext.Provider value={contextValue}>
      {children}
    </TypingContext.Provider>
  );
};

// Custom hook to consume the TypingContext
const useTypingContext = () => useContext(TypingContext);
export { TypingProvider, useTypingContext };
