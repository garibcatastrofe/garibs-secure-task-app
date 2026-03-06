"use client";

/* COMPONENTS */
import { BoxSkeleton } from "@/components/shared/boxSkeleton/BoxSkeleton";
import { DinamicInsertUpdateUI } from "@/components/shared/dinamicInsertUpdateUI/DinamicInsertUpdateUI";

import { DinamicInputNumber } from "@/components/shared/form/dinamicInput/DinamicInputNumber";
import { DinamicInputText } from "@/components/shared/form/dinamicInput/DinamicInputText";
import { DinamicInputTextArea } from "@/components/shared/form/dinamicInput/DinamicInputTextArea";
import { DinamicBouncingButton } from "@/components/shared/form/dinamicBouncingButton/DinamicBouncingButton";

/* DATA */
import { taskStates } from "@/content/tasks/data/comboboxItems/comboboxItems";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";

/* ICONS */
import { Save } from "lucide-react";
import { InsertUpdateTaskIcon } from "@/components/svg/tasks/InsertUpdateTaskIcon";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import {
  insertTask,
  updateTask,
  selectTaskById,
} from "@/src/Tasks/Infrastructure/taskController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { TaskFormValues } from "@/content/tasks/types/TaskFormValues";

/* UTILS */
import { getDate } from "@/utils/date";

/* LIBS */
import { motion } from "framer-motion";

import { getTwTextColor } from "@/utils/getTwTextColor";
import { DinamicCombobox } from "@/components/shared/form/dinamicInput/DinamicCombobox";

export function InsertUpdateTaskContent({
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

  const methods = useForm<TaskFormValues>();

  const onSubmit = async (data: TaskFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("state", data.state);
      formData.append("user_id", data.user_id.toString());

      if (isUpdate) {
        const response = await updateTask(formData);

        if (response.ok) {
          setAnnouncement(true, true, response.message);
        } else {
          setAnnouncement(true, false, response.message);
        }
      } else {
        const response = await insertTask(formData);

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
        const fetchTask = async () => {
          const response = await selectTaskById(Number(id));

          if (response.ok) {
            methods.reset({
              id: Number(id),
              title: response.task.title,
              description: response.task.description,
              state: response.task.state,
              user_id: response.task.user_id,
            });
            endLoading();
          } else {
            setAnnouncement(true, false, response.message);

            router.push("/tasks");
          }
        };

        fetchTask();
      } else {
        methods.reset({
          id: 0,
          title: "",
          description: "",
          state: "NO COMPLETADA",
          user_id: 0,
        });
        endLoading();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }, [id, isUpdate, methods, router, setAnnouncement]);

  return (
    <FormProvider {...methods}>
      <DinamicInsertUpdateUI
        backAction={() => router.push(`/tasks/`)}
        headerRightContent={
          <div className="flex gap-4">
            <p>
              Fecha: <span className="text-green-500">{getDate()}</span>
            </p>
          </div>
        }
        leftTitle="Datos de la tarea"
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
              {/* TASK_ID */}
              {isUpdate && (
                <DinamicInputNumber<TaskFormValues>
                  name="id"
                  label="ID de tarea"
                  placeholder="Ingrese el ID de tarea"
                  min={1}
                  max={99}
                  disabled
                  rules={{
                    required: "El ID de tarea es necesario",
                  }}
                />
              )}

              <div className="grid grid-cols-2 gap-4 w-full h-fit">
                {/* TITLE */}
                <DinamicInputText<TaskFormValues>
                  name="title"
                  label="Tarea"
                  placeholder="Nombre cool"
                  rules={{
                    required: "El título es necesario",
                    minLength: {
                      value: 2,
                      message: "El título debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message: "El título no puede tener más de 50 caracteres",
                    },
                  }}
                />

                {/* ESTADO */}
                <DinamicCombobox<TaskFormValues>
                  name="state"
                  label="Estado"
                  items={taskStates}
                  placeholder="Seleccionar estado"
                  rules={{
                    required: "El estado es necesario",
                  }}
                  getTextColor={getTwTextColor}
                />
              </div>

              {/* DESCRIPTION */}
              <DinamicInputTextArea<TaskFormValues>
                name="description"
                label="Descripción"
                placeholder="Necesito hacer esto... Necesito llevar esto a... Comprar dos docenas de huevos..."
                rules={{
                  required: "El título es necesario",
                  minLength: {
                    value: 2,
                    message: "La descripción debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 750,
                    message:
                      "La descripción no puede tener más de 750 caracteres",
                  },
                }}
              />
            </motion.div>
          )
        }
        rightContent={
          <>
            {/* ICONO */}
            <div className="h-full lg:flex items-center justify-center hidden">
              <div className="w-3/5">
                <InsertUpdateTaskIcon />
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
