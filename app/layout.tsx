import "./globals.css";
import { JSXElementConstructor, ReactElement } from "react";
import { Roboto } from "next/font/google";
import { TypingProvider } from "@/contexts/TypingContext";
import Footer from "@/components/footer";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "TOUCHFINGERS",
  description:
    "Test your typing speed and accuracy, And exercise your fingers, for free!",
};

export default async function RootLayout({
  children,
}: {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactElement<any, string | JSXElementConstructor<any>>[]
    | undefined;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} app`}>
        <header>
          <h1
            style={{ color: "rgba(228, 135, 14, 0.900)" }}
            className="text-2xl font-bold m-14 box-border absolute z-10"
          >
            {`<TOUCHFINGERS/>`}
          </h1>
        </header>
        <TypingProvider>{children}</TypingProvider>
        <footer className="absolute bottom-0 mb-14 mx-16">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
