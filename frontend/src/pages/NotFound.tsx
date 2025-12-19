import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-600">Page not found</p>

      <Link
        to="/"
        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
      >
        Go back home
      </Link>
    </div>
  )
}

export default NotFound