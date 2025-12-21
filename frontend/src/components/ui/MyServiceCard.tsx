import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Button from "./Button";
import { useService } from "../../hooks/useService";

interface MyServiceCardProps {
  service: {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    status: "active" | "inactive" | "deleted";
    provider: { _id: string; name: string; email: string; };
    createdAt: string;
  };
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function MyServiceCard({
  service,
  onToggle,
  onEdit,
  onDelete
}: MyServiceCardProps) {
  const { loading } = useService();

  if (loading) {
    return (
      <div className="flex flex-col min-h-36 sm:min-h-40 shadow rounded-lg p-4 sm:p-5 bg-white animate-pulse gap-3 fade-slide-in">
        <div className="h-8 sm:h-10 w-2/6 bg-gray-300"></div>
        <div className="h-6 sm:h-8 w-1/6 bg-gray-300"></div>
        <div className="h-6 sm:h-8 w-2/5 bg-gray-300"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-white rounded-lg p-4 sm:p-5 shadow transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg fade-slide-in ${service.status === "inactive" && "opacity-60"}`}>
      {/* top row */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <h2 className="text-lg sm:text-2xl font-medium">{service.title}</h2>
          <p className={`text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full font-medium ${service.status === "active" ? "bg-success/25 text-success" : "bg-destructive/25 text-destructive"}`}>
            {service.status}
          </p>
        </div>

        {/* actions */}
        <div className="flex justify-between sm:items-center gap-2 sm:gap-3 mb-3">
          <Button
            variant="outline"
            className="font-medium text-sm"
            onClick={onToggle}
          >
            {service.status === "active" ? "Deactivate" : "Activate"}
          </Button>
          <div className="flex sm:flex-row gap-2">
            <Button
              variant="outline"
              className="py-2 text-lg sm:text-xl"
              onClick={onEdit}
            >
              <MdOutlineEdit />
            </Button>
            <Button
              variant="destructive"
              className="py-2 text-lg sm:text-xl shadow-none text-black bg-white hover:bg-destructive/25"
              onClick={onDelete}
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </div>
      </div>

      {/* details */}
      <p className="text-muted-foreground mb-2 sm:mb-3 text-sm sm:text-base">{service.description}</p>
      <div className="flex items-center gap-3">
        <p className="text-primary font-medium">₱{service.price}</p>
        <p className="text-muted-foreground">{service.category}</p>
      </div>
    </div>
  )
}