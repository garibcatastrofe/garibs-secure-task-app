"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";

/* HOOKS */
import { useState, useEffect } from "react";

/* UTILS */
import { formatDate, formatTime } from "@/utils/date";

export function HomeContent() {
  const [dateTime, setDateTime] = useState({
    date: formatDate(new Date()),
    time: formatTime(new Date()),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime({
        date: formatDate(new Date()),
        time: formatTime(new Date()),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center h-full px-4">
        <p className="text-2xl font-semibold lg:text-6xl md:text-4xl text-neutral-900">
          ¡Hola, <span className="text-green-500">Pirita Dremurr</span>!
        </p>
        <p className="mt-4 text-xl font-semibold lg:text-3xl md:text-2xl text-neutral-900">
          {dateTime.date}
        </p>
        <p className="mt-2 text-xl font-semibold lg:text-3xl md:text-2xl text-neutral-900">
          {dateTime.time}
        </p>
      </div>
    </SectionContainer>
  );
}
