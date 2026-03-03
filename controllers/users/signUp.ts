"use server";

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
