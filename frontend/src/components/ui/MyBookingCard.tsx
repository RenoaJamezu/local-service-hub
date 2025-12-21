import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineWrench } from "react-icons/hi2";
import { MdOutlineMessage } from "react-icons/md";
import Button from "./Button";

interface MyBookingCardProps {
  booking: {
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    service: {
      _id: string;
      title: string;
      price: number;
    };
    provider: {
      _id: string;
      name: string;
      email: string;
    };
    status: "pending" | "accepted" | "rejected" | "cancelled";
    message: string;
    createdAt: string;
  };
  onCancel?: () => void;
  showActions?: boolean;
};

export default function MyBookingCard({
  booking,
  onCancel,
  showActions = true
}: MyBookingCardProps) {
  const formattedDate = new Date(booking.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const statusStyles = {
    pending: "bg-accent/10 text-accent border-accent",
    accepted: "bg-primary/10 text-primary border-primary",
    rejected: "bg-destructive/10 text-destructive border-destructive",
    cancelled: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground",
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-5 flex flex-col min-h-60 sm:min-h-58 shadow transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg fade-slide-in">
      {/* header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2">
          <div className="bg-primary/25 rounded-lg p-2">
            <HiOutlineWrench className="text-2xl sm:text-3xl text-primary" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-sm sm:text-md font-medium line-clamp-1 mr-3">{booking.service.title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">₱{booking.service.price}</p>
          </div>
        </div>
        <p className={`flex items-center gap-1 text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full font-medium border ${statusStyles[booking.status]}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          {capitalize(booking.status)}
        </p>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mb-2">
        <AiOutlineUser />
        Provider: {booking.provider.name}
      </p>

      <div className="flex bg-muted rounded-lg p-2 h-10 items-center">
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 flex items-center gap-1">
          <MdOutlineMessage />
          {booking.message}
        </p>
      </div>

      <p className="text-[11px] sm:text-xs text-muted-foreground mt-auto">
        Requested on {formattedDate}
      </p>

      {showActions && (
        <div className="flex gap-3 mt-3">
          <Button
            variant="destructive"
            onClick={onCancel}
            className="w-full text-sm"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}