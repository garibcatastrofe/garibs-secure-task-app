"use client";

import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { AppIcon } from "@/components/svg/AppIcon";
import { HomeIcon } from "@/components/svg/HomeIcon";
import { useRouter } from "next/navigation";

export function PresentationContent() {
  const router = useRouter();

  return (
    <SectionContainer>
      <div className="flex-1 h-dvh flex justify-center items-center gap-4">
        <div className="w-1/3 h-fit flex flex-col">
          <div className="w-1/2 mb-6">
            <AppIcon />
          </div>
          <h1 className="font-bold text-3xl mb-2">Organiza tus tareas</h1>
          <p className="mb-6">
            Con esta app podrás gestionar tus tareas diarias, organizarte y
            mantener un equilibrio entre tus hobbies y responsabilidades
          </p>
          <div className="flex gap-4">
            <BouncingButton
              action={() => router.push("/sign-in")}
              backgroundColor="#ffffff"
              backgroundColorHover="#22c55e"
              border="2px solid #22c55e"
              borderHover="2px solid #22c55e"
              textColor="#22c55e"
              textColorHover="#ffffff"
              twClassName="w-fit h-fit px-4 py-2 rounded-xl"
              disabled={false}
            >
              <p>Ingresar</p>
            </BouncingButton>
            <BouncingButton
              action={() => router.push("sign-up")}
              backgroundColor="#22c55e"
              backgroundColorHover="#22c55e"
              border="2px solid #22c55e"
              borderHover="2px solid #22c55e"
              textColor="#ffffff"
              textColorHover="#ffffff"
              twClassName="w-fit h-fit px-4 py-2 rounded-xl"
              disabled={false}
            >
              <p>Registrarse</p>
            </BouncingButton>
          </div>
        </div>
        <div className="h-2/5">
          <HomeIcon />
        </div>
      </div>
    </SectionContainer>
  );
}
