import { Chip } from "@mui/material";
import { SaleStatusTypes } from "../../../../../../backend/sales/domain/Sale.entity";
import translateStatusLabel from "@/frontend/orders/utils/translateStatusLabel";

const getStatusChipColor = (status: string) => {
  switch (status) {
    case SaleStatusTypes.PENDING:
      return "default";
    case SaleStatusTypes.PAID:
      return "primary";
    case SaleStatusTypes.HALF_PAID:
      return "warning";
    case SaleStatusTypes.DELIVERED:
      return "success";
    case SaleStatusTypes.CANCELLED:
      return "error";
    default:
      return "default";
  }
};

const StatusChip = ({ status }: { status: string }) => {
  return (
    <Chip
      label={translateStatusLabel(status)}
      color={getStatusChipColor(status)}
    />
  );
};

export default StatusChip;
