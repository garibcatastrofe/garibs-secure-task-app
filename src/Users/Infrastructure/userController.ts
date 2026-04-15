import { PORT } from "../../Shared/Domain/Consts/Port";

import { IQueryGeneral } from "@/src/Shared/Domain/Interfaces/IQueryGeneral";
import { IUserPrimitive } from "../Domain/Interfaces/IUserPrimitive";
import { ISelectUsersResponse } from "../Domain/Interfaces/ISelectUsersResponse";
import { ObjectUserFilterType } from "../Domain/Interfaces/ObjectUserFilterType";

export async function insertUser(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const user_name = formData.get("user_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirm = formData.get("password_confirm");
    const is_admin = formData.get("is_admin");

    const request = await fetch(`${PORT}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name,
        email,
        password,
        password_confirm,
        is_admin,
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
      message: "Ocurrió un error al guardar el usuario",
    };
  }
}

export async function deleteUser(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const id = formData.get("id");

    const request = await fetch(`${PORT}/user/${id}`, {
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
      message: "Ocurrió un error al eliminar el usuario",
    };
  }
}

export async function selectUsers(
  query: IQueryGeneral<IUserPrimitive, ObjectUserFilterType>,
): Promise<ISelectUsersResponse> {
  try {
    const request = await fetch(`${PORT}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    const response: ISelectUsersResponse = await request.json();

    return response;
  } catch (error) {
    console.log("Error: ", error);
    return {
      ok: false,
      message:
        "Ocurrió un error al buscar los usuarios, intente nuevamente más tarde",
      users: {
        data: [],
        count: 0,
      },
    };
  }
}

export async function selectUserById(
  id: number,
): Promise<{ ok: boolean; message: string; user: IUserPrimitive }> {
  try {
    const request = await fetch(`${PORT}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response: { ok: boolean; message: string; user: IUserPrimitive } =
      await request.json();

    return response;
  } catch (error) {
    console.log("Error: ", error);
    return {
      message: "Ocurrió un error al encontrar el usuario",
      ok: false,
      user: { id: 0, user_name: "", email: "", is_admin: "" },
    };
  }
}

export async function updateUser(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const id = formData.get("id");
    const user_name = formData.get("user_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirm = formData.get("password_confirm");

    const request = await fetch(`${PORT}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        user_name,
        email,
        password,
        password_confirm,
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
      message: "Ocurrió un error al actualizar el usuario",
    };
  }
}

export async function signUp(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const user_name = formData.get("user_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const password_confirm = formData.get("password_confirm");

    const request = await fetch(PORT + "/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, user_name, password_confirm }),
      credentials: "include",
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
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const request = await fetch(PORT + "/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
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
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al iniciar sesión",
    };
  }
}

export async function verify(): Promise<{
  ok: boolean;
  message: string;
  id: number | null;
}> {
  try {
    const request = await fetch(PORT + "/verify", {
      method: "GET",
      credentials: "include",
    });

    const response = await request.json();

    if (response.ok) {
      return {
        ok: true,
        message: response.message,
        id: response.token.id,
      };
    } else {
      return {
        ok: false,
        message: response.message,
        id: null,
      };
    }
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al iniciar sesión",
      id: null,
    };
  }
}

export async function signOut(): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const request = await fetch(PORT + "/signOut", {
      method: "POST",
      credentials: "include",
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
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al iniciar sesión",
    };
  }
}
