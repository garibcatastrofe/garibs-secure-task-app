"use client";

/* COMPONENTS */
import { BouncingButton } from "@/components/shared/bouncingButton/BouncingButton";
import { DinamicTd } from "@/components/shared/dinamicTable/dinamicRow/DinamicTd";
import { DeleteUserContent } from "../../deleteUser/DeleteUserContent";

/* ICONS */
import { SquarePen, Trash2 } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* STORES */
import { useModal } from "@/stores/modal/modalStore";

/* TYPES */
import { IUserPrimitive } from "@/src/Users/Domain/Interfaces/IUserPrimitive";

export function UserRowContent({
  user,
  twBgColor,
}: {
  user: IUserPrimitive;
  twBgColor: string;
}) {
  const router = useRouter();
  const { setModal } = useModal();

  return (
    <>
      <DinamicTd twClassName="text-nowrap">
        <p className="">{user.id}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p className="">{user.user_name}</p>
      </DinamicTd>
      <DinamicTd twClassName="text-nowrap">
        <p>{user.email}</p>
      </DinamicTd>

      <td
        className={`py-6 whitespace-nowrap group-hover:bg-green-100 transition-all duration-200 px-3 lg:sticky lg:right-0 z-10 ${twBgColor}`}
      >
        <div className="flex gap-2">
          <BouncingButton
            action={() => router.push(`/users/update/${user.id}`)}
            backgroundColorHover="#ffffff"
            backgroundColor="#fbbf24"
            textColor="#ffffff"
            textColorHover="#fbbf24"
            border="2px solid #ffffff"
            borderHover="2px solid #fbbf24"
            twClassName="p-2 rounded-lg w-fit h-fit"
            disabled={false}
          >
            <SquarePen className="size-5" />
          </BouncingButton>
          <BouncingButton
            action={() =>
              setModal({
                isActivated: true,
                title: "Eliminar usuario",
                body: (
                  <DeleteUserContent
                    user_id={user.id ?? 0}
                    user_name={user.user_name}
                  />
                ),
              })
            }
            backgroundColorHover="#ffffff"
            backgroundColor="#ef4444"
            textColor="#ffffff"
            textColorHover="#ef4444"
            border="2px solid #ffffff"
            borderHover="2px solid #ef4444"
            twClassName="p-2 rounded-lg w-fit h-fit"
            disabled={false}
          >
            <Trash2 className="size-5" />
          </BouncingButton>
        </div>
      </td>
    </>
  );
}
