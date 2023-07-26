import Article from "@/components/article";
import Input from "@/components/input";
import Results from "@/components/result";
import StoreWords from "@/components/store-words";
import Timer from "@/components/timer";

export default async function Home() {
  let UniqeWords: string[] = ["shobky"];
  let words: string[] = [];

  //fetch words from api
  const res = await fetch(
    "https://random-word-api.vercel.app/api?words=250&length=5"
  );
  const data = await res.json();
  words = data;
  words.forEach(word => {
    if (!UniqeWords.includes(word)) {
      UniqeWords.push(word);
    }
  });
  UniqeWords.sort(() => Math.random() - 0.5);

  return (
    <>
      <StoreWords words={UniqeWords} />
      <main className={`h-screen w-full `}>
        <Timer />
        <div className="h-full gap-16 flex flex-col pt-8 items-center justify-center">
          <Article />
          <Input />
        </div>
      </main>
    </>
  );
}
