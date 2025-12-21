import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineWrench } from "react-icons/hi2";
import Button from "./Button";

interface ServiceCardProps {
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
      email: string
    };
    createdAt: string;
  };
  onRequest: () => void;
}

export default function ServiceCard({
  service,
  onRequest,
}: ServiceCardProps) {
  return (
        <div className="bg-white rounded-lg p-4 sm:p-5 flex flex-col min-h-64 sm:min-h-72 shadow transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg fade-slide-in">
          <div className="flex items-center justify-between mb-1 md:mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/25 rounded-lg p-2">
                <HiOutlineWrench className="text-xl sm:text-2xl text-primary" />
              </div>
              <p className="text-muted-foreground bg-muted px-3 py-1 rounded-full text-xs font-medium">{service.category}</p>
            </div>
            <h1 className="text-xl font-medium text-primary">₱{service.price}</h1>
          </div>
          <h1 className="text-xl font-medium mb-2 md:mb-3 line-clamp-1">{service.title}</h1>
          <p className="text-muted-foreground text-sm line-clamp-2">{service.description}</p>
          <div className="border-b w-full border-muted-foreground/25 mb-2 md:mb-3 mt-auto" />
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <div className="p-2 rounded-full bg-muted">
              <AiOutlineUser className="text-muted-foreground text-xl" />
            </div>
            <p className="text-muted-foreground">by <span className="text-black">{service.provider.name}</span></p>
          </div>
          <Button
            onClick={onRequest}
          >
            Request Service
          </Button>
        </div>
  )
}