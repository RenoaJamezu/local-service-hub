import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"

function ProviderLayout() {
  return (
    <>
      <Navbar />

      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <Outlet />
      </div>
    </>
  )
}

export default ProviderLayout