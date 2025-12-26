import { useCallback, useEffect, useState } from "react";
import z from "zod";
import {
  SaleEntity,
  SaleStatusTypes,
} from "../../../../backend/sales/domain/Sale.entity";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { SalesApi } from "../..";
import { ClientsApi } from "@/app/frontend/clients";
import { ClientEntity } from "../../../../backend/clients/domain/Client.entity";
import { validationSchema as saleArticleSchema } from "../AddArticleForm/validationSchema";

export type SelectOption = {
  value: string;
  label: string;
};

export const useCreateSaleForm = ({
  handleSuccess,
}: {
  handleSuccess: (data: SaleEntity) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [clients, setClients] = useState<ClientEntity[]>([]);
  const [total, setTotal] = useState<string>("");

  const saleFormSchema = z.object({
    clientId: z.string(),
    articles: z
      .array(saleArticleSchema)
      .min(1, { message: "Debe agregar al menos un producto" }),
    status: z.enum(SaleStatusTypes, { error: "Campo requerido" }),
    notes: z.string().optional(),
    deadline: z.string().optional(),
  });

  type SaleFormSchema = z.infer<typeof saleFormSchema>;

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SaleFormSchema>({
    resolver: zodResolver(saleFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "articles",
  });

  const values = getValues();

  const formatNumber = (value: number) => {
    return Intl.NumberFormat("es-ES").format(value);
  };

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ClientsApi.getClients();
      if (response.status === 200) {
        const fetchedClients = response.data || [];
        setClients(fetchedClients);
      }
    } catch (err) {
      console.log("error fetching clients ", { err });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!clients) {
      fetchClients();
    }
  }, [clients, fetchClients]);

  useEffect(() => {
    function calculateFieldsTotal() {
      const total = fields.reduce((acc, article) => {
        return acc + Number(article.quantity) * Number(article.unitPrice);
      }, 0);
      setTotal(formatNumber(total));
    }
    calculateFieldsTotal();
  }, [fields]);

  const onSubmit = useCallback(
    async (values: SaleFormSchema) => {
      try {
        setLoading(true);

        const { data } = await SalesApi.postCreateSale({
          clientId: values.clientId,
          saleArticles: values.articles.map((article) => ({
            articleId: article.article.id,
            quantity: article.quantity,
            unitPrice: article.unitPrice,
          })),
          status: values.status,
          notes: values.notes,
          deadline: values.deadline
            ? new Date(values.deadline).getTime()
            : undefined,
        });

        if (data) {
          toast.success("Pedido creado con éxito");
          handleSuccess(data);
        }
      } catch (err) {
        console.log("error creating sale ", { err });
        toast.error("Algo salió mal al crear el pedido");
      } finally {
        setLoading(false);
      }
    },
    [handleSuccess]
  );

  return {
    handleSubmit: handleSubmit(onSubmit),
    formatNumber,
    fetchClients,
    clients,
    values,
    append,
    remove,
    loading,
    control,
    fields,
    errors,
    total,
  };
};
