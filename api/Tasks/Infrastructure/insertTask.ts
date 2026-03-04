"use server";

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
      message: "Reporte insertado correctamente",
    };
  } catch {
    return {
      ok: false,
      message: "Ocurrió un error al ingresar el reporte",
    };
  }
}
