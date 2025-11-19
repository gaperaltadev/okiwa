"use client";

import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  SaleEntity,
  PopulatedSaleEntity,
} from "../../../../../backend/sales/domain/Sale.entity";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StatusChip } from "../../shared/components/StatusChip";
import { Add } from "@mui/icons-material";
import { CreateSaleModal } from "../../modals/CreateSaleModal";

export type ModalState<T> = {
  isOpen: boolean;
  data?: T;
};

const SalesPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sales, setSales] = useState<PopulatedSaleEntity[]>();

  const [createSaleModalState, setCreateSaleModalState] = useState<
    ModalState<SaleEntity>
  >({ isOpen: false });

  async function fetchSales() {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.BASE_PATH}api/sale`);
      if (response.ok) {
        const responseData = await response.json();
        setSales(responseData || []);
      }
    } catch (err) {
      console.log("error fetching sales", err);
      toast.error("Algo salió mal");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!sales) {
      fetchSales();
    }
  }, [sales]);

  const handleCreateSaleModal = useCallback(() => {
    setCreateSaleModalState({ isOpen: !createSaleModalState.isOpen });
  }, [createSaleModalState.isOpen]);

  const handleSuccess = useCallback(() => {
    fetchSales();
  }, []);

  return (
    <Box className="flex flex-col gap-6">
      <Toaster />
      <Box className="flex justify-between">
        <Typography variant="h5">Pedidos</Typography>
        <Button
          color="info"
          variant="contained"
          className="flex gap-2"
          onClick={handleCreateSaleModal}
        >
          <Add fontSize="small" />
          Nueva venta
        </Button>
      </Box>
      <Box className="flex flex-col gap-4">
        {loading ? (
          <CircularProgress />
        ) : (
          <Table className="bsale">
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha límite</TableCell>
                <TableCell>Fecha de creación</TableCell>
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
                      {sale.deadline &&
                        new Date(sale.deadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {sale?.createdAt &&
                        new Date(sale?.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </Box>
      <CreateSaleModal
        isOpen={createSaleModalState.isOpen}
        handleSuccess={handleSuccess}
        onClose={handleCreateSaleModal}
      />
    </Box>
  );
};

export default SalesPage;
