import { PopulatedSaleEntity } from "@/app/backend/sales/domain/Sale.entity";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { SalesApi } from "../..";

interface DeleteSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale?: PopulatedSaleEntity;
  handleSuccess: () => void;
}

const DeleteSaleModal: FC<DeleteSaleModalProps> = (props) => {
  const { isOpen, onClose, sale, handleSuccess } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [restoreStock, setRestoreStock] = useState<boolean>(true);

  const handleSubmit = useCallback(async () => {
    try {
      if (!sale?.id) {
        return;
      }

      setLoading(true);

      const response = await SalesApi.deleteSale(sale.id, restoreStock);

      if (response.status === 204) {
        handleSuccess();
        onClose();
        toast.success("Venta eliminada correctamente");
      }
    } catch (error) {
      toast.error("Error al eliminar la venta");
      console.error("Delete sale error:", error);
    } finally {
      setLoading(false);
    }
  }, [handleSuccess, onClose, sale?.id, restoreStock]);

  const handleClose = useCallback(() => {
    setRestoreStock(true);
    onClose();
  }, [onClose]);

  console.log("delete this sale ", { sale });

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <Box className="bg-white p-6 rounded-2xl w-full max-w-md grid gap-4">
        <Typography variant="h5">Eliminar venta</Typography>
        <Typography>
          ¿Estás seguro que deseas eliminar la venta del cliente{" "}
          <strong>{sale?.client?.name}</strong>?
        </Typography>

        {sale?.saleArticles && sale.saleArticles.length > 0 && (
          <Box>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Artículos de la venta:
            </Typography>
            <List dense className="bg-gray-50 rounded-lg">
              {sale.saleArticles.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.article.name}
                    secondary={`Cantidad: ${
                      item.quantity
                    } - Precio unitario: ${Number(
                      item.unitPrice
                    ).toLocaleString("es-ES")} Gs.`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              checked={restoreStock}
              onChange={(e) => setRestoreStock(e.target.checked)}
              color="primary"
            />
          }
          label="Restaurar stock de productos"
        />

        <Typography variant="caption" color="textSecondary">
          {restoreStock
            ? "El stock de los productos será restaurado"
            : "El stock de los productos NO será modificado"}
        </Typography>

        <Typography variant="body2" color="error" fontWeight="bold">
          Esta acción no se puede deshacer
        </Typography>

        <Box className="flex gap-2 justify-end">
          <Button disabled={loading} onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
          <Button loading={loading} onClick={handleSubmit} color="error">
            Confirmar eliminación
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteSaleModal;
