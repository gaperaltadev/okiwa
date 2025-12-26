import { ProductEntity } from "../../../../backend/products/domain/Product.entity";
import { PostCreateProductResponse } from "@/app/api/products/route";
import { useCallback, useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsApi } from "@/app/frontend/products";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export const useCreateEditProductForm = ({
  product,
  handleSuccess,
}: {
  product?: ProductEntity;
  handleSuccess: (product: ProductEntity) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const productFormSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, "Campo requerido"),
        category: z.string().optional(),
        sku: z.string().optional(),
        minStock: z.preprocess((val) => Number(val), z.number()),
        currentStock: z.preprocess((val) => Number(val), z.number()),
      }),
    []
  );

  type ProductFormType = z.infer<typeof productFormSchema>;

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      sku: "",
      minStock: 0,
      currentStock: 0,
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
          const response = await ProductsApi.putProduct({
            id: product.id,
            ...values,
          });

          if (response.status === 200) {
            const createdProduct: PostCreateProductResponse = response.data;
            toast.success(
              "Producto actualizado exitosamente: " + createdProduct.name
            );
            handleSuccess(createdProduct);
          }
        } else {
          const response = await ProductsApi.postProduct({ ...values });

          if (response.status === 200) {
            const createdProduct: PostCreateProductResponse = response.data;
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

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    loading,
  };
};
