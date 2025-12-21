import { HiOutlineWrench } from "react-icons/hi2";
import Button from "./Button";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineEmail, MdOutlineMessage } from "react-icons/md";
import { useBooking } from "../../hooks/useBooking";

interface BookingCardProps {
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
    provider: string;
    status: "pending" | "accepted" | "rejected" | "cancelled";
    message: string;
    createdAt: string;
  };
  onAccept?: () => void;
  onReject?: () => void;
  showActions?: boolean;
};

export default function BookingCard({ booking, onAccept, onReject, showActions = true }: BookingCardProps) {
  const { loading } = useBooking();

  const formattedDate = new Date(booking.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const statusStyles = {
    pending: "bg-accent/10 text-accent border-accent",
    accepted: "bg-primary/10 text-primary border-primary",
    rejected: "bg-destructive/10 text-destructive border-destructive",
    cancelled: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground",
  };

  if (loading) return (
    <div className="outline outline-muted-foreground/50 bg-white rounded-lg p-5 flex flex-col h-72 animate-pulse fade-slide-in">
      <div className="flex gap-2 mb-3">
        <div className="bg-primary/25 rounded-lg p-2">
          <HiOutlineWrench className="text-3xl text-primary" />
        </div>
        <div className="flex flex-col w-full gap-1">
          <div className="w-3/5 h-6 bg-gray-300"></div>
          <div className="w-1/4 h-5 bg-gray-300"></div>
        </div>
      </div>

      <div className="w-3/5 h-4 bg-gray-300 mb-1"></div>
      <div className="w-3/5 h-4 bg-gray-300 mb-3"></div>

      <div className="bg-muted h-16">
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-5 flex flex-col h-72 shadow transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg fade-slide-in">
      {/* header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2">
          <div className="bg-primary/25 rounded-lg p-2">
            <HiOutlineWrench className="text-3xl text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-md font-medium line-clamp-1 mr-3">{booking.service.title}</span>
            <span className="text-sm text-muted-foreground">₱{booking.service.price}</span>
          </div>
        </div>
        <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium border ${statusStyles[booking.status]}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
          {capitalize(booking.status)}
        </span>
      </div>

      <span className="text-sm text-muted-foreground flex items-center gap-1">
        <AiOutlineUser />
        {booking.user.name}
      </span>
      <span className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
        <MdOutlineEmail />
        {booking.user.email}
      </span>

      {booking.message && (
        <div className="bg-muted rounded-lg p-2 mb-3">
          <span className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1">
            <MdOutlineMessage />
            {booking.message}
          </span>
        </div>
      )}

      <span className="text-xs text-muted-foreground mt-auto">
        Requested on {formattedDate}
      </span>

      {showActions && (
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <Button
            onClick={onAccept}
            className="w-full text-sm "
          >
            Accept
          </Button>
          <Button
            variant="destructive"
            onClick={onReject}
            className="w-full text-sm "
          >
            Reject
          </Button>
        </div>
      )}
    </div>
  )
}