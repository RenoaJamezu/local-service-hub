import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { AiOutlineHome } from "react-icons/ai";
import Button from "../../components/ui/Button";
import { IoLogInOutline } from "react-icons/io5";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

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

      if (res.data.role === "user") {
        nav("/user/dashboard");
      } else {
        nav("/provider/dashboard");
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message || "Login failed");
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center"
      >
        <div className="flex flex-col items-center text-center mb-5">
          <div className="bg-linear-to-br from-primary to-muted-foreground p-3 rounded-lg">
            <AiOutlineHome className="text-3xl text-white" />
          </div>
          <h1 className="text-2xl font-medium text-center mb-2">Welcome back</h1>
          <span className="text-muted-foreground">Sign in to your LocalServiceHub account</span>
        </div>

        {/* signup form */}
        <div className="text-start">
          {/* email input */}
          <div className="mb-5">
            <label className="block text-md text-muted-foreground font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50"
            />
          </div>

          {/* password input */}
          <div className="mb-5">
            <label className="block text-md text-muted-foreground font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50"
            />
          </div>
        </div>

        {/* submit button */}
        <Button
          type="submit"
          className="w-full mb-4"
        >
          {loading ? (
            "Signing in..."
          ) : (
            <span className="flex items-center gap-2 justify-center text-xl">
              <IoLogInOutline className="text-2xl" />
              Sign in
            </span>
          )}
        </Button>

        <span className="text-muted-foreground">Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link></span>
      </form>
    </div>
  )
}

export default Login