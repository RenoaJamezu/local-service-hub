import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

function UserLayout() {
  return (
    <>
      <Navbar />

      <div className="md:pt-30 px-4 md:px-10 w-full min-h-screen">
        <Outlet />
      </div>
    </>
  )
}

export default UserLayout