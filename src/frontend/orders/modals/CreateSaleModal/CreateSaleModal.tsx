import CreateSaleForm from "../../forms/CreateSaleForm/CreateSaleForm";
import { SaleEntity } from "../../../../../backend/sales/domain/Sale.entity";
import { useCallback, useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

const CreateSaleModal = ({
  isOpen,
  handleSuccess,
  onClose,
}: {
  isOpen: boolean;
  handleSuccess: () => void;
  onClose: () => void;
}) => {
  const [formSuccess, setFormSuccess] = useState<{ sale: SaleEntity }>();

  useEffect(() => {
    setFormSuccess(undefined);
  }, [isOpen]);

  const handleCreateSaleSuccess = (data: SaleEntity) => {
    handleSuccess();
    setFormSuccess({ sale: data });
  };

  const successMessage = useCallback(() => {
    return (
      <Box className="flex flex-col items-center p-4 gap-4">
        <Box className="flex flex-col items-center">
          <Check fontSize="large" color="success" />
          <Typography variant="h5">Venta creada correctamente</Typography>
        </Box>
        <Button color="success" variant="contained" onClick={onClose}>
          Finalizar
        </Button>
      </Box>
    );
  }, [onClose]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white p-4 rounded-2xl">
        {formSuccess?.sale ? (
          successMessage()
        ) : (
          <CreateSaleForm
            handleSuccess={handleCreateSaleSuccess}
            onClose={onClose}
          />
        )}
      </Box>
    </Modal>
  );
};

export default CreateSaleModal;
