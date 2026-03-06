"use client";

/* COMPONENTS */
import { LoginUI } from "@/components/shared/loginUI/LoginUI";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { GreetingIcon } from "@/components/svg/sign-in/GreetingIcon";
import { Rocket } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTIONS */
import { signUp } from "@/src/Users/Infrastructure/userController";

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
      leftIcon={<GreetingIcon />}
      title="Registrarse"
      question="¿Ya tienes cuenta?"
      questionLinkTo="/sign-in"
      questionLinkToLabel="Ingresar"
      body={
        <FormProvider {...methods}>
          {/* USER_NAME */}
          <DinamicInputText<SignUpForm>
            name="user_name"
            label="Nombre de usuario"
            placeholder="Nombre cool"
            rules={{
              required: "El nombre de usuario es necesario",
              minLength: {
                value: 2,
                message:
                  "El nombre de usuario debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message:
                  "El nombre de usuario no puede tener más de 50 caracteres",
              },
            }}
          />

          {/* CORREO */}
          <DinamicInputText<SignUpForm>
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
          <DinamicInputText<SignUpForm>
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

          {/* PASSWORD_CONFIRM */}
          <DinamicInputText<SignUpForm>
            name="password_confirm"
            label="Confirmar contraseña"
            type="password"
            placeholder="********"
            rules={{
              minLength: {
                value: 2,
                message:
                  "La contraseña confirmada debe tener al menos 2 caracteres",
              },
              maxLength: {
                value: 50,
                message:
                  "La contraseña confirmada no puede tener más de 50 caracteres",
              },
            }}
          />

          {/* BOTÓN REGISTRARSE */}
          <DinamicBouncingButton
            action={methods.handleSubmit(onSubmit)}
            disabled={saving ? true : false}
            spin={saving ? true : false}
            text="Registrarse"
            Icon={Rocket}
          />
        </FormProvider>
      }
    />
  );
}
