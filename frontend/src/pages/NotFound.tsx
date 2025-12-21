import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"

function NotFound() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600">Page not found</p>

    <Button
      onClick={() => nav("/")}
    >
      Go Back Home
    </Button>
    </div>
  )
}

export default NotFound