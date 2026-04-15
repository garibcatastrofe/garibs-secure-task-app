export const getInitials = (user_name: string): string => {
  if (!user_name) return "";

  const words = user_name.trim().split(" ");

  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  return initials;
};
