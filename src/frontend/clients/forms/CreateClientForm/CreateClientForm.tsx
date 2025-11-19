import { Controller } from "react-hook-form";
import { ClientEntity } from "../../../../../backend/clients/domain/Client.entity";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useCreateClientForm } from "./useCreateClientForm";

const CreateClientForm = ({
  onClose,
  handleSuccess,
}: {
  onClose: () => void;
  handleSuccess: (client: ClientEntity) => void;
}) => {
  const { control, handleSubmit, onSubmit, loading } =
    useCreateClientForm(handleSuccess);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5">Crear cliente</Typography>
      <Box className="flex flex-col gap-4">
        <Controller
          control={control}
          defaultValue=""
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error?.message}
              helperText={error?.message}
              label="Nombre"
            />
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name="document"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error?.message}
              helperText={error?.message}
              label="Documento"
            />
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error?.message}
              helperText={error?.message}
              label="Email"
            />
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name="phone"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error?.message}
              helperText={error?.message}
              label="Teléfono"
            />
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name="address"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error?.message}
              helperText={error?.message}
              label="Dirección"
            />
          )}
        />
      </Box>
      <Box className="flex gap-2">
        <Button loading={loading} onClick={onClose}>
          Cancelar
        </Button>
        <Button loading={loading} type="submit">
          Confirmar
        </Button>
      </Box>
    </form>
  );
};

export default CreateClientForm;
