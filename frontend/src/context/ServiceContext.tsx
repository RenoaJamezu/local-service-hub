import { createContext, useCallback, useState } from "react";
import { useServiceApi } from "../api/useServiceApi";
import toast from "react-hot-toast";

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: "active" | "inactive" | "deleted";
  provider: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
};

interface ServiceContextType {
  services: Service[];
  loading: boolean;
  fetchServices: () => Promise<void>;
  createService: (data: {
    title: string;
    description: string;
    price: number;
    category: string;
  }) => Promise<void>;
  updateService: (
    _id: string,
    data: Partial<{
      title: string;
      description: string;
      price: number;
      category: string;
    }>
  ) => Promise<void>;
  toggleServiceStatus: (_id: string, status: "active" | "inactive") => Promise<void>;
  deleteService: (_id: string) => Promise<void>;
};

const ServiceContext = createContext<ServiceContextType | null>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const api = useServiceApi();

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getServices();
      setServices(data);
    } catch {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createService = async (data: {
    title: string;
    description: string;
    price: number;
    category: string;
  }) => {
    setLoading(true);
    try {
      await api.createService(data);
      toast.success("Service created");
    } catch {
      toast.error("Failed to create service");
    } finally {
      await fetchServices();
      setLoading(false);
    };
  };

  const updateService = async (
    id: string,
    data: Partial<{
      title: string;
      description: string;
      price: number;
      category: string;
    }>
  ) => {
    setLoading(true);
    try {
      await api.updateService(id, data);
      toast.success("Service updated");
    } catch {
      toast.error("Failed to update service");
    } finally {
      await fetchServices();
      setLoading(false);
    };
  };

  const toggleServiceStatus = async (
    id: string,
    status: "active" | "inactive"
  ) => {
    setLoading(true);
    try {
      await api.toggleStatus(id, status);
      toast.success(`Status updated to: ${status}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      await fetchServices();
      setLoading(false);
    };
  };

  const deleteService = async (id: string) => {
    setLoading(true);
    try {
      await api.deleteService(id);
      toast.success("Service deleted");
    } catch {
      toast.error("Failed to delete service")
    } finally {
      await fetchServices();
      setLoading(false);
    };
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        fetchServices,
        createService,
        updateService,
        toggleServiceStatus,
        deleteService,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export { ServiceContext };