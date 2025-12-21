import api from "./axios"

export function useBookingApi() {
  const getBookings = async () => {
    const res = await api.get("/api/bookings/provider");
    return res.data;
  };

  const getStats = async () => {
    const res = await api.get("/api/bookings/provider/stats");
    return res.data;
  };

  const acceptBooking = async (id: string) => {
    const res = await api.put(`/api/bookings/${id}/status`, { status: "accepted" });
    return res.data;
  };

  const rejectBooking = async (id: string) => {
    const res = await api.put(`/api/bookings/${id}/status`, { status: "rejected" });
    return res.data;
  };

  return {
    getBookings,
    getStats,
    acceptBooking,
    rejectBooking,
  };
}