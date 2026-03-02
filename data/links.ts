import { ClipboardList, House, UsersRound } from "lucide-react";
import { Links } from "@/types/links";

export const links: Links[] = [
  { href: "/home", title: "Inicio", Icon: House },
  {
    href: "/tasks",
    title: "Tareas",
    Icon: ClipboardList,
  },
  { href: "/users", title: "Usuarios", Icon: UsersRound },
];
