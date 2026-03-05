"use client";

/* COMPONENTS */
import { LoginUI } from "@/components/shared/loginUI/LoginUI";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { EntranceIcon } from "@/components/svg/sign-up/EntranceIcon";
import { Rocket } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTIONS */
import { signIn } from "@/src/Users/Infrastructure/userController";

/* TYPES */
import { SignInForm } from "./types/SignInForm";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

export function SignInContent() {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();
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
        setAnnouncement(true, true, response.message);
        console.log(data);

        /* methods.reset(); */
        router.push("/home");
      } else {
        setAnnouncement(true, false, response.message);
      }

      setSaving(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
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
            isTextArea={false}
            rules={
              {
                /* required: "El correo es necesario",
                            minLength: {
                              value: 2,
                              message:
                                "El correo debe tener al menos 2 caracteres",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "El correo no puede tener más de 50 caracteres",
                            }, */
              }
            }
          />

          {/* PASSWORD */}
          <DinamicInputText<SignInForm>
            name="password"
            label="Contraseña"
            type="password"
            placeholder="********"
            isTextArea={false}
            rules={
              {
                /* minLength: {
                              value: 2,
                              message: "La contraseña debe tener al menos 2 caracteres",
                            },
                            maxLength: {
                              value: 50,
                              message: "La contraseña no puede tener más de 50 caracteres",
                            }, */
              }
            }
          />

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
  );
}
