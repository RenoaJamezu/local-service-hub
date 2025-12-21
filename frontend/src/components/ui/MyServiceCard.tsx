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
    provider: {
      _id: string;
      name: string;
      email: string;
    };
    createdAt: string;
  };
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function MyServiceCard({ service, onToggle, onEdit, onDelete }: MyServiceCardProps) {
  const { loading } = useService();

  if (loading) return (
    <div className="flex flex-col h-36 shadow rounded-lg p-5 bg-white animate-pulse gap-3 fade-slide-in">
      <div className="h-10 w-2/6 bg-gray-300"></div>
      <div className="h-8 w-1/6 bg-gray-300"></div>
      <div className="h-8 w-2/7 bg-gray-300"></div>
    </div>
  );

  return (
    <div className={`flex flex-col h-36 bg-white rounded-lg p-5  shadow transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg fade-slide-in ${service.status === "inactive" && "opacity-50"}`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl font-medium">{service.title}</h2>
          <p className={`text-sm px-4 py-1 rounded-full font-medium ${service.status === "active" ? "bg-success/25 text-success" : "bg-destructive/25 text-destructive"}`}>{service.status}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="font-medium text-sm"
            onClick={onToggle}
          >
            {service.status === "active" ? "Deactivate" : "Activate"}
          </Button>
          <div>
            <Button
              variant="outline"
              className="py-3 text-xl"
              onClick={onEdit}
            >
              <MdOutlineEdit />
            </Button>
            <Button
              variant="destructive"
              className="py-3 text-xl shadow-none text-black bg-white hover:bg-destructive/25"
              onClick={onDelete}
            >
              <MdDeleteOutline />
            </Button>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-3">{service.description}</p>
      <div className="flex items-center gap-3">
        <p className="text-primary font-medium">₱{service.price}</p>
        <p className="text-muted-foreground">{service.category}</p>
      </div>
    </div>
  )
}