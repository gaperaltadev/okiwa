import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { PostCreateProductResponse } from "@/app/api/product/route";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import z from "zod";
import { ProductEntity } from "../../../../../backend/products/domain/Product.entity";

type CreateEditProductFormProps = {
  handleSuccess: (product: ProductEntity) => void;
  onClose: () => void;
  product?: ProductEntity;
};

const CreateEditProductForm: FC<CreateEditProductFormProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { handleSuccess, onClose, product } = props;

  const productFormSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, "Campo requerido"),
        category: z.string().optional(),
      }),
    []
  );

  type ProductFormType = z.infer<typeof productFormSchema>;

  const { control, handleSubmit, reset } = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  useEffect(() => {
    if (product?.id) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = useCallback(
    async (values: ProductFormType) => {
      try {
        setLoading(true);

        if (product?.id) {
          const response = await fetch(`${process.env.BASE_PATH}api/product`, {
            method: "PUT",
            body: JSON.stringify({ id: product.id, ...values }),
          });

          if (response.ok) {
            const createdProduct: PostCreateProductResponse =
              await response.json();
            toast.success(
              "Producto actualizado exitosamente: " + createdProduct.name
            );
            handleSuccess(createdProduct);
          }
        } else {
          const response = await fetch(`${process.env.BASE_PATH}api/product`, {
            method: "POST",
            body: JSON.stringify(values),
          });

          if (response.ok) {
            const createdProduct: PostCreateProductResponse =
              await response.json();
            toast.success(
              "Producto creado exitosamente: " + createdProduct.name
            );
            handleSuccess(createdProduct);
          }
        }
      } catch (err) {
        console.log("POST product error ", { err });
        toast.error("Algo salió mal al crear el producto");
      } finally {
        setLoading(false);
      }
    },
    [handleSuccess, product]
  );

  return (
    <form
      className="flex flex-col gap-4 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h4" fontWeight={600}>
        Agregar un nuevo producto
      </Typography>
      <Box className="flex flex-col gap-2 h-full">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              variant="standard"
              label="Nombre del producto"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <TextField variant="standard" label="Categoría" {...field} />
          )}
        />
      </Box>
      <Box className="flex gap-2 justify-end">
        <Button onClick={onClose} loading={loading}>
          Cancelar
        </Button>
        <Button loading={loading} type="submit">
          Enviar
        </Button>
      </Box>
    </form>
  );
};

export default CreateEditProductForm;
