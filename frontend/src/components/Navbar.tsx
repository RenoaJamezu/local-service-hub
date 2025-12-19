import { useEffect, useState } from "react"
import { AiOutlineHome } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button";
import { IoCalendarClearOutline, IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineWrench } from "react-icons/hi2";

function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeProviderTab, setActiveProviderTab] = useState("dashboard");
  const [activeUserTab, setActiveUserTab] = useState("dashboard");

  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    nav(0);
  };

  const userTabs = [
    { id: "dashboard", label: "Dashboard", icon: <MdOutlineDashboard /> },
    { id: "requests", label: "My Requests", icon: <IoCalendarClearOutline /> },
  ];

  const providerTabs = [
    { id: "dashboard", label: "Dashboard", icon: <MdOutlineDashboard /> },
    { id: "bookings", label: "Bookings", icon: <IoCalendarClearOutline /> },
    { id: "services", label: "My Services", icon: <HiOutlineWrench /> },
  ];

  return (
    <header className={`fixed top-0 w-full h-14 md:h-20 z-50 transition-colors px-4 md:px-10 flex items-center justify-between bg-white border-b border-black/30 shadow ${scrolled
      ? "backdrop-blur-xs bg-white/50"
      : "bg-transparent"
      }`}>
      {/* start */}
      <div className="flex items-center gap-3">
        <div className="bg-linear-to-br from-primary to-muted-foreground p-2 rounded-lg">
          <AiOutlineHome className="md:text-3xl text-white" />
        </div>
        <span className="font-medium md:text-2xl">LocalService<span className="text-primary">Hub</span></span>
      </div>

      {/* middle desktop view*/}
      <div className="hidden md:flex">
        {user?.role === "user" && (
          <>
            <div className="flex gap-3">
              {userTabs.map((user) => (
                <Button
                  type="button"
                  variant="ghost"
                  key={user.id}
                  onClick={() => setActiveUserTab(user.id)}
                >
                  <NavLink
                    to={`/user/${user.id}`}
                    className={`flex items-center text-lg gap-2 
                      ${activeUserTab === user.id
                        ? "text-primary border-primary bg-primary/5"
                        : "text-gray-500 hover:text-black/80"}`}
                  >
                    <span className="text-2xl">
                      {user.icon}
                    </span>
                    {user.label}
                  </NavLink>
                </Button>
              ))}
            </div>
          </>
        )}
        {user?.role === "provider" && (
          <>
            <div className="flex gap-3">
              {providerTabs.map((provider) => (
                <Button
                  type="button"
                  variant="ghost"
                  key={provider.id}
                  onClick={() => setActiveProviderTab(provider.id)}
                >
                  <NavLink
                    to={`/provider/${provider.id}`}
                    className={`flex items-center text-lg gap-2 
                      ${activeProviderTab === provider.id
                        ? "text-primary border-primary bg-primary/5"
                        : "text-gray-500 hover:text-black/80"}`}
                  >
                    <span className="text-2xl">
                      {provider.icon}
                    </span>
                    {provider.label}
                  </NavLink>
                </Button>
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
              <span className="text-muted-foreground">Hi, <span className="text-black">{user?.name}</span></span>
              <Button
                variant="ghost"
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
                variant="ghost"
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