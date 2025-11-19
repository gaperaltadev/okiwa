import { ProtectedRoute } from "@/app/common/ProtectedRoute";
import { ProductsPage } from "@/frontend/products/pages/ProductsPage";

const Page = () => (
  <ProtectedRoute>
    <ProductsPage />
  </ProtectedRoute>
);

export default Page;
