"use client";

import { MouseEvent, useCallback, useEffect, useState } from "react";
import { ProductEntity } from "../../../../../backend/products/domain/Product.entity";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { DeleteProductModal } from "../../modals/DeleteProductModal";
import { CreateEditProductModal } from "../../modals/CreateEditProductModal";

export type ModalState<T> = {
  isOpen: boolean;
  data?: T;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductEntity[] | false>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [createEditProductModalState, setCreateEditProductModalState] =
    useState<ModalState<ProductEntity>>({ isOpen: false });

  const [deleteProductModalState, setDeleteProductModalState] = useState<
    ModalState<ProductEntity>
  >({ isOpen: false });

  async function fetchData() {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/product");
      if (response.ok) {
        const responseData = await response.json();
        setProducts(responseData);
      }
    } catch (err) {
      toast.error("Algo salió mal");
      console.log("Client: GET Products error ", { err });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!products) {
      fetchData();
    }
  }, [products]);

  const handleAddProductModal = useCallback(() => {
    setCreateEditProductModalState({
      isOpen: !createEditProductModalState.isOpen,
    });
  }, [createEditProductModalState.isOpen]);

  const handleActionClick =
    ({
      product,
      action,
    }: {
      product: ProductEntity;
      action: "delete" | "edit";
    }) =>
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();

      if (action === "delete") {
        setDeleteProductModalState({ isOpen: true, data: product });
      }

      if (action === "edit") {
        setCreateEditProductModalState({ isOpen: true, data: product });
      }
    };

  const handleCloseDeleteProductModal = useCallback(() => {
    setDeleteProductModalState({
      isOpen: false,
    });
  }, []);

  return (
    <Box className="flex flex-col gap-6">
      <Box className="flex justify-between">
        <p className="text-2xl font-bold">Productos</p>
        <Button onClick={handleAddProductModal} variant="contained">
          <Add />
          <p>Agregar producto</p>
        </Button>
      </Box>
      <Box className="flex flex-col gap-4">
        {loading && <p className="font-bold">Cargando...</p>}
        {!products ||
          (products.length === 0 && (
            <p className="text-2xl font-thin">Aún no tienes productos</p>
          ))}
        <Table className="border">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Fechas</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products?.map((product: ProductEntity, idx: number) => (
                <TableRow key={idx + "_cell"}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Box className="flex flex-col">
                      <Typography variant="caption">
                        {product?.createdAt &&
                          `Creado: ${new Date(
                            product?.createdAt
                          ).toLocaleString()}`}
                      </Typography>
                      <Typography variant="caption">
                        {product?.updatedAt &&
                          `Actualizado: ${new Date(
                            product?.updatedAt
                          ).toLocaleString()}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Stack direction={"row"} justifyContent={"end"} gap={2}>
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleActionClick({
                          product,
                          action: "delete",
                        })}
                      >
                        <Delete />
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleActionClick({
                          product,
                          action: "edit",
                        })}
                      >
                        <Edit />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
      <CreateEditProductModal
        isOpen={createEditProductModalState.isOpen}
        product={createEditProductModalState.data}
        onClose={handleAddProductModal}
        handleSuccess={fetchData}
      />
      <DeleteProductModal
        isOpen={deleteProductModalState.isOpen}
        onClose={handleCloseDeleteProductModal}
        product={deleteProductModalState.data}
        handleSuccess={fetchData}
      />
    </Box>
  );
};

export default ProductsPage;
