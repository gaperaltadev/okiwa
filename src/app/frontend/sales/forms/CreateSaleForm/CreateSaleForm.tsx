import { Controller } from "react-hook-form";
import { useCreateSaleForm } from "./useCreateSaleForm";
import { SaleStatusTypes } from "../../../../backend/sales/domain/Sale.entity";
import { CreateSaleFormProps } from "./types";
import { MouseEvent, useCallback, useState } from "react";
import { AddArticleModal } from "../../modals/AddArticleModal";
import {
  Autocomplete,
  Button,
  IconButton,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ClientEntity } from "../../../../backend/clients/domain/Client.entity";
import CreateClientModal from "@/app/frontend/clients/modals/CreateClientModal/CreateClientModal";
import { Delete, PersonAdd } from "@mui/icons-material";
import { SaleArticle } from "../AddArticleForm/useAddArticleForm";

const CreateSaleForm = ({ handleSuccess, onClose }: CreateSaleFormProps) => {
  const [addArticleModalState, setAddArticleModalState] = useState<{
    isOpen: boolean;
  }>({ isOpen: false });

  const [createClientModalState, setCreateClientModalState] = useState<{
    isOpen: boolean;
  }>({ isOpen: false });

  const handleOpenCreateClient = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setCreateClientModalState({ isOpen: true });
    },
    []
  );

  const handleCloseCreateClient = useCallback(() => {
    setCreateClientModalState({ isOpen: false });
  }, []);

  const {
    handleSubmit,
    formatNumber,
    fetchClients,
    control,
    errors,
    fields,
    total,
    append,
    remove,
    loading,
    clients,
  } = useCreateSaleForm({ handleSuccess });

  const translateStatusLabel = (status: string) => {
    switch (status) {
      case SaleStatusTypes.PENDING:
        return "Pendiente";
      case SaleStatusTypes.DELIVERED:
        return "Entregado";
      case SaleStatusTypes.CANCELLED:
        return "Cancelado";
      case SaleStatusTypes.HALF_PAID:
        return "Medio Pagado";
      case SaleStatusTypes.PAID:
        return "Pago Completo";
      default:
        return status;
    }
  };

  const handleOpenAddArticleModal = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setAddArticleModalState({ isOpen: true });
    },
    []
  );

  const handleCloseAddArticleModal = useCallback(() => {
    setAddArticleModalState({ isOpen: false });
  }, []);

  const handleSuccessAddArticle = useCallback(
    (saleArticle: SaleArticle) => {
      append({
        article: saleArticle.article,
        quantity: saleArticle.quantity,
        unitPrice: saleArticle.unitPrice,
        total: saleArticle.total,
      });
    },
    [append]
  );

  const handleSuccessCreateClient = useCallback((client: ClientEntity) => {
    console.log("Successfully created client ", { client });
  }, []);

  return (
    <div className="grid">
      <form
        className="flex flex-col gap-4 h-full overflow-auto"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Nueva venta</Typography>
        <div className="flex flex-col gap-2 h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Controller
              name="clientId"
              defaultValue=""
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <div className="flex gap-2">
                    <Autocomplete
                      {...field}
                      fullWidth
                      size="small"
                      options={clients}
                      loading={loading}
                      onFocus={fetchClients}
                      getOptionLabel={(option) => option.name}
                      onChange={(_, data) => field.onChange(data?.id || "")}
                      value={clients.find((c) => c.id === field.value) || null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Cliente"
                          placeholder="Cliente"
                          slotProps={{ inputLabel: { shrink: true } }}
                          error={!!error?.message}
                          helperText={
                            <Typography variant="caption">
                              {error?.message}
                            </Typography>
                          }
                        />
                      )}
                    />
                    <Tooltip title="Crear cliente">
                      <IconButton onClick={handleOpenCreateClient}>
                        <PersonAdd />
                      </IconButton>
                    </Tooltip>
                  </div>
                );
              }}
            />
            <Controller
              name="deadline"
              control={control}
              defaultValue={new Date().toISOString()}
              render={({ field, fieldState: { error } }) => {
                const dateValue = field.value;
                return (
                  <TextField
                    {...field}
                    size="small"
                    value={dateValue}
                    type="datetime-local"
                    label="Fecha de entrega"
                    slotProps={{ inputLabel: { shrink: true } }}
                    error={!!error?.message}
                    helperText={
                      <Typography variant="caption">
                        {error?.message}
                      </Typography>
                    }
                  />
                );
              }}
            />
            <Controller
              name="status"
              control={control}
              defaultValue={SaleStatusTypes.PENDING}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Autocomplete
                    {...field}
                    size="small"
                    onChange={(_, data) => field.onChange(data || "")}
                    options={Object.keys(SaleStatusTypes)}
                    getOptionLabel={(option) => translateStatusLabel(option)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Estado"
                        placeholder="Estado"
                        error={!!error?.message}
                        slotProps={{ inputLabel: { shrink: true } }}
                        helperText={
                          <Typography variant="caption">
                            {error?.message}
                          </Typography>
                        }
                      />
                    )}
                  />
                );
              }}
            />
          </div>
          <div className="flex flex-col bsale p-4 rounded-xl h-full bg-gray-50 gap-4 overflow-auto">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold">Detalle</p>
              <Button size="small" onClick={handleOpenAddArticleModal}>
                Agregar +
              </Button>
            </div>
            <div className="h-full text-center">
              {fields.length > 0 ? (
                <Table className="w-full">
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold text-end text-xs text-gray-500">
                        #
                      </TableCell>
                      <TableCell className="font-bold text-end text-xs text-gray-500">
                        Producto
                      </TableCell>
                      <TableCell className="font-bold text-end text-xs text-gray-500">
                        Cantidad
                      </TableCell>
                      <TableCell className="font-bold text-end text-xs text-gray-500">
                        Precio Unitario
                      </TableCell>
                      <TableCell className="font-bold text-end text-xs text-gray-500">
                        Total
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell className="text-end">{index + 1}</TableCell>
                        <TableCell className="text-end">
                          {field.article.name || "--"}
                        </TableCell>
                        <TableCell className="text-end">
                          {field.quantity || "--"}
                        </TableCell>
                        <TableCell className="text-end">
                          {field.unitPrice
                            ? formatNumber(Number(field.unitPrice))
                            : "--"}
                        </TableCell>
                        <TableCell className="text-end">
                          {field.total
                            ? formatNumber(Number(field.total))
                            : "--"}
                        </TableCell>
                        <TableCell>
                          <IconButton>
                            <Delete
                              color="error"
                              onClick={() => remove(index)}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>
                  <Typography variant="h5" color="textSecondary">
                    No hay articulos agregados
                  </Typography>
                  {errors.articles?.message && (
                    <Typography variant="caption" color="error">
                      {errors.articles.message}
                    </Typography>
                  )}
                </div>
              )}
            </div>
            <p className="font-bold text-lg text-end">Total: {total} Gs.</p>
          </div>
          <div className="grid gap-2">
            <p>Notas del pedido</p>
            <Controller
              name="notes"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input multiline placeholder="Notas" {...field} />
              )}
            />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button loading={loading} onClick={onClose} variant="outlined">
            Cancelar
          </Button>
          <Button loading={loading} type="submit">
            Crear pedido
          </Button>
        </div>
      </form>
      <AddArticleModal
        isOpen={addArticleModalState.isOpen}
        onClose={handleCloseAddArticleModal}
        handleSuccess={handleSuccessAddArticle}
      />
      <CreateClientModal
        isOpen={createClientModalState.isOpen}
        handleSuccess={handleSuccessCreateClient}
        onClose={handleCloseCreateClient}
      />
    </div>
  );
};

export default CreateSaleForm;
