import { InsertUpdateTaskContent } from "@/content/tasks/management/insertUpdateTask/InsertUpdateTaskContent";
import BlockBack from "@/components/shared/blockBack/BlockBack";

export default async function TaskUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <BlockBack />
      <InsertUpdateTaskContent isUpdate id={id} />
    </>
  );
}
