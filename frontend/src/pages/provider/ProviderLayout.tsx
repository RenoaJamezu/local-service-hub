import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

function ProviderLayout() {
  return (
    <>
      <Navbar />

      <div className="pt-24 md:pt-30 pb-10 px-4 md:px-10 w-full min-h-screen bg-secondary">
        <Outlet />
      </div>
    </>
  )
}

export default ProviderLayout