import { ProtectedRoute } from "@/app/common/ProtectedRoute";
import { UsersPage } from "@/app/frontend/users/pages/UsersPage";

const Page = () => (
  <ProtectedRoute>
    <UsersPage />
  </ProtectedRoute>
);

export default Page;
