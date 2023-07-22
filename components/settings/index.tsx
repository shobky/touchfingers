"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useTypingContext } from "@/contexts/TypingContext";

export default function Modal({ children }: { children: React.ReactNode }) {
  const { dispatch } = useTypingContext();
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  let timers = [30, 45, 60, 120];

  const handleChangeTimer = (time: number) => {
    dispatch({
      type: "RESET_GAME",
    });
    dispatch({
      type: "CHANGE_TIMER",
      time: time,
    });

    onDismiss();
  };

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    e => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto  bg-black/60 "
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25vw] h-[45vh] text-center items-center rounded-[50px] py-6 flex flex-col gap-6 "
      >
        {children}
        <p>
          <span className="font-medium text-xl mr-2"> Duration:</span>
          {timers.map(timer => (
            <span
              className="mx-2 font-semibold text-lg cursor-pointer hover:text-orange-600  "
              key={timer}
              onClick={() => handleChangeTimer(timer)}
            >
              {timer}
            </span>
          ))}
        </p>
        <button
          onClick={() => onDismiss()}
          className="mt-[20%] bg-orange-600 rounded-[50%] w-[55px]  aspect-square text-center text-white font-bold text-xl"
        >
          X
        </button>
      </div>
    </div>
  );
}
