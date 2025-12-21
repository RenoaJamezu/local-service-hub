import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import RoleRoute from "./components/RoleRoute";
import UserDashboard from "./pages/user/Dashboard";
import UserRequests from "./pages/user/Requests";
import ProviderDashboard from "./pages/provider/Dashboard";
import ProviderServices from "./pages/provider/Services";
import ProviderBookings from "./pages/provider/Bookings";
import NotFound from "./pages/NotFound";
import ProviderLayout from "./pages/provider/ProviderLayout";
import UserLayout from "./pages/user/UserLayout";
import { useAuth } from "./hooks/useAuth";
import Spinner from "./components/Spinner";
import { ScrollToTop } from "./utils/ScrollToTop";

function App() {
  const { loading } = useAuth();

  if (loading) return <Spinner />;

  return (
    <>
      <Toaster />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* protected routes */}
          <Route element={<ProtectedRoute />} >
            {/* user routes */}
            <Route element={<RoleRoute role="user" />}>
              <Route path="/user" element={<UserLayout />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="requests" element={<UserRequests />} />
              </Route>
            </Route>

            {/* provider routes */}
            <Route element={<RoleRoute role="provider" />}>
              <Route path="/provider" element={<ProviderLayout />}>
                <Route path="dashboard" element={<ProviderDashboard />} />
                <Route path="services" element={<ProviderServices />} />
                <Route path="bookings" element={<ProviderBookings />} />
              </Route>
            </Route>
          </Route>

          {/* no routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
