import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Modal, TextField } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import { UsersApi } from "../..";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSuccess?: () => void;
}

const CreateUserModal: FC<CreateUserModalProps> = (props) => {
  const { isOpen, onClose, handleSuccess } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    if (handleSuccess) {
      handleSuccess();
    }

    toast.success("Usuario creado correctamente");
    onClose();
  }, [handleSuccess, onClose]);

  const createUserFormSchema = z.object({
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z.email("El correo electrónico no es válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  type CreateUserFormData = z.infer<typeof createUserFormSchema>;

  const { handleSubmit, control } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: CreateUserFormData) => {
      try {
        setLoading(true);
        const response = await UsersApi.postUser(data);
        if (response.status === 201) {
          onSuccess();
        }
      } catch (error) {
        console.log("Error creating user:", error);
        toast.error("Error al crear el usuario");
      } finally {
        setLoading(false);
      }
    },
    [onSuccess]
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white p-4 rounded-2xl w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <p className="text-3xl font-bold">Crear usuario</p>
          <Box className="grid gap-4">
            <Controller
              control={control}
              name="username"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error?.message}
                  helperText={error?.message}
                  label="Nombre de usuario"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error?.message}
                  helperText={error?.message}
                  label="Correo electrónico"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={!!error?.message}
                  helperText={error?.message}
                  label="Contraseña"
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              )}
            />
          </Box>
          <Box className="flex gap-2">
            <Button disabled={loading} color="error" onClick={onClose}>
              Cancelar
            </Button>
            <Button loading={loading} type="submit">
              Crear
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateUserModal;
