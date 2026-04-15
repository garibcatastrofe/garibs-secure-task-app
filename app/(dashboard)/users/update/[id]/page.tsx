import { InsertUpdateUserContent } from "@/content/users/management/insertUpdateUser/InsertUpdateUserContent";
import BlockBack from "@/components/shared/blockBack/BlockBack";

export default async function UserUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <BlockBack />
      <InsertUpdateUserContent isUpdate id={id} />
    </>
  );
}
