import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import RoleRoute from "./components/RoleRoute";
import UserDashboard from "./pages/user/Dashboard";
import ProviderDashboard from "./pages/provider/Dashboard";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />} >
            {/* user routes */}
            <Route element={<RoleRoute role="user" />}>
              <Route path="/user/dashboard" element={<UserDashboard />}/>
            </Route>

            {/* provider routes */}
            <Route element={<RoleRoute role="provider" />}>
              <Route path="/provider/dashboard" element={<ProviderDashboard />}/>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
