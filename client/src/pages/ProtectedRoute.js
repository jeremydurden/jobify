import { useAppContext } from "../context/appContext";

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useAppContext();

  return user ? children : <Navigate to="/landing" />;
}
export default ProtectedRoute;
