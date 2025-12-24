"use client";

import { MouseEvent, useCallback, useEffect, useState } from "react";
import { ProductEntity } from "../../../../backend/products/domain/Product.entity";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { DeleteProductModal } from "../../modals/DeleteProductModal";
import { CreateEditProductModal } from "../../modals/CreateEditProductModal";
import { ProductsApi } from "../..";
import PageHeader from "@/app/frontend/shared/components/PageHeader/PageHeader";
import { TablePagination } from "@/app/components/TablePagination";

export type ModalState<T> = {
  isOpen: boolean;
  data?: T;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductEntity[] | false>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [createEditProductModalState, setCreateEditProductModalState] =
    useState<ModalState<ProductEntity>>({ isOpen: false });

  const [deleteProductModalState, setDeleteProductModalState] = useState<
    ModalState<ProductEntity>
  >({ isOpen: false });

  const fetchData = useCallback(async (page: number, limit: number) => {
    try {
      setLoading(true);

      const response = await ProductsApi.postProductsList({
        page: page,
        limit: limit,
        queryFilter: {
          sort: {
            createdAt: -1,
          },
        },
      });

      if (response.status === 200) {
        const products = response.data.items;
        setLimit(limit);
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTotalProducts(response.data.totalCount);
        setProducts(products);
      }
    } catch (err) {
      toast.error("Algo salió mal");
      console.log("Client: GET Products error ", { err });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!products) {
      fetchData(page, limit);
    }
  }, [fetchData, limit, page, products]);

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
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Productos"
        subtitle="Crea, modifica y elimina productos fácilmente"
        action={handleAddProductModal}
        startIcon={<Add />}
        actionTitle="Crear producto"
      />
      <div className="flex flex-col gap-4">
        {loading ? (
          <CircularProgress />
        ) : (
          <Card variant="outlined" className="!rounded-2xl">
            <Table>
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Stock actual</TableCell>
                  <TableCell>Stock mínimo</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products?.map((product: ProductEntity, idx: number) => (
                    <TableRow key={idx + "_cell"}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.currentStock || "-"}</TableCell>
                      <TableCell>{product.minStock || "-"}</TableCell>
                      <TableCell>
                        <Stack direction={"row"} justifyContent={"end"} gap={2}>
                          <Button
                            size="small"
                            color="inherit"
                            onClick={handleActionClick({
                              product,
                              action: "delete",
                            })}
                          >
                            <DeleteOutline />
                          </Button>
                          <Button
                            size="small"
                            color="inherit"
                            onClick={handleActionClick({
                              product,
                              action: "edit",
                            })}
                          >
                            <EditOutlined />
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        )}
        <TablePagination
          fetchData={fetchData}
          limit={limit}
          page={page}
          totalCount={totalProducts}
          totalPages={totalPages}
        />
      </div>
      <CreateEditProductModal
        isOpen={createEditProductModalState.isOpen}
        product={createEditProductModalState.data}
        onClose={handleAddProductModal}
        handleSuccess={() => fetchData(page, limit)}
      />
      <DeleteProductModal
        isOpen={deleteProductModalState.isOpen}
        onClose={handleCloseDeleteProductModal}
        product={deleteProductModalState.data}
        handleSuccess={() => fetchData(page, limit)}
      />
    </div>
  );
};

export default ProductsPage;
