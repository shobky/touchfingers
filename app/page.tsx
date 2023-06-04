"use client";
import Article from "@/components/article";
import Input from "@/components/input";
import Results from "@/components/resule";
import { useTypingContext } from "@/contexts/TypingContext";

export default function Home() {
  const { state } = useTypingContext();
  return (
    <main className={`h-screen w-full `}>
      {true && (
        <div className="absolute">
          <Results />
        </div>
      )}
      {state.words.length > 0 ? (
        <div className="h-full gap-16 flex flex-col pt-8 items-center justify-center">
          <Article />
          <Input />
        </div>
      ) : (
        <p className="relative top-2/4 text-xl opacity-60 text-center">Fetching Words...</p>
      )}
    </main>
  );
}
