import { MdOutlineDashboard } from "react-icons/md";
import { useAuth } from "../../hooks/useAuth"
import { HiOutlineClock } from "react-icons/hi2";
import { IoCalendarClearOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoStopCircleOutline } from "react-icons/io5";
import { useBooking } from "../../hooks/useBooking";
import { useEffect, useState } from "react";
import StatsCard from "../../components/ui/StatsCard";
import BookingCard from "../../components/ui/BookingCard";
import ConfirmModal from "../../components/ui/ConfirmModal";
import NoData from "../../components/ui/NoData";

type BookingItem = {
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

function Dashboard() {
  const { user } = useAuth();
  const { stats, bookings, loading, refresh, acceptBooking, rejectBooking } = useBooking();

  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [acceptModal, setAcceptModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const pendingBookings = bookings.filter((b) => b.status === "pending");

  const statsData = [
    {
      label: "Pending",
      count: stats?.pending as number,
      color: "accent" as const,
      icon: <HiOutlineClock />
    },
    {
      label: "Accepted",
      count: stats?.accepted as number,
      color: "primary" as const,
      icon: <IoCheckmarkCircleOutline />
    },
    {
      label: "Rejected",
      count: stats?.rejected as number,
      color: "destructive" as const,
      icon: <IoCloseCircleOutline />
    },
    {
      label: "Cancelled",
      count: stats?.cancelled as number,
      color: "muted-foreground" as const,
      icon: <IoStopCircleOutline />
    },
  ];

  const handleAccept = async (_id: string) => {
    await acceptBooking(_id);
    if (!loading) setAcceptModal(false);
  };

  const handleReject = async (_id: string) => {
    await rejectBooking(_id);
    if (!loading) setRejectModal(false);
  };

  useEffect(() => {
    refresh();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <main className="px-4 sm:px-6 md:px-10">
      {/* header */}
      <div className="flex justify-between items-center mb-8 sm:mb-10">
        <div>
          <div className="flex gap-2 sm:gap-3 items-center text-primary mb-2 sm:mb-3">
            <MdOutlineDashboard className="text-2xl sm:text-3xl" />
            <h1 className="font-medium text-base sm:text-lg">Provider Dashboard</h1>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium mb-1 sm:mb-2">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Manage your incoming requests</p>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 sm:mb-10">
        {statsData.map((item) => (
          <StatsCard
            key={item.label}
            icon={item.icon}
            count={item.count}
            label={item.label}
            color={item.color}
          />
        ))}
      </div>

      {/* pending requests */}
      <div className="flex items-center mb-4 sm:mb-5 gap-2">
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent"></div>
        <h2 className="text-xl sm:text-2xl font-medium">Pending Requests</h2>
      </div>
      {pendingBookings.length === 0 ? (
        <NoData
          icon={<IoCalendarClearOutline />}
          title="No booking requests"
          message="You haven't received any booking requests yet. They'll appear here when customers request your services."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {pendingBookings.map((item) => (
            <BookingCard
              key={item._id}
              booking={item}
              onAccept={() => {
                setSelectedBooking(item);
                setAcceptModal(true);
              }}
              onReject={() => {
                setSelectedBooking(item);
                setRejectModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* confirm modals */}
      <ConfirmModal
        isOpen={acceptModal}
        title="Accept Booking"
        message={`Are you sure you want to accept ${selectedBooking?.service.title} from ${selectedBooking?.user.name}?`}
        confirmText="Accept"
        onCancel={() => setAcceptModal(false)}
        onConfirm={() => {
          if (selectedBooking)
            handleAccept(selectedBooking?._id);
        }}
      />
      <ConfirmModal
        isOpen={rejectModal}
        title="Reject Booking"
        message={`Are you sure you want to reject ${selectedBooking?.service.title} from ${selectedBooking?.user.name}?`}
        confirmText="Reject"
        variant="destructive"
        onCancel={() => setRejectModal(false)}
        onConfirm={() => {
          if (selectedBooking)
            handleReject(selectedBooking?._id);
        }}
      />
    </main>
  )
}

export default Dashboard