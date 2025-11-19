import { SaleStatusTypes } from "../../../../backend/sales/domain/Sale.entity";

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

export default translateStatusLabel;
