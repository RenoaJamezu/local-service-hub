import { createContext, useState } from "react";
import api from "../api/axios";

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
  provider: string;
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
  fetchBookings: () => Promise<void>;
  fetchStats: () => Promise<void>;
  acceptBooking: (_id: string) => Promise<void>;
  rejectBooking: (_id: string) => Promise<void>;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/bookings/provider");
      setBookings(res.data);
    } finally {
      setLoading(false);
    };
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/bookings/provider/stats");
      setStats(res.data);
    } finally {
      setLoading(false);
    };
  };

  const acceptBooking = async (_id: string) => {
  setLoading(true);
  try {
    const res = await api.put(`/api/bookings/${_id}/status`, { status: "accepted" });
    const updated = res.data;
    setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    await fetchStats();
  } finally {
    setLoading(false);
  }
};

const rejectBooking = async (_id: string) => {
  setLoading(true);
  try {
    const res = await api.put(`/api/bookings/${_id}/status`, { status: "rejected" });
    const updated = res.data;
    setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    await fetchStats();
  } finally {
    setLoading(false);
  }
};

  return (
    <BookingContext.Provider
      value={{
        bookings,
        stats,
        loading,
        fetchBookings,
        fetchStats,
        acceptBooking,
        rejectBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export { BookingContext };