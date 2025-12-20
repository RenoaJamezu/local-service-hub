import { createContext, useState } from "react";
import api from "../api/axios";

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
};

const ServiceContext = createContext<ServiceContextType | null>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/services");
      setServices(res.data);
    } finally {
      setLoading(false);
    };
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        fetchServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export { ServiceContext };