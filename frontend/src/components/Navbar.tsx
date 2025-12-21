import { useEffect, useState } from "react"
import { AiOutlineHome } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button";
import { IoCalendarClearOutline, IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { HiOutlineWrench, HiOutlineEllipsisVertical, HiOutlineXMark } from "react-icons/hi2";
import toast from "react-hot-toast";

function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);
  };

  const userTabs = [
    {
      to: "/user/dashboard",
      label: "Dashboard",
      icon: <MdOutlineDashboard />
    },
    {
      to: "/user/requests",
      label: "My Requests",
      icon: <IoCalendarClearOutline />
    },
  ];

  const providerTabs = [
    {
      to: "/provider/dashboard",
      label: "Dashboard",
      icon: <MdOutlineDashboard />
    },
    {
      to: "/provider/bookings",
      label: "Bookings",
      icon: <IoCalendarClearOutline />
    },
    {
      to: "/provider/services",
      label: "My Services",
      icon: <HiOutlineWrench />
    },
  ];

  return (
    <header className={`fixed top-0 w-full h-16 sm:h-20 z-50 transition-colors px-4 sm:px-6 md:px-10 flex items-center justify-between bg-white border-b border-black/30 shadow ${scrolled
      ? "backdrop-blur-xs bg-white/50"
      : "bg-transparent"
      }`}>
      {/* logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="bg-linear-to-br from-primary to-primary/90 p-1.5 sm:p-2 rounded-lg">
          <AiOutlineHome className="text-2xl sm:text-3xl text-white" />
        </div>
        <h1 className="font-medium text-sm sm:text-lg md:text-2xl">LocalService<span className="text-primary">Hub</span></h1>
      </div>

      {/* middle desktop view*/}
      <div className="hidden md:flex">
        {user?.role === "user" && (
          <div className="flex gap-2 lg:gap-3">
            {userTabs.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
              >
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "active" : "ghost"}
                    className="flex items-center gap-2 text-sm lg:text-base shadow-none hover:shadow-none"
                  >
                    <span className="text-xl lg:text-2xl">{icon}</span>
                    {label}
                  </Button>
                )}
              </NavLink>
            ))}
          </div>
        )}
        {user?.role === "provider" && (
          <div className="flex gap-2 lg:gap-3">
            {providerTabs.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
              >
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "active" : "ghost"}
                    className="flex items-center gap-2 text-sm lg:text-base shadow-none hover:shadow-none"
                  >
                    <span className="text-xl lg:text-2xl">{icon}</span>
                    {label}
                  </Button>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* end desktop view*/}
      <div className="hidden md:flex">
        {user ? (
          <div className="flex items-center gap-2 lg:gap-3">
            <p className="text-xs lg:text-sm text-muted-foreground">Hi, <span className="text-black font-medium hidden lg:inline">{user?.name}</span></p>
            <Button
              variant="outline"
              className="flex items-center gap-1 text-sm lg:text-base"
              onClick={handleLogout}
            >
              <IoLogOutOutline className="text-lg lg:text-2xl" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 lg:gap-3">
            <Button
              variant="outline"
              className="font-medium text-sm lg:text-base"
              onClick={() => nav("/login")}
            >
              Login
            </Button>
            <Button
              className="font-medium text-sm lg:text-base"
              onClick={() => nav("/signup")}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>

      {/* mobile menu button */}
      <button
        className="md:hidden flex items-center justify-center p-2 hover:bg-secondary rounded-lg transition"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <HiOutlineXMark className="text-2xl" />
        ) : (
          <HiOutlineEllipsisVertical className="text-2xl" />
        )}
      </button>

      {/* mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 sm:top-20 left-0 right-0 bg-white border-b border-black/10 shadow-lg md:hidden">
          <div className="flex flex-col p-4 gap-3">
            {/* user tabs */}
            {user?.role === "user" && (
              <>
                {userTabs.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "active" : "outline"}
                        className="w-full flex items-center gap-2 justify-center text-sm"
                      >
                        <span className="text-lg">{icon}</span>
                        {label}
                      </Button>
                    )}
                  </NavLink>
                ))}
              </>
            )}

            {/* provider tabs */}
            {user?.role === "provider" && (
              <>
                {providerTabs.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "active" : "outline"}
                        className="w-full flex items-center gap-2 justify-center text-sm"
                      >
                        <span className="text-lg">{icon}</span>
                        {label}
                      </Button>
                    )}
                  </NavLink>
                ))}
              </>
            )}

            {/* auth buttons */}
            {user ? (
              <>
                <Button
                  variant="destructive"
                  className="w-full flex items-center gap-2 justify-center text-sm"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline className="text-lg" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full font-medium text-sm"
                  onClick={() => {
                    nav("/login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="w-full font-medium text-sm"
                  onClick={() => {
                    nav("/signup");
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar