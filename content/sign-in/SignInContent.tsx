"use client";

/* API CALLS */
import { signIn, verify } from "@/src/Users/Infrastructure/UserController";

/* COMPONENTS */
import { LoginUI } from "@/components/shared/loginUI/LoginUI";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";
import { Announcement } from "@/components/shared/announcement/Announcement";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";

/* ICONS */
import { EntranceIcon } from "@/components/svg/sign-up/EntranceIcon";
import { Rocket } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* TYPES */
import { SignInForm } from "./types/SignInForm";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useAuthStore } from "@/stores/authentication/autenticacionStore";

export function SignInContent() {
  const router = useRouter();

  const { setAnnouncement } = useAnnouncement();
  const { setUser } = useAuthStore();

  const [saving, setSaving] = useState(false);

  const methods = useForm<SignInForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await signIn(formData);

      if (response.ok) {
        const verifyResponse = await verify();

        if (verifyResponse.ok && verifyResponse.id !== null) {
          setUser({ user: { id: verifyResponse.id } });

          setAnnouncement({
            isActivated: true,
            isOk: true,
            message: verifyResponse.message,
          });

          router.push("/home");
        } else {
          setAnnouncement({
            isActivated: true,
            isOk: false,
            message: verifyResponse.message,
          });
        }
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }

      setSaving(false);
    } catch (error) {
      console.log("Error", error);

      setAnnouncement({
        isActivated: true,
        isOk: false,
        message: "Ocurrió un error al ingresar, intente nuevamente más tarde",
      });
    }
  };

  useEffect(() => {
    try {
      const checkVerify = async () => {
        const response = await verify();

        if (response.ok) {
          router.push("/home");
        }
      };

      checkVerify();
    } catch (error) {
      console.log("Error: ", error);
    }
  }, [router]);

  return (
    <>
      <Announcement />
      <LoginUI
        leftIcon={<EntranceIcon />}
        title="Ingresar"
        question="¿No tienes cuenta?"
        questionLinkTo="/sign-up"
        questionLinkToLabel="Registrarse"
        body={
          <FormProvider {...methods}>
            {/* CORREO */}
            <DinamicInputText<SignInForm>
              name="email"
              label="Correo"
              placeholder="example@something.com"
              rules={{
                required: "El correo es necesario",
                minLength: {
                  value: 2,
                  message: "El correo debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "El correo no puede tener más de 50 caracteres",
                },
              }}
            />

            {/* PASSWORD */}
            <DinamicInputText<SignInForm>
              name="password"
              label="Contraseña"
              type="password"
              placeholder="********"
              rules={{
                minLength: {
                  value: 2,
                  message: "La contraseña debe tener al menos 2 caracteres",
                },
                maxLength: {
                  value: 50,
                  message: "La contraseña no puede tener más de 50 caracteres",
                },
              }}
            />

            {/* BOTÓN INGRESAR */}
            <DinamicBouncingButton
              action={methods.handleSubmit(onSubmit)}
              disabled={saving ? true : false}
              spin={saving ? true : false}
              text="Ingresar"
              Icon={Rocket}
            />
          </FormProvider>
        }
      />
    </>
  );
}
