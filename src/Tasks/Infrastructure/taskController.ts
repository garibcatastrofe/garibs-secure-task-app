"use server";

/* TYPES */
import { IQuery } from "@/src/Shared/Domain/Interfaces/IQuery";
import { ITaskPrimitive } from "@/src/Tasks/Domain/Interfaces/ITaskPrimitive";
import { ISelectTasksResponse } from "../Domain/Interfaces/ISelectTasksResponse";

export async function insertTask(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const state = formData.get("state");
    const user_id = formData.get("user_id");

    console.log({
      title,
      description,
      state,
      user_id,
    });

    return {
      ok: true,
      message: "Tarea guardada correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al guardar la tarea",
    };
  }
}

export async function updateTask(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const state = formData.get("state");
    const user_id = formData.get("user_id");

    console.log({
      id,
      title,
      description,
      state,
      user_id,
    });

    return {
      ok: true,
      message: "Tarea actualizada correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al actualizar la tarea",
    };
  }
}

export async function selectTasks(
  query: IQuery<ITaskPrimitive>,
): Promise<ISelectTasksResponse> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log(query);

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
        {
          task: {
            id: 3,
            title: "Tarea 3",
            description:
              "Esta tarea es super importante así que ponte las pilas!!!!",
            created_date: "2026-02-17 10:45:00",
            state: "EN PROCESO",
            user_id: 1,
          },
          user_name: "Pirita Dreemurr",
        },
        {
          task: {
            id: 4,
            title: "Tarea 4",
            description: "Creo que realmente no necesito esta tarea",
            created_date: "2026-02-17 10:45:00",
            state: "CANCELADA",
            user_id: 1,
          },
          user_name: "Pirita Dreemurr",
        },
      ],
      count: 4,
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

export async function deleteTask(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const id = formData.get("id");

    console.log({
      id,
    });

    return {
      ok: true,
      message: "Tarea eliminada correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al eliminar la tarea",
    };
  }
}
