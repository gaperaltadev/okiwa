import z from "zod";
import { ProductEntity } from "@/app/backend/products/domain/Product.entity";

export const createValidationSchema = (products?: ProductEntity[]) => {
  return z
    .object({
      article: z.object(
        {
          id: z.string(),
          name: z.string(),
        },
        {
          error: "Debe seleccionar un artículo",
        }
      ),
      quantity: z
        .number()
        .min(1, { message: "La cantidad debe ser mayor que cero" }),
      unitPrice: z
        .number()
        .min(1, { message: "El precio unitario debe ser mayor que cero" }),
      total: z.number().optional(),
    })
    .superRefine((data, ctx) => {
      // Find the selected product
      const selectedProduct = products?.find((p) => p.id === data.article.id);

      if (selectedProduct) {
        const availableStock = selectedProduct.currentStock || 0;

        if (data.quantity > availableStock) {
          ctx.addIssue({
            code: "custom",
            message: `Stock insuficiente. Disponible: ${availableStock}`,
            path: ["quantity"],
          });
        }
      }
    });
};

export const validationSchema = createValidationSchema();
