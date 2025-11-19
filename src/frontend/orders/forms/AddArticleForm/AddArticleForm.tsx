import { SaleArticle, useAddArticleForm } from "./useAddArticleForm";
import { Controller } from "react-hook-form";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";

const AddArticleForm = ({
  handleSuccess,
  onClose,
}: {
  handleSuccess: (article: SaleArticle) => void;
  onClose?: () => void;
}) => {
  const {
    products,
    control,
    total,
    selectedProduct,
    setSelectedProduct,
    handleSubmit,
  } = useAddArticleForm({
    handleSuccess,
  });

  const formatNumber = (value: number) => {
    return Intl.NumberFormat("es-ES").format(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Typography variant="h5">Agregar artículo</Typography>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="article"
          render={({ field, fieldState: { error } }) => (
            <Autocomplete
              {...field}
              value={selectedProduct || null}
              options={products || []}
              getOptionLabel={(option) => option.name || ""}
              onChange={(_, data) => {
                if (data) {
                  field.onChange(data || null);
                  setSelectedProduct(data);
                }
                return;
              }}
              renderInput={(props) => (
                <TextField
                  {...props}
                  label="Producto"
                  placeholder="Selecciona el producto"
                  slotProps={{ inputLabel: { shrink: true } }}
                  error={!!error?.message}
                  helperText={error?.message}
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="unitPrice"
          defaultValue={0}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Precio Unitario"
              error={!!error?.message}
              helperText={error ? error.message : ""}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={(e) => {
                // remove dots from the string
                const value = e.target.value.replace(/\./g, "");

                // allow only numbers
                if (RegExp(/^\d*$/).test(value)) {
                  return field.onChange(Number(value));
                }
              }}
              value={formatNumber(Number(field.value))}
              type="string"
            />
          )}
        />
        <Controller
          control={control}
          name="quantity"
          defaultValue={0}
          render={({ field, fieldState: { error } }) => (
            <TextField
              label="Cantidad"
              error={!!error?.message}
              helperText={error ? error.message : ""}
              slotProps={{ inputLabel: { shrink: true } }}
              onChange={(e) => {
                // remove dots from the string
                const value = e.target.value.replace(/\./g, "");

                // allow only numbers
                if (RegExp(/^\d*$/).test(value)) {
                  return field.onChange(Number(value));
                }
              }}
              value={formatNumber(Number(field.value))}
              type="string"
            />
          )}
        />
      </div>
      <div className="text-end font-bold text-2xl">
        Total: {formatNumber(total)} Gs.
      </div>
      <div className="flex gap-2 justify-end">
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit">Agregar</Button>
      </div>
    </form>
  );
};

export default AddArticleForm;
