import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { AiOutlineHome } from "react-icons/ai";
import Button from "../../components/ui/Button";
import { IoLogInOutline } from "react-icons/io5";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    };

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      login(token);
      toast.success("Logged in");
      nav("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    };
  };

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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-center mb-1">Welcome back</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Sign in to your LocalServiceHub account</p>
        </div>

        {/* login form */}
        <div className="text-start space-y-4 sm:space-y-5">
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
        </div>

        {/* submit button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-6 sm:mt-7 md:mt-8 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg"
        >
          {loading ? (
            <p className="flex items-center gap-2 justify-center">
              <IoLogInOutline className="text-lg sm:text-xl md:text-2xl" />
              Signing in...
            </p>
          ) : (
            <p className="flex items-center gap-2 justify-center">
              <IoLogInOutline className="text-lg sm:text-xl md:text-2xl" />
              Sign in
            </p>
          )}
        </Button>

        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          Don't have an account? 
          <Link to="/signup" className="text-primary font-medium ml-1 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login