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

      if (loginRes.data.role === "user") {
        nav("/user/dashboard");
      } else {
        nav("/provider/dashboard");
      };
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center"
      >
        <div className="flex flex-col items-center text-center mb-5">
          <div className="bg-linear-to-br from-primary to-muted-foreground p-3 rounded-lg">
            <AiOutlineHome className="text-3xl text-white" />
          </div>
          <h1 className="text-2xl font-medium text-center mb-2">Create an account</h1>
          <span className="text-muted-foreground">Join LocalServiceHub today</span>
        </div>

        {/* role */}
        <div className="flex flex-col gap-2 mb-4 text-start">
          <span className="text-muted-foreground text-lg">I want to</span>
          <div className="flex gap-4 justify-between">
            {roles.map((role) => (
              <Button
                type="button"
                variant="outline"
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`w-1/2 transition-colors ${activeRole === role.id
                  ? "text-primary border-primary bg-primary/5"
                  : "text-gray-500 hover:text-black/80"
                  }`}
              >
                <div className="flex flex-col items-center my-2">
                  <div className={`text-3xl p-4 bg-muted rounded-lg ${activeRole === role.id && "bg-primary/30"}`}>
                    {role.icon}
                  </div>
                  <span className="font-medium mt-3">{role.label}</span>
                  <span className="text-muted-foreground">{role.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* signup form */}
        <div className="text-start">
          {/* full name input */}
          <div className="mb-5">
            <label className="block text-md text-muted-foreground font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50"
            />
          </div>

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

          {/* confirm password input */}
          <div className="mb-10">
            <label className="block text-md text-muted-foreground font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            "Creating account..."
          ) : (
            <span className="flex items-center gap-2 justify-center text-xl">
              <AiOutlineUserAdd />
              Create an account
            </span>
          )}
        </Button>

        <span className="text-muted-foreground">Already have an account? <Link to="/login" className="text-primary">Sign in</Link></span>
      </form>
    </div>
  )
}

export default Signup