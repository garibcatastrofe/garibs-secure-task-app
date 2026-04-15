import {
  FilterDateIntervalObject,
  FilterNumberObject,
  FilterStringObject,
} from "@/src/Shared/Domain/Interfaces/IQueryGeneral";

export type ObjectTaskFilterType = {
  filterById?: FilterNumberObject;
  filterByTitle?: FilterStringObject;
  filterByDescription?: FilterStringObject;
  filterByState?: FilterStringObject;
  filterByUserId?: FilterNumberObject;
  filterByCreationDate?: FilterStringObject;
  filterByExpirationDate?: FilterStringObject;
  filterByCreationDateInterval?: FilterDateIntervalObject;
  filterByExpirationDateInterval?: FilterDateIntervalObject;
};
