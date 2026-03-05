"use client";

import Link from "next/link";
import { SectionContainer } from "../sectionContainer/SectionContainer";
import { ArrowLeft } from "lucide-react";
import { AppIcon } from "@/components/svg/shared/AppIcon";

export function LoginUI({
  leftIcon,
  title,
  question,
  questionLinkTo,
  questionLinkToLabel,
  body,
}: {
  leftIcon: React.ReactNode;
  title: string;
  question: string;
  questionLinkTo: string;
  questionLinkToLabel: string;
  body: React.ReactNode;
}) {
  return (
    <SectionContainer>
      <div className="flex-1 h-dvh flex">
        <div className="h-full w-2/3 flex justify-center items-center relative">
          <Link
            href={"/"}
            className="absolute top-6 left-6 border border-green-500 p-2 rounded-2xl"
          >
            <ArrowLeft className="size-5 text-green-500" />
          </Link>
          <div className="w-1/3">{leftIcon}</div>
        </div>
        <div className="h-full w-1/3 flex items-center px-6 border-l border-neutral-200">
          <div className="w-full">
            <h1 className="font-semibold text-2xl mb-6">{title}</h1>
            <div className="flex gap-2 mb-6">
              <p>{question}</p>
              <Link href={questionLinkTo}>
                <p className="underline text-green-500">
                  {questionLinkToLabel}
                </p>
              </Link>
            </div>

            {body}

            <div className="w-40 m-auto mt-6">
              <AppIcon />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
