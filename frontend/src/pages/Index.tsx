import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useAuth } from "../hooks/useAuth"
import Spinner from "../components/Spinner";

function Index() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (user) {
    return user.role === "user"
      ? <Navigate to="/user/dashboard" replace />
      : <Navigate to="/provider/dashboard" replace />
  };

  return (
    <main>
      <Navbar />
    </main>
  )
}

export default Index