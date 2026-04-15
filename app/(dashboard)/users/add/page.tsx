import { InsertUpdateUserContent } from "@/content/users/management/insertUpdateUser/InsertUpdateUserContent";
import BlockBack from "@/components/shared/blockBack/BlockBack";

export default function UserInsertPage() {
  return (
    <>
      <BlockBack />
      <InsertUpdateUserContent isUpdate={false} id="" />
    </>
  );
}
