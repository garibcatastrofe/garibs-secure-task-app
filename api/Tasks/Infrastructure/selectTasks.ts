"use server";

/* TYPES */
import { IQuery } from "@/api/Shared/Domain/Interfaces/IQuery";
import { ITaskPrimitive } from "@/api/Tasks/Domain/Interfaces/ITaskPrimitive";
import { ISelectTasksResponse } from "../Domain/Interfaces/ISelectTasksResponse";

export async function selectTasks(
  query: IQuery<ITaskPrimitive>,
): Promise<ISelectTasksResponse> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    return {
      ok: true,
      message: "Tareas encontradas correctamente",
      data: [
        {
          task: {
            id: 1,
            title: "Tarea 1",
            description:
              "Esta es la primera tarea en la que tengo que ordenar todas las cosas de mi cuarto!!!!",
            created_date: "2026-01-01 08:30:00",
            state: "COMPLETADA",
            user_id: 1,
          },
          user_name: "Pirita Dreemurr",
        },
        {
          task: {
            id: 2,
            title: "Tarea 2",
            description:
              "Esta es la segunda tarea, necesito ir a comprar cosas al super!!!",
            created_date: "2026-02-17 10:45:00",
            state: "NO COMPLETADA",
            user_id: 1,
          },
          user_name: "Pirita Dreemurr",
        },
      ],
      count: 2,
    };
  } catch {
    return {
      ok: false,
      message:
        "Ocurrió un error al buscar las tareas, intente nuevamente más tarde",
      data: [],
      count: 0,
    };
  }
}
