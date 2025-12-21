import { useEffect, useState } from "react"
import { AiOutlineHome } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button";
import { IoCalendarClearOutline, IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineWrench } from "react-icons/hi2";
import toast from "react-hot-toast";

function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    toast.success("Logout successfully");
    logout();
    nav("/");
  };

  const userTabs = [
    { to: "/user/dashboard", label: "Dashboard", icon: <MdOutlineDashboard /> },
    { to: "/user/requests", label: "My Requests", icon: <IoCalendarClearOutline /> },
  ];

  const providerTabs = [
    { to: "/provider/dashboard", label: "Dashboard", icon: <MdOutlineDashboard /> },
    { to: "/provider/bookings", label: "Bookings", icon: <IoCalendarClearOutline /> },
    { to: "/provider/services", label: "My Services", icon: <HiOutlineWrench /> },
  ];

  return (
    <header className={`fixed top-0 w-full h-14 md:h-20 z-50 transition-colors px-4 md:px-10 flex items-center justify-between bg-white border-b border-black/30 shadow ${scrolled
      ? "backdrop-blur-xs bg-white/50"
      : "bg-transparent"
      }`}>
      {/* start */}
      <div className="flex items-center gap-3">
        <div className="bg-linear-to-br from-primary to-primary/90 p-2 rounded-lg">
          <AiOutlineHome className="md:text-3xl text-white" />
        </div>
        <h1 className="font-medium md:text-2xl">LocalService<span className="text-primary">Hub</span></h1>
      </div>

      {/* middle desktop view*/}
      <div className="hidden md:flex">
        {user?.role === "user" && (
          <>
            <div className="flex gap-3">
              {userTabs.map(({ to, label, icon }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "active" : "outline"}
                      className="flex items-center gap-2"
                    >
                      <span className="text-2xl">{icon}</span>
                      {label}
                    </Button>
                  )}
                </NavLink>
              ))}
            </div>
          </>
        )}
        {user?.role === "provider" && (
          <>
            <div className="flex gap-3">
              {providerTabs.map(({ to, label, icon }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "active" : "outline"}
                      className="flex items-center gap-2"
                    >
                      <span className="text-2xl">
                        {icon}
                      </span>
                      {label}
                    </Button>
                  )}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>

      {/* end desktop view*/}
      <div className="hidden md:flex">
        {user ? (
          <>
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground">Hi, <span className="text-black">{user?.name}</span></p>
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleLogout}
              >
                <IoLogOutOutline className="text-2xl" />
                Logout
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="font-medium"
                onClick={() => nav("/login")}
              >
                Login
              </Button>
              <Button
                className="font-medium"
                onClick={() => nav("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </div>

    </header>
  )
}

export default Navbar