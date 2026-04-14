"use client";

/* API CALLS */
import { selectUsers } from "@/src/Users/Infrastructure/UserController";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { DinamicTh } from "@/components/shared/dinamicTable/dinamicRow/DinamicTh";
import { DinamicRow } from "@/components/shared/dinamicTable/dinamicRow/DinamicRow";
import { UserRowContent } from "@/content/users/management/selectUsers/rowContent/UserRowContent";

/* DATA */
import { usersColumns } from "@/content/users/data/columns/usersColumns";

/* HOOKS */
import { useState, useEffect, useCallback } from "react";

/* ICONS */
import { House } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* TYPES */
import { ISelectUsersData } from "@/src/Users/Domain/Interfaces/ISelectUsersData";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

/* UTILS */
import { getTwBgColorTable } from "@/utils/getTwBgColorTable";
import { useModal } from "@/stores/modal/modalStore";
import { useUsersFilter } from "@/stores/filter/users/filterUsersStore";

export function SelectUsersContent() {
  const router = useRouter();

  const { setAnnouncement } = useAnnouncement();
  const { setModal } = useModal();
  const { filter, setFilter } = useUsersFilter();

  const [users, setUsers] = useState<ISelectUsersData>({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);

  const updateFilter = (changes: Partial<typeof filter>) => {
    if (!filter) return;

    setFilter({
      ...filter,
      ...changes,
    });
  };

  const nextPage = () => {
    if (!filter) return;

    updateFilter({
      page: filter.page + 1,
    });
  };

  const prevPage = () => {
    if (!filter) return;

    updateFilter({
      page: Math.max(filter.page - 1, 0),
    });
  };

  const hasNextPage =
    filter && (filter.page + 1) * filter.perPage < users.count;

  const fetchUsers = useCallback(async () => {
    if (!filter) return;

    console.log(filter);

    try {
      setLoading(true);

      const response = await selectUsers({
        page: filter.page,
        perPage: filter.perPage,
        order: filter.order,
        orderBy: filter.orderBy,
        filtersObject: filter.filtersObject,
      });

      if (response.ok) {
        setUsers({
          data: response.users.data,
          count: response.users.count,
        });
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("Hubo un error al obtener los usuarios:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, setAnnouncement]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    setFilter({
      page: 0,
      perPage: 10,
      order: "asc",
      orderBy: "id",
      filtersObject: {},
    });
  }, [setFilter]);

  return (
    <SectionContainer>
      <DinamicTable
        theadColumns={usersColumns.map((column, index) => (
          <DinamicTh key={index} column={column} />
        ))}
        tbodyRows={users.data.map((user, index) => (
          <DinamicRow
            key={index}
            twBgColor={getTwBgColorTable({ index: index })}
          >
            <UserRowContent
              user={user}
              twBgColor={`${getTwBgColorTable({ index: index })}`}
            />
          </DinamicRow>
        ))}
        loading={loading}
        count={users.count}
        type={"usuario"}
        backAction={() => router.push("/home")}
        filterAction={() =>
          setModal({
            isActivated: true,
            title: "Filtrar",
            body: <p>Hola :3</p>,
          })
        }
        addAction={() => router.push("/users/add")}
        excelButtonContent={<p>Hola :3</p>}
        backContent={<House className="size-5" />}
        goBack={filter?.page === 0 ? false : true}
        goNext={hasNextPage ?? false}
        goBackAction={prevPage}
        goNextAction={nextPage}
        pageFirstHalf={(filter?.page ?? 0) + 1}
        pageSecondHalf={
          Math.ceil(users.count ?? 0) / (filter?.perPage ?? 1) === 0
            ? "1"
            : Math.ceil((users.count ?? 0) / (filter?.perPage ?? 1))
        }
      />
    </SectionContainer>
  );
}
