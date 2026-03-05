"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";

/* HOOKS */
import { useState, useEffect } from "react";

/* UTILS */
import { formatDate, formatTime } from "@/utils/date";

/* LIBS */
import { motion } from "framer-motion";

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
      <motion.div
        className="flex flex-col items-center justify-center h-full px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <p className="text-2xl font-semibold lg:text-6xl md:text-4xl text-neutral-900">
          ¡Hola, <span className="text-green-500">Pirita Dremurr</span>!
        </p>
        <p className="mt-4 text-xl font-semibold lg:text-3xl md:text-2xl text-neutral-900">
          {dateTime.date}
        </p>
        <p className="mt-2 text-xl font-semibold lg:text-3xl md:text-2xl text-neutral-900">
          {dateTime.time}
        </p>
      </motion.div>
    </SectionContainer>
  );
}
