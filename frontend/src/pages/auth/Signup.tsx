import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { AiOutlineHome, AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { HiOutlineWrench } from "react-icons/hi2";
import Button from "../../components/ui/Button";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeRole, setActiveRole] = useState("");

  const { login } = useAuth();

  const nav = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!name || !email) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    };

    if (password.length < 8) {
      toast.error("Password must be more than 8 characters");
      setLoading(false);
      return;
    };

    if (password !== confirm) {
      toast.error("Password dont match");
      setLoading(false);
      return;
    };

    if (!activeRole) {
      toast.error("Please choose a role");
      setLoading(false);
      return;
    };

    try {
      await api.post("/api/auth/signup", {
        role: activeRole,
        name,
        email,
        password,
      });

      const loginRes = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = loginRes.data.token;

      login(token);
      toast.success("Account Created Successfully");
      nav("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    };
  };

  const roles = [
    { id: "user", label: "Find Services", text: "I need help", icon: <AiOutlineUser /> },
    { id: "provider", label: "Offer Services", text: "I'm a provider", icon: <HiOutlineWrench /> }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 sm:py-10 md:py-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-md text-center"
      >
        <div className="flex flex-col items-center text-center mb-4 sm:mb-5 md:mb-6">
          <Link
            to="/"
            className="bg-linear-to-br from-primary to-primary/90 p-2 sm:p-3 rounded-lg mb-3 sm:mb-4 inline-block hover:shadow-lg transition">
            <AiOutlineHome className="text-2xl sm:text-3xl text-white" />
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-1">Create an account</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Join LocalServiceHub today</p>
        </div>

        {/* role selection */}
        <div className="flex flex-col gap-2 mb-4 sm:mb-5 md:mb-6 text-start">
          <p className="text-muted-foreground text-base sm:text-lg">I want to</p>
          <div className="flex gap-2 sm:gap-4 justify-between">
            {roles.map((role) => (
              <Button
                type="button"
                variant="outline"
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`w-1/2 transition-colors p-2 sm:p-3 ${activeRole === role.id
                  ? "text-primary border-primary bg-primary/5"
                  : "text-gray-500 hover:text-black/80"
                  }`}
              >
                <div className="flex flex-col items-center my-1 sm:my-2">
                  <div className={`text-2xl sm:text-3xl p-2 sm:p-4 bg-muted rounded-lg ${activeRole === role.id && "bg-primary/30"}`}>
                    {role.icon}
                  </div>
                  <p className="font-medium mt-2 sm:mt-3 text-xs sm:text-sm md:text-base">{role.label}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">{role.text}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* signup form */}
        <div className="text-start space-y-3 sm:space-y-4 md:space-y-5">
          {/* full name input */}
          <div>
            <label className="block text-sm sm:text-base text-muted-foreground font-medium mb-1.5 sm:mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50 text-sm sm:text-base transition"
            />
          </div>

          {/* email input */}
          <div>
            <label className="block text-sm sm:text-base text-muted-foreground font-medium mb-1.5 sm:mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50 text-sm sm:text-base transition"
            />
          </div>

          {/* password input */}
          <div>
            <label className="block text-sm sm:text-base text-muted-foreground font-medium mb-1.5 sm:mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50 text-sm sm:text-base transition"
            />
          </div>

          {/* confirm password input */}
          <div>
            <label className="block text-sm sm:text-base text-muted-foreground font-medium mb-1.5 sm:mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50 text-sm sm:text-base transition"
            />
          </div>
        </div>

        {/* submit button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg"
        >
          {loading ? (
            <p className="flex items-center gap-2 justify-center">
              <AiOutlineUserAdd className="text-lg sm:text-xl" />
              Creating account...
            </p>
          ) : (
            <p className="flex items-center gap-2 justify-center">
              <AiOutlineUserAdd className="text-lg sm:text-xl" />
              Create an account
            </p>
          )}
        </Button>

        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          Already have an account? 
          <Link to="/login" className="text-primary font-medium ml-1 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup