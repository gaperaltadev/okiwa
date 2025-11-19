import z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  document: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});
