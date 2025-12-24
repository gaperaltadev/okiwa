import DashboardPage from "@/app/frontend/home/pages/HomePage/DashboardPage/DashboardPage";
import { ProtectedRoute } from "./common/ProtectedRoute";

const Page = () => (
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
);

export default Page;
