import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import { useAuth } from "../hooks/useAuth"
import Spinner from "../components/Spinner";
import { HiOutlineClock, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineUserGroup, HiOutlineWrench } from "react-icons/hi2";
import Button from "../components/ui/Button";
import { HiOutlineArrowSmRight } from "react-icons/hi";

function Index() {
  const { user, loading } = useAuth();

  const nav = useNavigate();

  if (loading) return <Spinner />;

  if (user) {
    return user.role === "user"
      ? <Navigate to="/user/dashboard" replace />
      : <Navigate to="/provider/dashboard" replace />
  };

  const popularServices = [
    { name: "Plumbing", icon: "🔧" },
    { name: "Electrical", icon: "⚡" },
    { name: "Cleaning", icon: "🧹" },
    { name: "Carpentry", icon: "🪚" },
    { name: "Painting", icon: "🎨" },
    { name: "Appliance Repair", icon: "🔌" },
  ];

  const features = [
    {
      name: "Verified Providers",
      message: "All service providers are verified and trusted members of your local community.",
      icon: <HiOutlineShieldCheck />
    },
    {
      name: "Quick Response",
      message: "Get fast responses from providers and track your booking status in real-time.",
      icon: <HiOutlineClock />
    },
    {
      name: "Local Community",
      message: "Connect with skilled professionals in your area for all your service needs.",
      icon: <HiOutlineUserGroup />
    },
  ];

  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen">

        {/* hero */}
        <section className="min-h-screen flex flex-col text-center items-center justify-center bg-secondary px-10">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiOutlineSparkles className="text-3xl" />
            Your trusted local service marketplace
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-6">
            Find Local Services
            <br />
            <span className="text-primary">You Can Trust</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-5">
            Connect with verified service providers in your community. From plumbing to electrical
            work, find the help you need with just a few clicks.
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => nav("/signup")}
              className="flex items-center gap-2 text-xl font-medium px-6 py-3"
            >
              Get Started
              <HiOutlineArrowSmRight className="text-2xl" />
            </Button>
            <Button
              onClick={() => nav("/login")}
              variant="outline"
              className="text-xl font-medium px-6 py-3"
            >
              I'm a Provider
            </Button>
          </div>
        </section>

        {/* popular service */}
        <section className="flex flex-col text-center item-center justify-center py-20 px-10">
          <h1 className="text-muted-foreground font-medium mb-10">POPULAR SERVICES</h1>
          <div className="flex gap-5 justify-center">
            {popularServices.map((item) => (
              <div className="flex items-center bg-secondary px-4 py-3 rounded-full gap-2 shadow hover:-translate-y-px hover:shadow-lg">
                <span>{item.icon}</span>
                <p className="font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* features */}
        <section className="flex flex-col text-center items-center justify-center py-30 px-10 bg-secondary">
          <h1 className="text-4xl font-medium mb-3">Why Choose LocalServiceHub?</h1>
          <p className="text-muted-foreground mb-10">We make it easy to find and book trusted service providers in your area.</p>

          <div className="grid grid-cols-3 gap-5 text-start">
            {features.map((item) => (
              <div className="flex flex-col bg-white rounded-lg p-10 shadow transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg fade-slide-in">
                <div className="flex">
                  <span className="bg-primary/25 rounded-lg p-3 text-3xl text-primary mb-5">
                    {item.icon}
                  </span>
                </div>
                <h1 className="text-xl font-medium mb-4">{item.name}</h1>
                <p className="text-md text-muted-foreground">{item.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* cta */}
        <section className="flex flex-col text-center items-center justify-center py-30 px-10 bg-linear-to-br from-primary to-primary/90">
          <div className="shadow rounded-lg p-4 text-4xl text-white backdrop-blur-xs bg-white/10 mb-5">
            <HiOutlineWrench />
          </div>
          <h1 className="text-4xl font-medium text-white mb-3">Ready to Get Started?</h1>
          <p className="text-lg text-white w-max-2xl mb-10">Join thousands of happy customers who found their perfect service provider.</p>
          <div className="flex gap-4">
            <Button
              onClick={() => nav("/signup")}
              variant="outline"
              className="flex items-center gap-2 text-xl font-medium px-6 py-3 text-primary"
            >
              Create Account
              <HiOutlineArrowSmRight className="text-2xl" />
            </Button>
            <Button
              onClick={() => nav("/login")}
              className="text-xl font-medium px-6 py-3"
            >
              Become a Provider
            </Button>
          </div>
        </section>

        {/* footer */}
        <footer className="text-center py-2 text-muted-foregrund font-medium">
          © 2025 Lenor James Jamero
        </footer>
      </main>
    </>
  )
}

export default Index