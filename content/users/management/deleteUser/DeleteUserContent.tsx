"use client";

/* API CALLS */
import { deleteUser } from "@/src/Users/Infrastructure/UserController";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";

/* HOOKS */
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

/* ICONS */
import { Loader, Trash2 } from "lucide-react";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useModal } from "@/stores/modal/modalStore";
import { useUsersFilter } from "@/stores/filter/users/filterUsersStore";

export function DeleteUserContent({
  user_name,
  user_id,
}: {
  user_name: string;
  user_id: number;
}) {
  const { setAnnouncement } = useAnnouncement();
  const { modal, setModal } = useModal();
  const { filter, setFilter } = useUsersFilter();

  const [deleting, setDeleting] = useState(false);

  const methods = useForm<{ id: number }>({
    defaultValues: {
      id: user_id,
    },
  });

  const onSubmit = async () => {
    try {
      setDeleting(true);

      const formData = new FormData();

      formData.append("id", user_id.toString());

      const response = await deleteUser(formData);

      if (response.ok) {
        setFilter({
          page: 0,
          perPage: filter?.perPage ?? 10,
          order: filter?.order ?? "asc",
          orderBy: filter?.orderBy ?? "id",
          filtersObject: filter?.filtersObject,
        });
        setAnnouncement({
          isActivated: true,
          isOk: true,
          message: response.message,
        });
        setModal({
          isActivated: false,
          title: modal.title ?? "",
          body: modal.body,
        });
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
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
          <span className="text-red-500 font-semibold">Eliminar</span>, el
          usuario:
        </p>
        <p className="w-full truncate font-semibold">{user_name}</p>
        <p>{user_id}</p>
        <p>Será eliminado para siempre (¡Mucho tiempo!)</p>
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
                        setModal({
                          isActivated: false,
                          title: modal.title ?? "",
                          body: modal.body,
                        });
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
