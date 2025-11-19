import z from "zod";

export const validationSchema = z.object({
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
});
