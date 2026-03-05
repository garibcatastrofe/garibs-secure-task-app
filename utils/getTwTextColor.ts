export const getTwTextColor = (state: string) => {
  if (state === "COMPLETADA") {
    return "text-green-500";
  } else if (state === "NO COMPLETADA") {
    return "text-blue-500";
  } else if (state === "EN PROCESO") {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
};
