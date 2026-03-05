"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* ICONS */
import { Loader, LucideIcon } from "lucide-react";

export function DinamicBouncingButton({
  action,
  disabled,
  spin,
  text,
  Icon,
}: {
  action: () => void;
  disabled: boolean;
  spin: boolean;
  text: string;
  Icon: LucideIcon;
}) {
  return (
    <BouncingButton
      action={spin ? () => {} : action}
      backgroundColorHover="#ffffff"
      backgroundColor="#22c55e"
      textColor="#ffffff"
      textColorHover="#22c55e"
      border="2px solid #ffffff"
      borderHover="2px solid #22c55e"
      twClassName="w-full h-fit px-4 py-2 rounded-2xl"
      disabled={disabled}
    >
      {spin ? (
        <>
          <span className="text-transparent">E</span>
          <Loader className="size-4 animate-spin" />
          <span className="text-transparent">E</span>
        </>
      ) : (
        <>
          <Icon className="size-4" />
          <span>{text}</span>
        </>
      )}
    </BouncingButton>
  );
}
