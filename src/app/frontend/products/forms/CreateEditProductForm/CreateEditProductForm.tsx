import { FC } from "react";
import { Button, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { ProductEntity } from "../../../../backend/products/domain/Product.entity";
import { useCreateEditProductForm } from "./useCreateEditProductForm";
import { AddCircleOutline } from "@mui/icons-material";

type CreateEditProductFormProps = {
  handleSuccess: (product: ProductEntity) => void;
  onClose: () => void;
  product?: ProductEntity;
};

const CreateEditProductForm: FC<CreateEditProductFormProps> = (props) => {
  const { handleSuccess, onClose, product } = props;

  const { control, onSubmit, loading } = useCreateEditProductForm({
    handleSuccess,
    product,
  });

  return (
    <form className="flex flex-col gap-6 h-full" onSubmit={onSubmit}>
      <div className="flex items-center gap-2">
        <AddCircleOutline color="action" />
        <span className="font-extrabold text-2xl">Producto nuevo</span>
      </div>
      <div className="flex flex-col gap-4 h-full">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size="small"
              label="Nombre del producto"
              error={!!error?.message}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size="small"
              label="Categoría"
              error={!!error?.message}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="sku"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              size="small"
              label="Identificador único"
              error={!!error?.message}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="currentStock"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="number"
              size="small"
              label="Stock actual"
              error={!!error?.message}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="minStock"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type="number"
              size="small"
              label="Stock mínimo"
              error={!!error?.message}
              helperText={
                error?.message ||
                "Cuando el stock sea menor al mínimo, se notificará al administrador"
              }
            />
          )}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button onClick={onClose} loading={loading}>
          Cancelar
        </Button>
        <Button loading={loading} type="submit">
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default CreateEditProductForm;
