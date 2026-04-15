"use client";

/* API CALLS */
import { selectTasks } from "@/src/Tasks/Infrastructure/TaskRepository";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { DinamicTh } from "@/components/shared/dinamicTable/dinamicRow/DinamicTh";
import { DinamicRow } from "@/components/shared/dinamicTable/dinamicRow/DinamicRow";
import { TaskRowContent } from "@/content/tasks/management/selectTasks/rowContent/TaskRowContent";

/* DATA */
import { tasksColumns } from "@/content/tasks/data/columns/tasksColumns";

/* HOOKS */
import { useState, useEffect, useCallback } from "react";

/* ICONS */
import { House } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* TYPES */
import { ISelectTasksData } from "@/src/Tasks/Domain/Interfaces/ISelectTasksData";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";
import { useTasksFilter } from "@/stores/filter/tasks/filterTasksStore";

/* UTILS */
import { getTwBgColorTable } from "@/utils/getTwBgColorTable";
import { userInfo } from "@/temp/userInfo";

export function SelectTasksContent() {
  const router = useRouter();

  const { setAnnouncement } = useAnnouncement();
  const { filter, setFilter } = useTasksFilter();

  const [tasks, setTasks] = useState<ISelectTasksData>({ data: [], count: 0 });
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
    filter && (filter.page + 1) * filter.perPage < tasks.count;

  const fetchTasks = useCallback(async () => {
    if (!filter) return;

    console.log(filter);

    try {
      setLoading(true);

      const response = await selectTasks({
        page: filter.page,
        perPage: filter.perPage,
        order: filter.order,
        orderBy: filter.orderBy,
        filtersObject: filter.filtersObject,
      });

      if (response.ok) {
        setTasks({
          data: response.tasks.data,
          count: response.tasks.count,
        });
      } else {
        setAnnouncement({
          isActivated: true,
          isOk: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("Hubo un error al obtener las tareas:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, setAnnouncement]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
        theadColumns={tasksColumns.map((column, index) => {
          if (column === "ID" || column === "ID Usuario") {
            if (userInfo.is_admin === "SI") {
              return <DinamicTh key={index} column={column} />;
            }
          } else {
            return <DinamicTh key={index} column={column} />;
          }
        })}
        tbodyRows={tasks.data.map((task, index) => (
          <DinamicRow
            key={index}
            twBgColor={getTwBgColorTable({ index: index })}
          >
            <TaskRowContent
              task={task}
              twBgColor={`${getTwBgColorTable({ index: index })}`}
            />
          </DinamicRow>
        ))}
        loading={loading}
        count={tasks.count}
        type={"tarea"}
        backAction={() => router.push("/home")}
        filterAction={() => {}}
        addAction={() => router.push("/tasks/add")}
        excelButtonContent={<></>}
        backContent={<House className="size-5" />}
        goBack={filter?.page === 0 ? false : true}
        goNext={hasNextPage ?? false}
        goBackAction={prevPage}
        goNextAction={nextPage}
        pageFirstHalf={(filter?.page ?? 0) + 1}
        pageSecondHalf={
          Math.ceil(tasks.count ?? 0) / (filter?.perPage ?? 1) === 0
            ? "1"
            : Math.ceil((tasks.count ?? 0) / (filter?.perPage ?? 1))
        }
      />
    </SectionContainer>
  );
}
