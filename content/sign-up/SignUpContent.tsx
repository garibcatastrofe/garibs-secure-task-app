"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* HOOKS */
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { GreetingIcon } from "@/components/svg/GreetingIcon";
import { AppIcon } from "@/components/svg/AppIcon";
import {
  ArrowLeft,
  CircleCheckBig,
  CircleOff,
  Loader,
  Rocket,
} from "lucide-react";

/* NAVIGATION */
import Link from "next/link";
import { useRouter } from "next/navigation";

/* SERVER ACTIONS */
import { signUp } from "@/api/Users/controllers/signUp";

/* TYPES */
import { SignUpForm } from "./types/SignUpForm";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

export function SignUpContent() {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();
  const [saving, setSaving] = useState(false);

  const methods = useForm<SignUpForm>({
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("user_name", data.user_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("password_confirm", data.password_confirm);

      const response = await signUp(formData);

      if (response.ok) {
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex gap-2 items-center">
            <CircleCheckBig className="size-4 text-white" />
            <p className="text-white">{response.message}</p>
          </div>,
        );
        console.log(data);

        /* methods.reset(); */
        router.push("/home");
      } else {
        setAnnouncement(
          true,
          "bg-red-500",
          <div className="flex gap-2 items-center">
            <CircleOff className="size-4 text-white" />
            <p className="text-white">{response.message}</p>
          </div>,
        );
      }

      setSaving(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

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
          <div className="w-1/3">
            <GreetingIcon />
          </div>
        </div>
        <div className="h-full w-1/3 flex items-center px-6 border-l border-neutral-200">
          <div className="w-full">
            <h1 className="font-semibold text-2xl mb-6">Registrarse</h1>
            <div className="flex gap-2 mb-6">
              <p>¿Ya tienes cuenta?</p>
              <Link href={"/sign-in"}>
                <p className="underline text-green-500">Ingresar</p>
              </Link>
            </div>

            <FormProvider {...methods}>
              {/* USERNAME */}
              <div className="flex flex-col gap-2 w-full my-2">
                <p className="text-sm">Nombre de usuario</p>
                <Controller
                  name="user_name"
                  control={methods.control}
                  /* rules={{
                    required: "El nombre de usuario es necesario",
                  }} */
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      type="text"
                      id="user_name"
                      minLength={2}
                      maxLength={50}
                      placeholder="Nombre cool"
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-green-100 transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.user_name && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.user_name?.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2 w-full my-2">
                <p className="text-sm">Correo</p>
                <Controller
                  name="email"
                  control={methods.control}
                  /* rules={{
                    required: "El correo es necesario",
                  }} */
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      type="text"
                      id="email"
                      minLength={2}
                      maxLength={50}
                      placeholder="example@something.com"
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-green-100 transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.email && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.email?.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2 w-full my-2">
                <p className="text-sm">Contraseña</p>
                <Controller
                  name="password"
                  control={methods.control}
                  /* rules={{
                    required: "La contraseña es necesaria",
                  }} */
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      type="password"
                      id="password"
                      minLength={2}
                      maxLength={50}
                      placeholder="********"
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-green-100 transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.password && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.password?.message}
                  </p>
                )}
              </div>

              {/* PASSWORD_CONFIRM */}
              <div className="flex flex-col gap-2 w-full mt-2 mb-6">
                <p className="text-sm">Contraseña</p>
                <Controller
                  name="password_confirm"
                  control={methods.control}
                  /* rules={{
                    required: "La contraseña confirmada es necesaria",
                  }} */
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      type="password"
                      id="password_confirm"
                      minLength={2}
                      maxLength={50}
                      placeholder="********"
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-green-100 transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.password_confirm && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.password_confirm?.message}
                  </p>
                )}
              </div>

              <BouncingButton
                action={saving ? () => {} : methods.handleSubmit(onSubmit)}
                backgroundColorHover="#22c55e"
                backgroundColor="#22c55e"
                textColor="#ffffff"
                textColorHover="#ffffff"
                border="2px solid #22c55e"
                borderHover="2px solid #22c55e"
                twClassName="w-full h-fit px-4 py-2 rounded-2xl mb-6"
                disabled={saving ? true : false}
              >
                {saving ? (
                  <>
                    <span className="text-transparent">E</span>
                    <Loader className="size-4 animate-spin" />
                    <span className="text-transparent">E</span>
                  </>
                ) : (
                  <>
                    <Rocket className="size-4" />
                    <span>Registrarse</span>
                  </>
                )}
              </BouncingButton>
            </FormProvider>

            <div className="w-40 m-auto">
              <AppIcon />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
