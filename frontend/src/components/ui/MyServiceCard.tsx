import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Button from "./Button";
import api from "../../api/axios";
import { useService } from "../../hooks/useService";
import toast from "react-hot-toast";

interface MyServiceCardProps {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: "active" | "inactive" | "deleted";
  provider: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
};

export default function MyServiceCard({ service }: { service: MyServiceCardProps; onEdit?: () => void }) {
  const { fetchServices } = useService();

  const toggleServiceStatus = async () => {
    try {
      const updateStatus = service.status === "active" ? "inactive" : "active";

      await api.put(`/api/services/${service._id}/update-status`, {
        status: updateStatus,
      });

      toast.success("Service status updated");
      fetchServices();
    } catch (error) {
      toast.error("Failed to update service status");
      console.log(error);
    };
  };

  return (
    <div className={`flex flex-col shadow rounded-lg p-5 bg-white ${service.status === "inactive" && "opacity-50"}`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl font-medium">{service.title}</h2>
          <span className={`text-sm px-4 py-1 rounded-full font-medium ${service.status === "active" ? "bg-success/25 text-success" : "bg-destructive/25 text-destructive"}`}>{service.status}</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="font-medium text-sm"
            onClick={toggleServiceStatus}
          >
            {service.status === "active" ? "Deactivate" : "Activate"}
          </Button>
          <div>
            <Button
              variant="ghost"
              className="py-3 text-xl"
            >
              <MdOutlineEdit />
            </Button>
            <Button
              variant="destructive"
              className="py-3 text-xl"
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </div>
      </div>
      <span className="text-muted-foreground mb-3">{service.description}</span>
      <div className="flex items-center gap-3">
        <span className="text-primary font-medium">₱{service.price}</span>
        <span className="text-muted-foreground">{service.category}</span>
      </div>
    </div>
  )
}