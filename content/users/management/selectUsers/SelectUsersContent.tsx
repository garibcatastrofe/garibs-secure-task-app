"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { DinamicTh } from "@/components/shared/dinamicTable/dinamicRow/DinamicTh";
import { DinamicRow } from "@/components/shared/dinamicTable/dinamicRow/DinamicRow";
import { UserRowContent } from "@/content/users/management/selectUsers/rowContent/UserRowContent";

/* DATA */
import { usersColumns } from "@/content/users/data/columns/usersColumns";

/* HOOKS */
import { useState, useEffect } from "react";

/* ICONS */
import { House } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* TYPES */
import { ISelectUsersData } from "@/src/Users/Domain/Interfaces/ISelectUsersData";

/* SERVER ACTION */
import { selectUsers } from "@/src/Users/Infrastructure/userController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

export function SelectUsersContent() {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();

  const [users, setUsers] = useState<ISelectUsersData>({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const type = "usuario";

  const getTwBgColor = ({ index }: { index: number }) => {
    return index % 2 ? "bg-neutral-100" : "bg-white";
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await selectUsers({
        page: 0,
        perPage: 10,
        order: "asc",
        orderBy: "id",
        filters: [],
      });

      if (response.ok) {
        setUsers(response);
      } else {
        setAnnouncement(true, false, response.message);
      }

      setLoading(false);
    };

    fetchUsers();
  }, [setAnnouncement]);

  return (
    <SectionContainer>
      <DinamicTable
        theadColumns={usersColumns.map((column, index) => (
          <DinamicTh key={index} column={column} />
        ))}
        tbodyRows={users.data.map((user, index) => (
          <DinamicRow key={index} twBgColor={getTwBgColor({ index: index })}>
            <UserRowContent
              user={user}
              twBgColor={`${getTwBgColor({ index: index })}`}
            />
          </DinamicRow>
        ))}
        loading={loading}
        count={users.count}
        type={type}
        backAction={() => router.push("/home")}
        filterAction={() => {}}
        addAction={() => router.push(`/users/add`)}
        excelAction={() => {}}
        backContent={<House className="size-5" />}
      />
    </SectionContainer>
  );
}
