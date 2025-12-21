import api from "./axios"

export function useBookingApi() {
  const getBookings = async () => {
    const res = await api.get("/api/bookings");
    return res.data;
  };

  const getStats = async () => {
    const res = await api.get("/api/bookings/stats");
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

  const cancelBooking = async (id: string) => {
    const res = await api.put(`/api/bookings/${id}/cancel`, { status: "cancelled" });
    return res.data;
  }

  const createBooking = async (
    payload: {
      serviceId: string,
      message: string,
    }) => {
    const res = await api.post("/api/bookings", payload);
    return res.data;
  }

  return {
    getBookings,
    getStats,
    acceptBooking,
    rejectBooking,
    cancelBooking,
    createBooking,
  };
}