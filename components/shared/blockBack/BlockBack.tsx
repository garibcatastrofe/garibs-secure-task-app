"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BloquearBack() {
  const router = useRouter();

  useEffect(() => {
    // Empuja el estado actual al historial
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Vuelve a empujar el estado para evitar regresar
      window.history.pushState(null, "", window.location.href);
      // Opcional: redirigir
      //router.replace("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return null;
}
