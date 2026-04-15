import { PORT } from "../../Shared/Domain/Consts/Port";

import { IQueryGeneral } from "@/src/Shared/Domain/Interfaces/IQueryGeneral";
import { ITaskPrimitive } from "../Domain/Interfaces/ITaskPrimitive";
import { ISelectTasksResponse } from "../Domain/Interfaces/ISelectTasksResponse";
import { ObjectTaskFilterType } from "../Domain/Interfaces/ObjectTaskFilterType";

import { formatDate } from "@/utils/formatDate";

export async function insertTask(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const title = formData.get("title");
    const description = formData.get("description");
    const state = formData.get("state");
    const user_id = formData.get("user_id");
    const creation_date = formatDate(new Date());

    const request = await fetch(`${PORT}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        state,
        user_id,
        creation_date,
      }),
    });

    const response = await request.json();

    if (response.ok) {
      return {
        ok: true,
        message: response.message,
      };
    } else {
      return {
        ok: false,
        message: response.message,
      };
    }
  } catch (error) {
    console.log("Error: ", error);
    return {
      ok: false,
      message: "Ocurrió un error al guardar la tarea",
    };
  }
}

export async function deleteTask(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const id = formData.get("id");

    const request = await fetch(`${PORT}/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await request.json();

    if (response.ok) {
      return {
        ok: true,
        message: response.message,
      };
    } else {
      return {
        ok: false,
        message: response.message,
      };
    }
  } catch (error) {
    console.log("Error: ", error);
    return {
      ok: false,
      message: "Ocurrió un error al eliminar la tarea",
    };
  }
}

export async function selectTasks(
  query: IQueryGeneral<ITaskPrimitive, ObjectTaskFilterType>,
): Promise<ISelectTasksResponse> {
  try {
    const request = await fetch(`${PORT}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const response: ISelectTasksResponse = await request.json();

    return response;
  } catch (error) {
    console.log("Error: ", error);
    return {
      ok: false,
      message:
        "Ocurrió un error al buscar las tareas, intente nuevamente más tarde",
      tasks: {
        data: [],
        count: 0,
      },
    };
  }
}

export async function selectTaskById(
  id: number,
): Promise<{ ok: boolean; message: string; task: ITaskPrimitive }> {
  try {
    const request = await fetch(`${PORT}/task/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response: { ok: boolean; message: string; task: ITaskPrimitive } =
      await request.json();

    return response;
  } catch (error) {
    console.log("Error: ", error);
    return {
      message: "Ocurrió un al encontrar la tarea",
      ok: false,
      task: {
        id: 0,
        title: "",
        description: "",
        creation_date: "",
        expiration_date: "",
        state: "",
        user_id: 0,
      },
    };
  }
}

export async function updateTask(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const state = formData.get("state");
    const user_id = formData.get("user_id");

    const request = await fetch(`${PORT}/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        description,
        state,
        user_id,
      }),
    });

    const response = await request.json();

    if (response.ok) {
      return {
        ok: true,
        message: response.message,
      };
    } else {
      return {
        ok: false,
        message: response.message,
      };
    }
  } catch (error) {
    console.log("Error: ", error);
    return {
      ok: false,
      message: "Ocurrió un error al actualizar la tarea",
    };
  }
}
