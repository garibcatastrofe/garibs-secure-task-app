"use client";

/* COMPONENTS */
import { SectionContainer } from "@/components/shared/sectionContainer/SectionContainer";
import { DinamicTable } from "@/components/shared/dinamicTable/DinamicTable";
import { DinamicTh } from "@/components/shared/dinamicTable/dinamicRow/DinamicTh";
import { DinamicRow } from "@/components/shared/dinamicTable/dinamicRow/DinamicRow";
import { TaskRowContent } from "@/content/tasks/management/selectTasks/rowContent/TaskRowContent";

/* DATA */
import { tasksColumns } from "@/content/tasks/data/columns/tasksColumns";

/* HOOKS */
import { useState, useEffect } from "react";

/* ICONS */
import { House } from "lucide-react";

/* NAVIGATION */
import { useRouter } from "next/navigation";

/* TYPES */
import { ISelectTasksData } from "@/src/Tasks/Domain/Interfaces/ISelectTasksData";

/* SERVER ACTION */
import { selectTasks } from "@/src/Tasks/Infrastructure/taskController";

/* STORES */
import { useAnnouncement } from "@/stores/announcement/announcementStore";

export function SelectTasksContent() {
  const router = useRouter();
  const { setAnnouncement } = useAnnouncement();

  const [tasks, setTasks] = useState<ISelectTasksData>({ data: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const type = "tarea";

  const getTwBgColor = ({ index }: { index: number }) => {
    return index % 2 ? "bg-neutral-100" : "bg-white";
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await selectTasks({
        page: 0,
        perPage: 10,
        order: "asc",
        orderBy: "id",
        filters: [],
      });

      if (response.ok) {
        setTasks(response);
      } else {
        setAnnouncement(true, false, response.message);
      }

      setLoading(false);
    };

    fetchTasks();
  }, []);

  return (
    <SectionContainer>
      <DinamicTable
        theadColumns={tasksColumns.map((column, index) => (
          <DinamicTh key={index} column={column} />
        ))}
        tbodyRows={tasks.data.map((task, index) => (
          <DinamicRow key={index} twBgColor={getTwBgColor({ index: index })}>
            <TaskRowContent
              task={task}
              twBgColor={`${getTwBgColor({ index: index })}`}
            />
          </DinamicRow>
        ))}
        loading={loading}
        count={tasks.count}
        type={type}
        backAction={() => router.push("/home")}
        filterAction={() => {}}
        addAction={() => router.push(`/tasks/add`)}
        excelAction={() => {}}
        backContent={<House className="size-5" />}
      />
    </SectionContainer>
  );
}
