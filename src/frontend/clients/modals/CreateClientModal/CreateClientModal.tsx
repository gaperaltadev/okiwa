import { Box, Modal } from "@mui/material";
import { ClientEntity } from "../../../../../backend/clients/domain/Client.entity";
import { useCallback, useEffect, useState } from "react";
import SuccessMessage from "@/frontend/shared/components/SuccessMessage/SuccessMessage";
import { CreateClientForm } from "../../forms/CreateClientForm";

const CreateClientModal = ({
  isOpen,
  onClose,
  handleSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  handleSuccess: (client: ClientEntity) => void;
}) => {
  const [formSuccess, setFormSuccess] = useState<{ client: ClientEntity }>();

  useEffect(() => {
    setFormSuccess(undefined);
  }, [isOpen]);

  const onSuccess = useCallback(
    (client: ClientEntity) => {
      setFormSuccess({ client });
      handleSuccess(client);
    },
    [handleSuccess]
  );

  const successMessage = useCallback(
    () => (
      <SuccessMessage label="Usuario creado correctamente!" onClose={onClose} />
    ),
    [onClose]
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white p-4 rounded-2xl min-w-[300px]">
        {formSuccess?.client ? (
          successMessage()
        ) : (
          <CreateClientForm handleSuccess={onSuccess} onClose={onClose} />
        )}
      </Box>
    </Modal>
  );
};

export default CreateClientModal;
