import { IoCalendarClearOutline, IoFunnelOutline } from "react-icons/io5"
import { useBooking } from "../../hooks/useBooking";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
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

function Bookings() {
  const { stats, bookings, refresh, acceptBooking, rejectBooking } = useBooking();

  const [activeTab, setActiveTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
  const [acceptModal, setAcceptModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const acceptedBookings = bookings.filter((b) => b.status === "accepted");
  const rejectedBookings = bookings.filter((b) => b.status === "rejected");
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  useEffect(() => {
    refresh();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const statsTabs = [
    {
      id: "all",
      label: "All",
      count: stats?.total as number
    },
    {
      id: "pending",
      label: "Pending",
      count: stats?.pending as number
    },
    {
      id: "accepted",
      label: "Accepted",
      count: stats?.accepted as number
    },
    {
      id: "rejected",
      label: "Rejected",
      count: stats?.rejected as number
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: stats?.cancelled as number
    },
  ];

  const handleAccept = (_id: string) => {
    acceptBooking(_id);
    setAcceptModal(false);
  };
  const handleReject = (_id: string) => {
    rejectBooking(_id);
    setRejectModal(false);
  };

  return (
    <main className="px-4 sm:px-6 md:px-10">
      {/* header */}
      <div className="flex justify-between items-center mb-8 sm:mb-10">
        <div>
          <div className="flex gap-2 sm:gap-3 items-center text-primary mb-2 sm:mb-3">
            <IoCalendarClearOutline className="text-2xl sm:text-3xl" />
            <h1 className="font-medium text-base sm:text-lg">All Bookings</h1>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium mb-1 sm:mb-2">Booking History</h1>
          <p className="text-muted-foreground text-base sm:text-lg">View and manage all your booking requests</p>
        </div>
      </div>

      {/* filter */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 flex-wrap">
        <IoFunnelOutline className="text-lg sm:text-xl text-muted-foreground" />
        {statsTabs.map((item) => (
          <Button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            variant={activeTab === item.id ? "default" : "outline"}
            className="text-sm sm:text-base whitespace-nowrap"
          >
            {item.label} <span className="text-muted-foreground font-medium ml-1">({item.count})</span>
          </Button>
        ))}
      </div>

      {/* display bookings */}
      {activeTab === "all" && (
        <>
          {bookings.length === 0 ? (
            <div className="mt-16 sm:mt-20">
              <NoData
                icon={<IoCalendarClearOutline />}
                title="No booking requests"
                message="You haven't received any booking requests yet. They'll appear here when customers request your services."
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {bookings.map((item) => (
                <BookingCard
                  key={item._id}
                  booking={item}
                  onAccept={item.status === "pending" ? () => {
                    setSelectedBooking(item);
                    setAcceptModal(true);
                  } : undefined}
                  onReject={item.status === "pending" ? () => {
                    setSelectedBooking(item);
                    setRejectModal(true);
                  } : undefined}
                  showActions={item.status === "pending"}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "pending" && (
        <>
          {pendingBookings.length === 0 ? (
            <div className="mt-16 sm:mt-20">
              <NoData
                icon={<IoCalendarClearOutline />}
                title="No booking requests"
                message="You haven't received any booking requests yet. They'll appear here when customers request your services."
              />
            </div>
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
        </>
      )}

      {activeTab === "accepted" && (
        <>
          {acceptedBookings.length === 0 ? (
            <div className="mt-16 sm:mt-20">
              <NoData
                icon={<IoCalendarClearOutline />}
                title="No accepted bookings"
                message="You haven't accepted any booking requests yet. They'll appear here when you accepts a booking."
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {acceptedBookings.map((item) => (
                <BookingCard
                  key={item._id}
                  booking={item}
                  showActions={false}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "rejected" && (
        <>
          {rejectedBookings.length === 0 ? (
            <div className="mt-16 sm:mt-20">
              <NoData
                icon={<IoCalendarClearOutline />}
                title="No rejected bookings"
                message="You haven't rejected any booking requests yet. They'll appear here when you rejects a booking."
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {rejectedBookings.map((item) => (
                <BookingCard
                  key={item._id}
                  booking={item}
                  showActions={false}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === "cancelled" && (
        <>
          {cancelledBookings.length === 0 ? (
            <div className="mt-16 sm:mt-20">
              <NoData
                icon={<IoCalendarClearOutline />}
                title="No cancelled bookings"
                message="No user have cancelled any booking requests. They'll appear here if user cancelled their request."
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {cancelledBookings.map((item) => (
                <BookingCard
                  key={item._id}
                  booking={item}
                  showActions={false}
                />
              ))}
            </div>
          )}
        </>
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

export default Bookings