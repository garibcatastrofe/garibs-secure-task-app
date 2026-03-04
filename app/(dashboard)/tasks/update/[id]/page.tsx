import { InsertUpdateTaskContent } from "@/content/tasks/management/insertUpdateTask/InsertUpdateTaskContent";

export default async function TaskUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InsertUpdateTaskContent isUpdate id={id} />;
}
