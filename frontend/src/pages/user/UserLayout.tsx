import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

function UserLayout() {
  return (
    <>
      <Navbar />

      <div className="pt-24 md:pt-30 pb-10 w-full min-h-screen bg-secondary">
        <Outlet />
      </div>
    </>
  )
}

export default UserLayout