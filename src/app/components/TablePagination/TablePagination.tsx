import { Pagination } from "@mui/material";
import { FC } from "react";

interface TablePaginationParams {
  page: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  fetchData: (page: number, limit: number) => void;
}

const TablePagination: FC<TablePaginationParams> = (props) => {
  const { page, totalPages, totalCount: totalSales, limit, fetchData } = props;

  return (
    <div className="flex flex-col gap-8 md:flex-row justify-between items-center">
      <Pagination
        page={page}
        size="large"
        boundaryCount={3}
        shape="rounded"
        variant="outlined"
        count={totalPages}
        onChange={(event, value) => fetchData(value, limit)}
      />
      <span className="font-bold">Total: {totalSales}</span>
      <div className="flex justify-end items-center gap-2">
        <span>Elementos por página:</span>
        <select
          value={limit}
          onChange={(e) => {
            fetchData(1, Number(e.target.value));
          }}
          className="border border-gray-300 rounded-md p-1"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TablePagination;
