"use client";

import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { CircleCheckBig, CircleOff, Loader, Trash2 } from "lucide-react";
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { deleteTask } from "@/api/Tasks/Infrastructure/taskController";
import { useModal } from "@/stores/modal/modalStore";

export function DeleteTaskContent({
  title,
  task_id,
}: {
  title: string;
  task_id: number;
}) {
  const [deleting, setDeleting] = useState(false);
  const { setAnnouncement } = useAnnouncement();
  const { modalBody, modalTitle, setModal } = useModal();

  const methods = useForm<{ id: number }>({
    defaultValues: {
      id: task_id,
    },
  });

  const onSubmit = async ({ id }: { id: number }) => {
    try {
      setDeleting(true);

      const formData = new FormData();

      formData.append("id", id.toString());

      const response = await deleteTask(formData);

      if (response.ok) {
        setAnnouncement(
          true,
          "bg-green-500",
          <div className="flex gap-2 items-center">
            <CircleCheckBig className="size-4 text-white" />
            <p className="text-white">{response.message}</p>
          </div>,
        );
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

      setDeleting(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <p>
          Al dar clic en{" "}
          <span className="text-red-500 font-semibold">Eliminar</span>, la
          tarea:
        </p>
        <p className="w-full truncate font-semibold">{title}</p>
        <p>Será eliminada para siempre (¡Mucho tiempo!)</p>
      </div>
      <div className="">
        {/* BOTÓN GUARDAR */}
        <div className="w-full sticky bottom-0 pt-4">
          <FormProvider {...methods}>
            <div className="flex gap-4">
              <BouncingButton
                action={
                  deleting
                    ? () => {}
                    : () => {
                        setModal(false, modalTitle ?? "", modalBody);
                      }
                }
                backgroundColorHover="#22c55e"
                backgroundColor="#ffffff"
                textColor="#22c55e"
                textColorHover="#ffffff"
                border="2px solid #22c55e"
                borderHover="2px solid #22c55e"
                twClassName="w-full h-fit px-4 py-2 rounded-2xl"
                disabled={deleting ? true : false}
              >
                <span>Cancelar</span>
              </BouncingButton>
              <BouncingButton
                action={deleting ? () => {} : methods.handleSubmit(onSubmit)}
                backgroundColorHover="#ef4444"
                backgroundColor="#ef4444"
                textColor="#ffffff"
                textColorHover="#ffffff"
                border="2px solid #ef4444"
                borderHover="2px solid #ef4444"
                twClassName="w-full h-fit px-4 py-2 rounded-2xl"
                disabled={deleting ? true : false}
              >
                {deleting ? (
                  <>
                    <span className="text-transparent">E</span>
                    <Loader className="size-4 animate-spin" />
                    <span className="text-transparent">E</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    <span>Eliminar</span>
                  </>
                )}
              </BouncingButton>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
