export type FilterOperators = {
  eq?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  ne?: string;
  in?: string[];
  like?: string;
};

export type Filters = {
  [key: string]: FilterOperators | string | string[];
} & {
  $and?: Filters[];
  $or?: Filters[];
};

export interface QueryFilter {
  filters?: Filters;
  sort?: Record<string, "asc" | "desc">;
}

export interface PageFilter {
  page?: number;
  limit?: number;
}
