"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { CategoryEntity } from "../../../../backend/categories/domain/Category.entity";
import { PostCreateCategoryResponse } from "@/app/api/category/route";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Add } from "@mui/icons-material";

export type ModalState<T> = {
  isOpen: boolean;
  data?: T;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryEntity[] | false>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [createCategoryModalState, setCreateCategoryModalState] = useState<
    ModalState<CategoryEntity>
  >({ isOpen: false });

  async function fetchData() {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.BASE_PATH}api/category`);
      if (response.ok) {
        const responseData = await response.json();
        setCategories(responseData);
      }
    } catch (err) {
      toast.error("Algo salió mal");
      console.log("Client: GET Categories error ", { err });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!categories) {
      fetchData();
    }
  }, [categories]);

  const handleAddCategoryModal = useCallback(() => {
    setCreateCategoryModalState({ isOpen: !createCategoryModalState.isOpen });
  }, [createCategoryModalState.isOpen]);

  type CategoryFormType = {
    name: string;
    slug?: string;
  };

  const categoryFormSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, "Campo requerido"),
        slug: z.string().optional(),
      }),
    []
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CategoryFormType>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = useCallback(async (values: CategoryFormType) => {
    try {
      setLoading(true);

      const response = await fetch(`${process.env.BASE_PATH}api/category`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const createdCategory: PostCreateCategoryResponse =
          await response.json();
        toast.success("Categoría creada exitosamente: " + createdCategory.name);
        fetchData();
      }
    } catch (err) {
      console.log("POST category error ", { err });
      toast.error("Algo salió mal al crear el categoryo");
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("Log home data ", { categories, errors });

  return (
    <div className="flex flex-col gap-6">
      <Toaster />
      <div className="flex justify-between">
        <p className="text-2xl font-bold">Categorías</p>
        <Button onClick={handleAddCategoryModal}>
          <Add />
          <p>Agregar categoría</p>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {loading && <p className="font-bold">Cargando...</p>}
        {!categories ||
          (categories.length === 0 && (
            <p className="text-2xl font-thin">Aún no tienes categorías</p>
          ))}
        <Table className="border">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha de creación</TableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories &&
              categories?.map((category: CategoryEntity, idx: number) => (
                <TableRow key={idx + "_cell"}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {category?.createdAt &&
                      new Date(category?.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {createCategoryModalState.isOpen && (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-xl font-bold">Agregar una nueva categoría</p>
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="name"
              render={({ field }) => <Input placeholder="Nombre" {...field} />}
            />
          </div>
          <div className="flex gap-2">
            <Button>Cancelar</Button>
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      )}
    </div>
  );
}
