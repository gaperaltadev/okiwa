import { useCallback, useEffect, useState, useMemo } from "react";
import { ProductEntity } from "../../../../backend/products/domain/Product.entity";
import toast from "react-hot-toast";
import { createValidationSchema } from "./createValidationSchema";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsApi } from "@/app/frontend/products";

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
  existingArticles?: SaleArticle[];
};

export const useAddArticleForm = ({
  handleSuccess,
  existingArticles,
}: UseAddArticleFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [products, setProducts] = useState<ProductEntity[]>();
  const [selectedProduct, setSelectedProduct] = useState<ProductEntity>();
  const [productQuantity, setProductQuantity] = useState<string>("");
  const [productUnitPrice, setProductUnitPrice] = useState<string>("");

  async function fetchProductOptions() {
    try {
      setLoading(true);
      const response = await ProductsApi.postAvailableProductsList({
        page: 1,
        limit: 1000,
        queryFilter: {},
      });
      if (response.status === 200) {
        const products = response.data;
        setProducts(products.items || []);
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

  // Filter out products that are already in the articles list
  const availableProducts = useMemo(() => {
    if (!products) return [];
    if (!existingArticles || existingArticles.length === 0) return products;

    const existingProductIds = new Set(
      existingArticles.map((article) => article.article.id)
    );

    return products.filter((product) => !existingProductIds.has(product.id));
  }, [products, existingArticles]);

  const validationSchema = useMemo(() => {
    return createValidationSchema(availableProducts);
  }, [availableProducts]);

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
    products: availableProducts,
    loading,
    control,
    values,
    errors,
    total,
  };
};
