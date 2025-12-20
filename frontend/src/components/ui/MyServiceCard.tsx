import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Button from "./Button";

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
  return (
    <div className={`flex flex-col h-36 shadow rounded-lg p-5 bg-white ${service.status === "inactive" && "opacity-50"}`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-2xl font-medium">{service.title}</h2>
          <span className={`text-sm px-4 py-1 rounded-full font-medium ${service.status === "active" ? "bg-success/25 text-success" : "bg-destructive/25 text-destructive"}`}>{service.status}</span>
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
              variant="ghost"
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
      <span className="text-muted-foreground mb-3">{service.description}</span>
      <div className="flex items-center gap-3">
        <span className="text-primary font-medium">₱{service.price}</span>
        <span className="text-muted-foreground">{service.category}</span>
      </div>
    </div>
  )
}