"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ProductEntity } from "../../../../backend/products/domain/Product.entity";
import SuccessMessage from "@/app/frontend/shared/components/SuccessMessage/SuccessMessage";
import { Info } from "@mui/icons-material";
import { ProductsApi } from "../..";

type DeleteProductModalProps = {
  handleSuccess: () => void;
  onClose: () => void;
  isOpen: boolean;
  product?: ProductEntity;
};

const DeleteProductModal: FC<DeleteProductModalProps> = (props) => {
  const { handleSuccess, onClose, isOpen, product } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  useEffect(() => {
    setFormSuccess(false);
  }, [isOpen]);

  const onSubmit = useCallback(async () => {
    if (!product) return;

    try {
      setLoading(true);
      const response = await ProductsApi.deleteProduct(product.id);

      if (response.status === 204) {
        setFormSuccess(true);
        handleSuccess();
      }
    } catch (err) {
      console.log("Client: DELETE Product error ", { err });
    } finally {
      setLoading(false);
    }
  }, [handleSuccess, product]);

  const successMessage = useCallback(
    () => (
      <SuccessMessage
        label="Producto eliminado correctamente"
        onClose={onClose}
      />
    ),
    [onClose]
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex justify-center items-center"
    >
      <Box className="bg-white p-6 rounded-2xl size-1/2">
        {formSuccess ? (
          successMessage()
        ) : (
          <Box className="flex flex-col h-full">
            <Box className="h-full">
              <Box className="flex items-center gap-4">
                <Info color="action" fontSize="large" />
                <Box className="flex flex-col">
                  <Typography variant="h5" fontWeight={600}>
                    {`Se eliminará el producto "${product?.name}"?`}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Esta acción no se puede deshacer.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className="flex justify-end">
              <Button loading={loading} onClick={onSubmit}>
                Confirmar
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default DeleteProductModal;
