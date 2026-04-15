import { IUserPrimitive } from "@/src/Users/Domain/Interfaces/IUserPrimitive";
import { ObjectUserFilterType } from "@/src/Users/Domain/Interfaces/ObjectUserFilterType";
import { create } from "zustand";

interface Filter {
  perPage: number;
  page: number;
  order: "asc" | "desc";
  orderBy: keyof IUserPrimitive;
  filtersObject?: ObjectUserFilterType;
}

interface FilterStore {
  filter: Filter | null;
  setFilter: (data: Filter) => void;
}

export const useUsersFilter = create<FilterStore>((set) => ({
  filter: {
    perPage: 10,
    page: 0,
    order: "asc",
    orderBy: "id",
    filtersObject: {},
  },
  setFilter: (data: Filter) => set({ filter: data }),
}));
