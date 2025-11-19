import { useCallback, useEffect, useState } from "react";
import { ProductEntity } from "../../../../../backend/products/domain/Product.entity";
import toast from "react-hot-toast";
import { validationSchema } from "./validationSchema";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type SelectOption = {
  value: string;
  label: string;
};

export type SaleArticle = {
  article: { id: string; name: string };
  quantity: number;
  unitPrice: number;
  total: number;
};

type UseAddArticleFormProps = {
  handleSuccess: (article: SaleArticle) => void;
};

export const useAddArticleForm = ({
  handleSuccess,
}: UseAddArticleFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [products, setProducts] = useState<ProductEntity[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity>();
  const [productQuantity, setProductQuantity] = useState<string>("");
  const [productUnitPrice, setProductUnitPrice] = useState<string>("");

  async function fetchProductOptions() {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.BASE_PATH}api/product`);
      if (response.ok) {
        const responseData = await response.json();
        setProducts(responseData || []);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      toast.error("Algo salió mal");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!products) {
      fetchProductOptions();
    }
  }, [products]);

  type ArticleFormType = z.infer<typeof validationSchema>;

  const {
    watch,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormType>({
    resolver: zodResolver(validationSchema),
  });

  const values = getValues();
  const watchUnitPrice = watch("unitPrice");
  const watchQuantity = watch("quantity");

  const total = Number(watchUnitPrice) * Number(watchQuantity);

  const onSubmit = useCallback(
    (formValues: ArticleFormType) => {
      try {
        handleSuccess({
          article: formValues.article,
          unitPrice: formValues.unitPrice,
          quantity: formValues.quantity,
          total,
        });
      } catch (error) {
        console.log("Error submitting article:", error);
        toast.error("Algo salió mal");
      }
    },
    [handleSuccess, total]
  );

  return {
    handleSubmit: handleSubmit(onSubmit),
    setProductQuantity,
    setProductUnitPrice,
    setSelectedProduct,
    productQuantity,
    productUnitPrice,
    selectedProduct,
    products,
    loading,
    control,
    values,
    errors,
    total,
  };
};
