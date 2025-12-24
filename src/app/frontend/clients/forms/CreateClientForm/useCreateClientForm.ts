import { ClientEntity } from "../../../../backend/clients/domain/Client.entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import { useForm } from "react-hook-form";
import { ClientsApi } from "../..";
import { useState } from "react";
import z from "zod";

export const useCreateClientForm = (
  handleSuccess: (client: ClientEntity) => void
) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
  });

  type FormDataType = z.infer<typeof formSchema>;

  const onSubmit = async (data: FormDataType) => {
    try {
      setLoading(true);
      const response = await ClientsApi.postClient(data);

      if (response.status === 201) {
        const newClient = response.data;
        handleSuccess(newClient);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    control,
    handleSubmit,
    onSubmit,
  };
};
