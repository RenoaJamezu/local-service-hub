import { IoCalendarClearOutline } from "react-icons/io5";
import { useBooking } from "../../hooks/useBooking";
import { useEffect, useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import MyBookingCard from "../../components/ui/MyBookingCard";

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

function Requests() {
  const { stats, bookings, loading, refresh, cancelBooking } = useBooking();

  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [cancelModal, setCancelModal] = useState(false);

  const pastRequest = (stats?.total ?? 0) - (stats?.pending ?? 0);
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const pastBookings = bookings.filter((b) => b.status !== "pending");

  const handleCancel = async (_id: string) => {
    await cancelBooking(_id);
    if (!loading) setCancelModal(false);
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
            <IoCalendarClearOutline className="text-2xl sm:text-3xl" />
            <h1 className="font-medium text-base sm:text-lg">My Requests</h1>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium mb-1 sm:mb-2">Your Bookings</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Track and manage your service requests</p>
        </div>
      </div>

      {/* pending requests */}
      <div className="flex items-center mb-4 sm:mb-5 gap-2">
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent"></div>
        <h2 className="text-xl sm:text-2xl font-medium">Pending Requests ({stats?.pending})</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mb-5">
        {pendingBookings.map((item) => (
          <MyBookingCard
            key={item._id}
            booking={item}
            onCancel={() => {
              setSelectedBooking(item);
              setCancelModal(true);
            }}
          />
        ))}
      </div>

      {/* past requests */}
      <h2 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-5">Past Requests ({pastRequest})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mb-5">
        {pastBookings.map((item) => (
          <MyBookingCard
            key={item._id}
            booking={item}
            showActions={false}
            onCancel={() => {
              setSelectedBooking(item);
              setCancelModal(true);
            }}
          />
        ))}
      </div>

      {/* confirm modal */}
      <ConfirmModal
        isOpen={cancelModal}
        title="Cancel Request"
        message={`Cancel ${selectedBooking?.service.title} from ${selectedBooking?.provider.name}`}
        confirmText="Confirm"
        variant="destructive"
        onCancel={() => setCancelModal(false)}
        onConfirm={() => {
          if (selectedBooking)
            handleCancel(selectedBooking?._id);
        }}
      />
    </main>
  )
}

export default Requests