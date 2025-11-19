import { ValidationError } from "../../../../../backend/domain/common/errors/Validation.error";
import { Filters } from "./types";
// import { escapeRegExp } from "lodash";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function buildQuery(filters?: Filters): Record<string, any> {
  const processFilters = (f: any): Record<string, any> => {
    const query: Record<string, any> = {};
    for (const key of Object.keys(f)) {
      const value = f[key];
      if (value === undefined || value === null) {
        continue;
      }

      if (key === "$and" || key === "$or") {
        if (Array.isArray(value)) {
          query[key] = value.map((subFilter) => processFilters(subFilter));
        }
        continue;
      }

      if (typeof value === "object" && !Array.isArray(value)) {
        const keys = Object.keys(value);
        if (keys.includes("from") || keys.includes("to")) {
          query[key] = {};
          if (value.from !== undefined) {
            query[key].$gte = value.from;
          }
          if (value.to !== undefined) {
            query[key].$lte = value.to;
          }
        } else {
          query[key] = {};
          for (const op in value) {
            const opValue = value[op];
            switch (op) {
              case "eq":
                query[key].$eq = opValue;
                break;
              case "gt":
                query[key].$gt = opValue;
                break;
              case "gte":
                query[key].$gte = opValue;
                break;
              case "lt":
                query[key].$lt = opValue;
                break;
              case "lte":
                query[key].$lte = opValue;
                break;
              case "ne":
                query[key].$ne = opValue;
                break;
              case "in":
                query[key].$in = Array.isArray(opValue) ? opValue : [opValue];
                break;
              case "like":
                // const regexValue = customEscapeRegExp(opValue);
                query[key].$regex = value;
                query[key].$options = "i";
                break;
              default:
                throw new ValidationError(`Invalid filter operator: ${op}`);
            }
          }
        }
      } else if (Array.isArray(value)) {
        query[key] = { $in: value };
      } else {
        query[key] = value;
      }
    }
    return query;
  };
  return filters ? processFilters(filters) : {};
}

export function buildSort(
  sort?: Record<string, "asc" | "desc">
): Record<string, 1 | -1> {
  const sortObj: Record<string, 1 | -1> = {};
  if (!sort) {
    return sortObj;
  }
  for (const key of Object.keys(sort)) {
    sortObj[key] = sort[key] === "desc" ? -1 : 1;
  }
  return sortObj;
}

// export const customEscapeRegExp = (string: string): string => {
//   const escapedString = escapeRegExp(string);
//   return escapedString
//     .replace(/[aáàä]/g, "[aáàä]")
//     .replace(/[eéèë]/g, "[eéèë]")
//     .replace(/[iíìï]/g, "[iíìï]")
//     .replace(/[oóòö]/g, "[oóòö]")
//     .replace(/[uúùü]/g, "[uúùü]")
//     .replace(/[nñ]/g, "[nñ]");
// };
