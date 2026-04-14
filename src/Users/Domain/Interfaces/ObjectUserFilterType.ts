import {
  FilterNumberObject,
  FilterStringObject,
} from "@/src/Shared/Domain/Interfaces/IQueryGeneral";

export type ObjectUserFilterType = {
  filterById?: FilterNumberObject;
  filterByUserName?: FilterStringObject;
  filterByEmail?: FilterStringObject;
  filterByIsAdmin?: FilterStringObject;
};
