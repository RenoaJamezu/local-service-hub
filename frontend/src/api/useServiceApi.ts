import api from "./axios"

export function useServiceApi() {
  const getServices = async () => {
    const res = await api.get("/api/services");
    return res.data;
  };

  const createService = async (payload: {
    title: string;
    description: string;
    price: number;
    category: string;
  }) => {
    const res = await api.post("/api/services", payload);
    return res.data;
  };

  const updateService = async (
    id: string,
    payload: Partial<{
      title: string;
      description: string;
      price: number;
      category: string;
    }>
  ) => {
    const res = await api.put(`/api/services/${id}/update-details`, payload);
    return res.data;
  };

  const toggleStatus = async (
    id: string,
    status: "active" | "inactive"
  ) => {
    const res = await api.put(`/api/services/${id}/update-status`, { status });
    return res.data;
  };

  const deleteService = async (id: string) => {
    const res = await api.put(`/api/services/${id}/update-status`, { status: "deleted" });
    return res.data;
  };

  return {
    getServices,
    createService,
    updateService,
    toggleStatus,
    deleteService,
  };
}