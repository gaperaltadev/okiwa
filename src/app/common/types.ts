export interface ListResponse<T> {
  items: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface ListParams {
  page: number;
  limit: number;
  queryFilter: {
    filters?: QueryFilter[];
    sort?: Record<string, 1 | -1>;
  };
}

export type QueryFilter = {
  operator: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "in" | "nin" | "regex";
  field: string;
  value: string | number | boolean | object;
};
