type NumberOperators = "=" | "!=" | "<" | "<=" | ">" | ">=";
type StringOperators = "=" | "LIKE";

export type FilterNumberObject = {
  value: number;
  operator: NumberOperators;
};

export type FilterStringObject = {
  value: string;
  operator: StringOperators;
};

export type FilterDateIntervalObject = {
  date_start: string;
  date_end: string;
};

export interface IQueryGeneral<PrimitiveType, ObjectFilterType> {
  page: number;
  perPage: number;
  order: "asc" | "desc";
  orderBy: keyof PrimitiveType;
  filtersObject?: ObjectFilterType;
}
