"use client";

/* COMPONENTS */
import { BoxSkeleton } from "@/components/shared/boxSkeleton/BoxSkeleton";
import { DinamicInsertUpdateUI } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUI";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* HOOKS */
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";

/* ICONS */
import { Save } from "lucide-react";
import { InsertUpdateUserIcon } from "@/components/svg/users/InsertUpdateUserIcon";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import {
  insertUser,
  selectUserById,
  updateUser,
} from "@/api/Users/Infrastructure/userController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { UserFormValues } from "@/content/users/types/UserFormValues";

/* UTILS */
import { getDate } from "@/utils/date";

/* LIBS */
import { motion } from "framer-motion";

export function InsertUpdateUserContent({
  isUpdate,
  id,
}: {
  isUpdate: boolean;
  id: string;
}) {
  const router = useRouter();

  const { setAnnouncement } = useAnnouncement();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const methods = useForm<UserFormValues>();

  const onSubmit = async (data: UserFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("id", data.id.toString());
      formData.append("user_name", data.user_name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("password_confirm", data.password_confirm);

      if (isUpdate) {
        const response = await updateUser(formData);

        if (response.ok) {
          setAnnouncement(true, true, response.message);
        } else {
          setAnnouncement(true, false, response.message);
        }
      } else {
        const response = await insertUser(formData);

        if (response.ok) {
          setAnnouncement(true, true, response.message);

          //methods.reset();
        } else {
          setAnnouncement(true, false, response.message);
        }
      }

      setSaving(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    try {
      const endLoading = () => {
        setLoading(false);
      };

      if (isUpdate) {
        const fetchUser = async () => {
          const response = await selectUserById(Number(id));

          if (response.ok) {
            methods.reset({
              id: Number(id),
              user_name: response.user.user_name,
              email: response.user.email,
              password: "",
              password_confirm: "",
            });
            endLoading();
          } else {
            setAnnouncement(true, false, response.message);

            router.push("/users");
          }
        };

        fetchUser();
      } else {
        methods.reset({
          id: 0,
          user_name: "",
          email: "",
          password: "",
          password_confirm: "",
        });
        endLoading();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <DinamicInsertUpdateUI
        backAction={() => router.push(`/users/`)}
        headerRightContent={
          <div className="flex gap-4">
            <p>
              Fecha: <span className="text-green-500">{getDate()}</span>
            </p>
          </div>
        }
        leftTitle="Datos del usuario"
        rightTitle="Guardar"
        leftContent={
          loading ? (
            <BoxSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* USER_ID */}
              {isUpdate && (
                <div className="flex flex-col gap-2 mb-4">
                  <p>ID de usuario</p>
                  <Controller
                    name="id"
                    control={methods.control}
                    /* rules={{ required: "El ID de usuario es necesario" }} */
                    render={({ field: { onChange, onBlur, value } }) => (
                      <input
                        onBlur={onBlur}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, ""); // Elimina cualquier carácter no numérico
                          onChange(val); // Actualiza el estado con solo números
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "e" || e.key === "-" || e.key === "+") {
                            e.preventDefault(); // Bloquea la entrada de estos caracteres
                          }
                        }}
                        value={value}
                        type="text" // Cambia a "text" para evitar comportamientos extraños con números
                        inputMode="numeric" // Ayuda en móviles
                        pattern="[0-9]*" // Solo números
                        id="id"
                        placeholder="1"
                        min={1}
                        max={99}
                        disabled
                        className="w-full text-sm h-fit px-4 py-2 bg-neutral-100 outline-none border border-neutral-200 pointer-events-none rounded-xl transition-all duration-300 placeholder:text-neutral-500 text-neutral-400"
                      />
                    )}
                  />
                  {methods.formState.errors.id && (
                    <p className="text-red-500 text-sm">
                      {methods.formState.errors.id.message}
                    </p>
                  )}
                </div>
              )}

              {/* USER_NAME */}
              <DinamicInputText<UserFormValues>
                name="user_name"
                label="Nombre de usuario"
                placeholder="Nombre cool"
                rules={
                  {
                    /* required: "El nombre de usuario es necesario",
                  minLength: {
                    value: 2,
                    message:
                      "El nombre de usuario debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message:
                      "El nombre de usuario no puede tener más de 50 caracteres",
                  }, */
                  }
                }
              />

              {/* CORREO */}
              <DinamicInputText<UserFormValues>
                name="email"
                label="Correo"
                placeholder="example@something.com"
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
              <DinamicInputText<UserFormValues>
                name="password"
                label="Contraseña"
                type="password"
                placeholder="********"
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

              {/* PASSWORD_CONFIRM */}
              <DinamicInputText<UserFormValues>
                name="password_confirm"
                label="Confirmar contraseña"
                type="password"
                placeholder="********"
                rules={
                  {
                    /*   minLength: {
                    value: 2,
                    message: "La contraseña confirmada debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "La contraseña confirmada no puede tener más de 50 caracteres",
                  }, */
                  }
                }
              />
            </motion.div>
          )
        }
        rightContent={
          <>
            {/* ICONO */}
            <div className="h-full lg:flex items-center justify-center hidden">
              <div className="w-3/5">
                <InsertUpdateUserIcon />
              </div>
            </div>

            {/* BOTÓN GUARDAR */}
            <div className="w-full sticky bottom-0 py-4 bg-white">
              <DinamicBouncingButton
                action={
                  saving || loading ? () => {} : methods.handleSubmit(onSubmit)
                }
                disabled={saving || loading ? true : false}
                spin={saving || loading ? true : false}
                text="Guardar"
                Icon={Save}
              />
            </div>
          </>
        }
      />
    </FormProvider>
  );
}
