"use client";

import { useRouter } from "next/navigation";
import { SquarePen, Trash2 } from "lucide-react";
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { ITaskMadeBy } from "@/api/Tasks/Domain/Interfaces/ITaskMadeBy";

export function TaskRowContent({
  task,
  twBgColor,
}: {
  task: ITaskMadeBy;
  twBgColor: string;
}) {
  const router = useRouter();

  return (
    <>
      <DinamicTd twClassName="">
        <p className="min-w-40">{task.task.title}</p>
      </DinamicTd>
      <DinamicTd twClassName="">
        <p className="min-w-40">{task.task.description}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{task.task.created_date}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p
          className={`font-bold ${task.task.state === "COMPLETADA" ? "text-green-500" : "text-red-500"}`}
        >
          {task.task.state}
        </p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{task.user_name}</p>
      </DinamicTd>

      <td
        className={`py-6 whitespace-nowrap group-hover:bg-green-100 transition-all duration-200 px-3 sticky right-0 z-10 ${twBgColor}`}
      >
        <div className="flex gap-2">
          <BouncingButton
            action={() => router.push(`/tasks/update/${task.task.id}`)}
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
            action={() => /* openEditDeleteModal(
                              dato.usuario.id,
                              dato,
                              "ELIMINAR",
                            ) */ {}}
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
