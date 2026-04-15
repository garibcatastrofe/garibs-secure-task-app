import { InsertUpdateTaskContent } from "@/content/tasks/management/insertUpdateTask/InsertUpdateTaskContent";
import BlockBack from "@/components/shared/blockBack/BlockBack";

export default function TaskInsertPage() {
  return (
    <>
      <BlockBack />
      <InsertUpdateTaskContent isUpdate={false} id="" />
    </>
  );
}
