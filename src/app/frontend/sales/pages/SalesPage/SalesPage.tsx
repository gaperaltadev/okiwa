"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  SaleEntity,
  PopulatedSaleEntity,
} from "../../../../backend/sales/domain/Sale.entity";
import {
  Card,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { StatusChip } from "../../shared/components/StatusChip";
import { CreateSaleModal } from "../../modals/CreateSaleModal";
import { DeleteSaleModal } from "../../modals/DeleteSaleModal";
import PageHeader from "@/app/frontend/shared/components/PageHeader/PageHeader";
import { SalesApi } from "../..";
import { TablePagination } from "@/app/components/TablePagination";

export type ModalState<T> = {
  isOpen: boolean;
  data?: T;
};

const SalesPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sales, setSales] = useState<PopulatedSaleEntity[]>();

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [createSaleModalState, setCreateSaleModalState] = useState<
    ModalState<SaleEntity>
  >({ isOpen: false });

  const [deleteSaleModalState, setDeleteSaleModalState] = useState<
    ModalState<PopulatedSaleEntity>
  >({ isOpen: false });

  const fetchSales = useCallback(async (page: number, limit: number) => {
    try {
      setLoading(true);
      const response = await SalesApi.postSalesList({
        limit,
        page,
        queryFilter: {
          sort: { createdAt: -1 },
        },
      });
      if (response.status === 200) {
        const listSalesResponse = response.data;

        setLimit(limit);
        setPage(listSalesResponse.currentPage);
        setSales(listSalesResponse.items || []);
        setTotalPages(listSalesResponse.totalPages);
        setTotalSales(listSalesResponse.totalCount);
      }
    } catch (err) {
      toast.error("Algo salió mal");
      console.log("list sales error ", { err });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!sales) {
      fetchSales(page, limit);
    }
  }, [fetchSales, limit, page, sales]);

  const handleCreateSaleModal = useCallback(() => {
    setCreateSaleModalState({ isOpen: !createSaleModalState.isOpen });
  }, [createSaleModalState.isOpen]);

  const handleSuccess = useCallback(() => {
    fetchSales(1, limit);
  }, [fetchSales, limit]);

  const handleOpenDeleteModal = useCallback((sale: PopulatedSaleEntity) => {
    setDeleteSaleModalState({ isOpen: true, data: sale });
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteSaleModalState({ isOpen: false });
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Ventas"
        subtitle="Gestiona tus ventas fácilmente"
        action={handleCreateSaleModal}
        actionTitle="Crear venta"
      />
      <div className="flex flex-col gap-4">
        {loading ? (
          <CircularProgress />
        ) : (
          <Card variant="outlined" className="!rounded-2xl">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales &&
                  sales?.map((sale: PopulatedSaleEntity, idx: number) => (
                    <TableRow key={idx + "_cell"}>
                      <TableCell>{sale.client.name}</TableCell>
                      <TableCell>
                        <StatusChip status={sale.status} />
                      </TableCell>
                      <TableCell>
                        {sale?.createdAt &&
                          new Date(sale?.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenDeleteModal(sale)}
                          color="error"
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        )}
        <TablePagination
          fetchData={fetchSales}
          limit={limit}
          page={page}
          totalPages={totalPages}
          totalCount={totalSales}
        />
      </div>
      <CreateSaleModal
        isOpen={createSaleModalState.isOpen}
        handleSuccess={handleSuccess}
        onClose={handleCreateSaleModal}
      />
      <DeleteSaleModal
        isOpen={deleteSaleModalState.isOpen}
        sale={deleteSaleModalState.data}
        handleSuccess={handleSuccess}
        onClose={handleCloseDeleteModal}
      />
    </div>
  );
};

export default SalesPage;
