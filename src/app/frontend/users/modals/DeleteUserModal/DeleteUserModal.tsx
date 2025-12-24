import { FirebaseUser } from "@/app/api/user/route";
import { Box, Button, Modal } from "@mui/material";
import { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { UsersApi } from "../..";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: FirebaseUser;
  handleSuccess: () => void;
}

const DeleteUserModal: FC<DeleteUserModalProps> = (props) => {
  const { isOpen, onClose, user, handleSuccess } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(async () => {
    try {
      if (!user?.uid) {
        return;
      }

      setLoading(true);

      const response = await UsersApi.deleteUser(user?.uid);

      if (response.status === 200) {
        handleSuccess();
        onClose();
        toast.success("Usuario eliminado correctamente");
      }
    } catch (error) {
      toast.error("Error al eliminar el usuario");
    } finally {
      setLoading(false);
    }
  }, [handleSuccess, onClose, user?.uid]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex justify-center items-center"
    >
      <Box className="bg-white p-4 rounded-2xl w-1/2 grid gap-4">
        <p className="text-2xl">
          ¿Estás seguro que deseas eliminar este usuario? {user?.email}
        </p>
        <p className="font-bold">Esta acción no se puede deshacer</p>
        <Box className="flex gap-2">
          <Button disabled={loading} onClick={onClose} color="error">
            Cancelar
          </Button>
          <Button loading={loading} onClick={handleSubmit}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteUserModal;
