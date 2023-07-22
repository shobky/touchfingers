// Define the state shape
export interface TypingState {
  words: string[];
  currentWord: string;
  currentWordIdx: number;
  currentChar: string;
  currentCharIdx: number;
  typedWords: string[];
  typedChars: string[];
  testHistory: string[];
  timer: number;
  timerInit: number;
  isGameFinished?: boolean;
  isGameStarted?: boolean;
  howManyRestarts: number;
}

// Define the available actions
export type TypingAction =
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
  | { type: "START_GAME" }
  | { type: "CHANGE_TIMER"; time: number };
