import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Index() {
  const { token, logout, user } = useAuth();

  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav(0);
  };
  return (
    <>
      <div className="flex gap-10 p-10 items-center">
        <Link to="/login" className="px-3 py-2 border rounded-lg items-center justify-center bg-primary">
          Login
        </Link>
        <Link to="/signup" className="px-3 py-2 border rounded-lg items-center justify-center bg-primary-foreground">
          Signup
        </Link>
        <Link to="/user/dashboard" className="px-3 py-2 border rounded-lg items-center justify-center bg-secondary">
          User
        </Link>
        <Link to="/provider/dashboard" className="px-3 py-2 border rounded-lg items-center justify-center bg-secondary-foreground">
          Provider
        </Link>
        {token &&
          <button onClick={handleLogout} className="px-3 py-2 border rounded-lg items-center justify-center">
            Logout
          </button>
        }
        <span>{user?._id}</span>
        <span>{user?.name}</span>
        <span>{user?.email}</span>
        <span>{user?.role}</span>
      </div>
    </>
  )
}

export default Index