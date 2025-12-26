import { SaleEntity } from "../../../../backend/sales/domain/Sale.entity";

export interface CreateSaleFormProps {
  handleSuccess: (data: SaleEntity) => void;
  onClose: () => void;
}
