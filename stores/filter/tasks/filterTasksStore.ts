import { ITaskPrimitive } from "@/src/Tasks/Domain/Interfaces/ITaskPrimitive";
import { ObjectTaskFilterType } from "@/src/Tasks/Domain/Interfaces/ObjectTaskFilterType";
import { create } from "zustand";

interface Filter {
  perPage: number;
  page: number;
  order: "asc" | "desc";
  orderBy: keyof ITaskPrimitive;
  filtersObject?: ObjectTaskFilterType;
}

interface FilterStore {
  filter: Filter | null;
  setFilter: (data: Filter) => void;
}

export const useTasksFilter = create<FilterStore>((set) => ({
  filter: {
    perPage: 10,
    page: 0,
    order: "asc",
    orderBy: "id",
    filtersObject: {},
  },
  setFilter: (data: Filter) => set({ filter: data }),
}));
