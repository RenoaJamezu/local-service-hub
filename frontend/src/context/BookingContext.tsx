import { createContext, useCallback, useState } from "react";
import { useBookingApi } from "../api/useBookingApi";
import toast from "react-hot-toast";

interface Booking {
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

interface Stats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  cancelled: number;
};

interface BookingContextType {
  bookings: Booking[];
  stats: Stats | null;
  loading: boolean;
  refresh: () => Promise<void>;
  acceptBooking: (_id: string) => Promise<void>;
  rejectBooking: (_id: string) => Promise<void>;
  cancelBooking: (_id: string) => Promise<void>;
  createBooking: (data: {
    serviceId: string,
    message: string,
  }) => Promise<void>;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  const api = useBookingApi();

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [bookingRes, statsRes] = await Promise.all([
        api.getBookings(),
        api.getStats(),
      ]);

      setBookings(bookingRes);
      setStats(statsRes);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    };
  }, [api]);

  const acceptBooking = async (id: string) => {
    setLoading(true);
    try {
      await api.acceptBooking(id);
      toast.success("Booking accepted");
    } catch {
      toast.error("Failed to accept");
    } finally {
      await refresh();
      setLoading(false);
    };
  };

  const rejectBooking = async (id: string) => {
    setLoading(true);
    try {
      await api.rejectBooking(id);
      toast.success("Booking rejected");
    } catch {
      toast.error("Failed to reject");
    } finally {
      await refresh();
      setLoading(false);
    };
  };

  const cancelBooking = async (id: string) => {
    setLoading(true);
    try {
      await api.cancelBooking(id);
      toast.success("Booking cancelled");
    } catch {
      toast.error("Failed to cancel");
    } finally {
      await refresh();
      setLoading(false);
    };
  };

  const createBooking = async (data: {
    serviceId: string;
    message: string;
  }) => {
    setLoading(true);
    try {
      await api.createBooking(data);
      toast.success("Booking requested succesfully");
    } catch {
      toast.error("Failed to request service");
    } finally {
      await refresh();
      setLoading(false);
    };
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        stats,
        loading,
        refresh,
        acceptBooking,
        rejectBooking,
        cancelBooking,
        createBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export { BookingContext };