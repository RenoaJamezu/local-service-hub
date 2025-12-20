import { MdOutlineDashboard } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth"
import { HiOutlineClock, HiOutlineWrench } from "react-icons/hi2";
import { IoCheckmarkCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import Button from "../../components/ui/Button";

function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { id: "pending", label: "Pending", total: 2, icon: <HiOutlineClock />, color: "accent" },
    { id: "accepted", label: "Accepted", total: 1, icon: <IoCheckmarkCircleOutline />, color: "success" },
    { id: "rejected", label: "Rejected", total: 1, icon: <IoCloseCircleOutline />, color: "destructive" },
  ];

  const services = [
    { id: 1, label: "Plumbing Repair", price: 500, name: "Maria Santos", email: "maria@example.com", message: "I have a leaky faucet in my kitchen that needs urgent repair.", status: "pending", date: "Dec 19" },
    { id: 2, label: "Plumbing Repair", price: 500, name: "Jose Reyes", email: "jose@example.com", message: "Bathroom sink is clogged.", status: "pending", date: "Dec 19" },
  ];

  return (
    <main className="mb-10">
      {/* header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <div className="flex gap-3 items-center text-primary mb-3">
            <MdOutlineDashboard className="text-3xl" />
            <span className="font-medium text-lg">Provider Dashboard</span>
          </div>
          <h1 className="text-3xl font-medium mb-2">Welcome back, {user?.name}</h1>
          <span className="text-muted-foreground text-xl">Manage your incoming requests</span>
        </div>
      </div>

      {/* stats */}
      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        {stats.map((stat) => (
          <div className={`flex items-center gap-3 px-3 py-4 border rounded-lg shadow bg-${stat.color}/5 border-${stat.color}/20`}>
            <span className={`text-4xl rounded-lg p-2 text-${stat.color} bg-${stat.color}/25`}>{stat.icon}</span>
            <div className="flex flex-col font-medium">
              <span className="text-2xl">{stat.total}</span>
              <span className="text-xl text-muted-foreground">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* pending requests */}
      <h2 className="text-2xl font-medium mb-3">Pending Requests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {services.map((service) => (
          <div className="border rounded-lg p-5 flex flex-col">
            <div className="flex gap-3 items-center mb-3">
              <div className="bg-primary/25 rounded-lg p-2">
                <HiOutlineWrench className="text-3xl text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-medium">{service.label}</span>
                <span className="text-muted-foreground">₱{service.price}</span>
              </div>
            </div>

            <span className="text-muted-foreground">{service.name}</span>
            <span className="text-muted-foreground mb-3">{service.email}</span>

            <div className="bg-muted rounded-lg p-3 mb-3">
              <span className="text-muted-foreground">{service.message}</span>
            </div>

            <span className="text-muted-foreground mb-3">Requested on {service.date}</span>

            <div className="grid sm:grid-cols-2 gap-3">
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/50 w-full text-white font-medium"
              >
                Accept
              </Button>
              <Button
                variant="destructive"
                className="w-full text-white font-medium"
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Dashboard