"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { DeleteTaskContent } from "@/content/tasks/management/deleteTask/DeleteTaskContent";

/* ICONS */
import { SquarePen, Trash2 } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* STORES */
import { useModal } from "@/stores/modal/modalStore";

/* TYPES */
import { ITaskPrimitive } from "@/src/Tasks/Domain/Interfaces/ITaskPrimitive";

/* UTILS */
import { getTwTextColor } from "@/utils/getTwTextColor";
import { userInfo } from "@/temp/userInfo";

export function TaskRowContent({
  task,
  twBgColor,
}: {
  task: ITaskPrimitive;
  twBgColor: string;
}) {
  const router = useRouter();
  const { setModal } = useModal();

  return (
    <>
      {userInfo.is_admin === "SI" && (
        <DinamicTd twClassName="text-nowrap">
          <p>{task.id}</p>
        </DinamicTd>
      )}

      <DinamicTd twClassName="">
        <p className="min-w-40">{task.title}</p>
      </DinamicTd>
      <DinamicTd twClassName="">
        <p className="min-w-40">{task.description}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{task.creation_date}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p className={`font-bold ${getTwTextColor(task.state)}`}>
          {task.state}
        </p>
      </DinamicTd>

      {userInfo.is_admin === "SI" && (
        <DinamicTd twClassName="text-nowrap">
          <p>{task.user_id}</p>
        </DinamicTd>
      )}

      <td
        className={`py-6 whitespace-nowrap group-hover:bg-green-100 transition-all duration-200 px-3 sticky right-0 z-10 ${twBgColor}`}
      >
        <div className="flex gap-2">
          <BouncingButton
            action={() => router.push(`/tasks/update/${task.id}`)}
            backgroundColorHover="#ffffff"
            backgroundColor="#fbbf24"
            textColor="#ffffff"
            textColorHover="#fbbf24"
            border="2px solid #ffffff"
            borderHover="2px solid #fbbf24"
            twClassName="p-2 rounded-lg w-fit h-fit"
            disabled={false}
          >
            <SquarePen className="size-5" />
          </BouncingButton>
          <BouncingButton
            action={() =>
              setModal({
                isActivated: true,
                title: "Eliminar tarea",
                body: (
                  <DeleteTaskContent
                    task_id={task.id ?? 0}
                    title={task.title}
                  />
                ),
              })
            }
            backgroundColorHover="#ffffff"
            backgroundColor="#ef4444"
            textColor="#ffffff"
            textColorHover="#ef4444"
            border="2px solid #ffffff"
            borderHover="2px solid #ef4444"
            twClassName="p-2 rounded-lg w-fit h-fit"
            disabled={false}
          >
            <Trash2 className="size-5" />
          </BouncingButton>
        </div>
      </td>
    </>
  );
}
