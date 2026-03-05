export const getTwBgColor = (state: string) => {
  if (state === "COMPLETADA") {
    return "bg-green-200";
  } else if (state === "NO COMPLETADA") {
    return "bg-blue-200";
  } else if (state === "EN PROCESO") {
    return "bg-yellow-200";
  } else {
    return "bg-red-200";
  }
};