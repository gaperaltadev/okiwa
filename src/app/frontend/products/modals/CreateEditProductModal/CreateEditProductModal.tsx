"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { CreateEditProductForm } from "../../forms/CreateEditProductForm";
import { ProductEntity } from "../../../../backend/products/domain/Product.entity";
import SuccessMessage from "@/app/frontend/shared/components/SuccessMessage/SuccessMessage";

type CreateEditProductModalProps = {
  handleSuccess: () => void;
  onClose: () => void;
  product?: ProductEntity;
  isOpen: boolean;
};

const CreateEditProductModal: FC<CreateEditProductModalProps> = (props) => {
  const { handleSuccess, onClose, isOpen, product } = props;

  const [formSuccess, setFormSuccess] = useState<{ product: ProductEntity }>();

  useEffect(() => {
    setFormSuccess(undefined);
  }, [isOpen]);

  const onSuccess = useCallback(
    (product: ProductEntity) => {
      setFormSuccess({ product });
      handleSuccess();
    },
    [handleSuccess]
  );

  const successMessage = useCallback(
    () => (
      <SuccessMessage
        label={
          product?.id
            ? "Producto editado correctamente"
            : "Producto creado correctamente"
        }
        onClose={onClose}
      />
    ),
    [onClose, product?.id]
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex justify-center items-center"
    >
      <div className="bg-white size-3/4 p-6 rounded-2xl">
        {formSuccess?.product ? (
          successMessage()
        ) : (
          <CreateEditProductForm
            onClose={onClose}
            handleSuccess={onSuccess}
            product={product}
          />
        )}
      </div>
    </Modal>
  );
};

export default CreateEditProductModal;
