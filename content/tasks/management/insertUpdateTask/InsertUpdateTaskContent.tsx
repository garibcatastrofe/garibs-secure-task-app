"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";

/* DATA */
import { taskCompleted } from "@/content/tasks/data/comboboxItems/comboboxItems";

/* HOOKS */
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import {
  ArrowLeft,
  ChevronDown,
  CircleCheckBig,
  CircleOff,
  Loader,
  Save,
} from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* SERVER ACTION */
import { insertTask } from "@/api/Tasks/Infrastructure/insertTask";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* TYPES */
import { TaskFormValues } from "@/content/tasks/types/TaskFormValues";

/* UTILS */
import { getDate } from "@/utils/date";

/* LIBS */
import { motion } from "framer-motion";

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

  const methods = useForm<TaskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      state: "",
      user_id: 0,
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("state", data.state);
      formData.append("user_id", data.user_id.toString());

      const response = await insertTask(formData);

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

        //methods.reset();
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
    <motion.div
      className="w-full h-full p-6 max-h-full flex flex-col gap-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* HEADER */}
      <div className="w-full flex items-center justify-between h-fit">
        {/* BOTÓN IR HACIA ATRÁS */}
        <BouncingButton
          action={() => router.push(`/tasks/`)}
          backgroundColorHover="#ffffff"
          backgroundColor="#22c55e"
          textColor="#ffffff"
          textColorHover="#22c55e"
          border="2px solid #ffffff"
          borderHover="2px solid #22c55e"
          twClassName="w-fit h-fit p-4 rounded-2xl"
          disabled={false}
        >
          <ArrowLeft className="size-5" />
        </BouncingButton>

        <div className="flex gap-4">
          <p>
            Fecha: <span className="text-green-500">{getDate()}</span>
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto flex gap-6 max-h-full">
        <FormProvider {...methods}>
          {/* TAREA */}
          <div className="w-2/3 rounded-2xl border border-neutral-200 flex flex-col min-h-0">
            {/* HEADER */}
            <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
              <p className="font-light text-lg">Tarea</p>
            </div>

            {/* BODY */}
            <div className="overflow-y-auto flex-1 min-h-0 p-4">
              {/* TITLE */}
              <div className="flex flex-col gap-2">
                <p>Título</p>
                <Controller
                  name="title"
                  control={methods.control}
                  /* rules={{
                    required: "El título es necesario",
                  }} */
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      type="text"
                      id="title"
                      minLength={2}
                      maxLength={50}
                      placeholder="Tarea para..."
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-green-100 transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.title && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.title?.message}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="flex flex-col gap-2 my-4">
                <p>Descripción</p>
                <Controller
                  name="description"
                  control={methods.control}
                  /* rules={{
                    required: "La descripción es necesaria",
                  }} */
                  render={({ field: { onChange, onBlur, value } }) => (
                    <textarea
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      id="description"
                      minLength={30}
                      maxLength={750}
                      placeholder="Necesito hacer esto... Necesito llevar esto a... Comprar dos docenas de huevos..."
                      className="w-full text-sm resize-none h-40 px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-green-100 transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.description && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.description?.message}
                  </p>
                )}
              </div>

              {/* ESTADO */}
              <div className="flex flex-col gap-2 mb-4">
                <p>Estado</p>
                <Controller
                  control={methods.control}
                  name="state"
                  /* rules={{
                    required: "La estado es necesario",
                  }} */
                  render={({ field }) => (
                    <Combobox
                      items={taskCompleted}
                      value={field.value}
                      onValueChange={(value) =>
                        field.onChange(taskCompleted.find((l) => l === value))
                      }
                    >
                      <ComboboxTrigger
                        render={
                          <Button className="w-full hover:hover:bg-green-100 cursor-pointer justify-center font-normal flex items-center bg-white text-black border border-neutral-200 rounded-xl">
                            <div className="w-full flex justify-start overflow-x-hidden">
                              <p className="truncate">
                                <ComboboxValue />
                              </p>

                              {field.value === "" && (
                                <p className="truncate text-neutral-500">
                                  Seleccione un estado
                                </p>
                              )}
                            </div>

                            <ChevronDown className="size-4" />
                          </Button>
                        }
                      />
                      <ComboboxContent>
                        <ComboboxEmpty>No items found.</ComboboxEmpty>
                        <ComboboxList className={"h-30"}>
                          {(item) => (
                            <ComboboxItem
                              className={"overflow-x-hidden w-full"}
                              key={item}
                              value={item}
                            >
                              <div className="w-full">
                                <p className="truncate">{item}</p>
                              </div>
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  )}
                />
                {methods.formState.errors.state && (
                  <p className="text-red-500">
                    {methods.formState.errors.state.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* PREGUNTAS DE INFORMACIÓN */}
          <div className="w-1/3 min-w-1/3 flex flex-col justify-between rounded-2xl border border-neutral-200">
            {/* HEADER */}
            <div className="w-full h-fit p-4 shrink-0 border-b border-b-neutral-200">
              <p className="font-light text-lg">Guardar</p>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4 px-4 pt-4 relative">
              {/* USER_ID */}
              <div className="flex flex-col gap-2 h-full">
                <p>ID de usuario</p>
                <Controller
                  name="user_id"
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
                      id="user_id"
                      placeholder="1"
                      min={1}
                      max={99}
                      className="w-full text-sm h-fit px-4 py-2 bg-transparent outline-none border border-neutral-200 rounded-xl hover:hover:bg-green-100 transition-all duration-300 placeholder:text-neutral-500"
                    />
                  )}
                />
                {methods.formState.errors.user_id && (
                  <p className="text-red-500 text-sm">
                    {methods.formState.errors.user_id.message}
                  </p>
                )}
              </div>

              {/* BOTÓN GUARDAR */}
              <div className="w-full sticky bottom-0 py-4 bg-white">
                <BouncingButton
                  action={saving ? () => {} : methods.handleSubmit(onSubmit)}
                  backgroundColorHover="#ffffff"
                  backgroundColor="#22c55e"
                  textColor="#ffffff"
                  textColorHover="#22c55e"
                  border="2px solid #ffffff"
                  borderHover="2px solid #22c55e"
                  twClassName="w-full h-fit px-4 py-2 rounded-2xl"
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
                      <Save className="size-4" />
                      <span>Guardar</span>
                    </>
                  )}
                </BouncingButton>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </motion.div>
  );
}
