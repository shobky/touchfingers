"use client";
import { useTypingContext } from "@/contexts/TypingContext";
import { useEffect, useState } from "react";
import Timer from "../timer";

const SHOWN_WORDS_COUNT = 20;

export default function Article() {
  const { state, dispatch } = useTypingContext();
  const [sliceIdx, setSliceIdx] = useState(SHOWN_WORDS_COUNT);

  console.log({ component: "article" });

  useEffect(() => {
    if (state.typedWords.length === SHOWN_WORDS_COUNT - 1) {
      setSliceIdx(prevSliceIdx => prevSliceIdx + SHOWN_WORDS_COUNT - 1);
      dispatch({
        type: "RESET_TYPED_WORDS",
      });
    }
  }, [state.typedWords, dispatch]);

  const getWordColor = (wordIdx: number, word: string): string => {
    // if the word is typed correctly
    if (state.typedWords[wordIdx] === word) {
      return "rgba(0, 0, 0, 0.208)";
    }
    // if the word is typed incorrectly
    if (
      state.typedWords[wordIdx] !== word &&
      state.currentWordIdx - (sliceIdx - SHOWN_WORDS_COUNT) > wordIdx
    ) {
      return "rgba(228, 135, 14, 1)";
    }
    // if the word is not typed yet
    else {
      return "rgba(0, 0, 0, 0.650)";
    }
  };

  return (
    <div
      style={{ height: "8.3rem" }}
      className="max-w-2xl w-fit p-5 box-border rounded-2xl"
    >
      <Timer />
      <div className="flex flex-wrap">
        {state.words
          ?.slice(sliceIdx - SHOWN_WORDS_COUNT, sliceIdx)
          .map((word: string, wordIdx: number) => {
            return (
              <p className=" w-fit flex mr-2 leading-8" key={wordIdx}>
                {Array.from(word).map((char: string, charIdx: number) => {
                  const isActive =
                    state.words[state.currentWordIdx] === word &&
                    word[state.currentCharIdx] === char &&
                    charIdx === state.currentCharIdx;
                  const firstChar = state.currentChar === "" || !state.currentChar?.match(/[a-zA-Z]/)
                  return (
                    <span
                      key={`${wordIdx}-${charIdx}`}
                      className={`block text-2xl tracking-wide font-bold ease-in-out duration-100 relative`}
                      style={{
                        color: getWordColor(wordIdx, word),
                      }}
                    >
                      {(firstChar && isActive) && (
                        <span className="_cursorAnimation absolute text-orange-400  ease-in-out duration-150 text-2xl h-6 overflow-hidden bottom-0">
                          |
                        </span>
                      )}

                      {char}
                      {(isActive && !firstChar) && (
                        <span className="_cursorAnimation absolute text-orange-400  ease-in-out duration-150 text-2xl h-6 overflow-hidden bottom-0">
                          |
                        </span>
                      )}
                    </span>
                  );
                })}{" "}
              </p>
            );
          })}
      </div>
    </div>
  );
}
