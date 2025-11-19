import { ProtectedRoute } from "@/app/common/ProtectedRoute";
import { SalesPage } from "@/frontend/orders/pages/SalesPage";

const Page = () => (
  <ProtectedRoute>
    <SalesPage />
  </ProtectedRoute>
);

export default Page;
