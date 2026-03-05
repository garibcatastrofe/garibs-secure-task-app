"use server";

import { IQuery } from "@/src/Shared/Domain/Interfaces/IQuery";
import { ISelectUsersResponse } from "../Domain/Interfaces/ISelectUsersResponse";
import { IUserPrimitive } from "../Domain/Interfaces/IUserPrimitive";

export async function signUp(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const user_name = formData.get("user_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirm = formData.get("password_confirm");

    console.log({
      user_name,
      email,
      password,
      password_confirm,
    });

    return {
      ok: true,
      message: "Sesión iniciada correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al iniciar sesión",
    };
  }
}

export async function signIn(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({
      email,
      password,
    });

    return {
      ok: true,
      message: "Sesión iniciada correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al iniciar sesión",
    };
  }
}

export async function insertUser(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const user_name = formData.get("user_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirm = formData.get("password_confirm");

    console.log({
      user_name,
      email,
      password,
      password_confirm,
    });

    return {
      ok: true,
      message: "Usuario guardado correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al guardar el usuario",
    };
  }
}

export async function updateUser(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const id = formData.get("id");
    const user_name = formData.get("user_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirm = formData.get("password_confirm");

    console.log({
      id,
      user_name,
      email,
      password,
      password_confirm,
    });

    return {
      ok: true,
      message: "Usuario actualizado correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al actualizar la tarea",
    };
  }
}

export async function selectUsers(
  query: IQuery<IUserPrimitive>,
): Promise<ISelectUsersResponse> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log(query);

  try {
    return {
      ok: true,
      message: "Usuarios encontradas correctamente",
      data: [
        {
          id: 1,
          email: "pirita@gmail.com",
          user_name: "Pirita Dreemurr",
        },
        {
          id: 2,
          email: "cornalina@gmail.com",
          user_name: "Cornalina Dreemurr",
        },
        {
          id: 3,
          email: "nau@gmail.com",
          user_name: "Nau Dreemurr",
        },
        {
          id: 4,
          email: "gravity@gmail.com",
          user_name: "Gravity Dreemurr",
        },
      ],
      count: 4,
    };
  } catch {
    return {
      ok: false,
      message:
        "Ocurrió un error al buscar los usuarios, intente nuevamente más tarde",
      data: [],
      count: 0,
    };
  }
}

export async function deleteUser(formData: FormData): Promise<{
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
      message: "Usuario eliminado correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al eliminar el usuario",
    };
  }
}

export async function selectUserById(
  id: number,
): Promise<{ ok: boolean; message: string; user: IUserPrimitive }> {
  // Simular delay del backend
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    console.log({
      id,
    });

    return {
      ok: true,
      message: "Usuario encontrado correctamente",
      user: {
        id: 1,
        user_name: "Pirita Dreemurr",
        email: "pirita@gmail.com",
      },
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un al encontrar el usuario",
      user: {
        id: 0,
        user_name: "",
        email: "",
      },
    };
  }
}
