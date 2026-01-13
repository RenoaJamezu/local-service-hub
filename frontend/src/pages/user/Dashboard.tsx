import { HiOutlineSearch } from "react-icons/hi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useService } from "../../hooks/useService";
import { useEffect, useState } from "react";
import ServiceCard from "../../components/ui/ServiceCard";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { useBooking } from "../../hooks/useBooking";

type ServiceItem = {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  status: "active" | "inactive" | "deleted";
  provider: {
    _id: string;
    name: string;
    email: string
  };
  createdAt: string;
};

function Dashboard() {
  const { services, loading, fetchServices } = useService();
  const { createBooking } = useBooking();

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [requestModal, setRequestModal] = useState(false);

  const handleRequest = async (_id: string) => {
    await createBooking({
      serviceId: _id,
      message: "user didn't leave any message",
    })
    if (!loading) setRequestModal(false);
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="px-4 sm:px-6 md:px-10 caret-transparent">
      {/* header */}
      <div className="flex justify-between items-center mb-8 sm:mb-10">
        <div>
          <div className="flex gap-2 sm:gap-3 items-center text-primary mb-2 sm:mb-3">
            <HiOutlineSparkles className="text-2xl sm:text-3xl" />
            <h1 className="font-medium text-base sm:text-lg">Provider Dashboard</h1>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium mb-1 sm:mb-2">Find the Help You Need</h1>
          <p className="text-muted-foreground text-base sm:text-lg">Discover trusted service providers in you area</p>
        </div>
      </div>

      {/* search */}
      <div className="relative mb-6 sm:mb-8">
        <HiOutlineSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg sm:text-xl pointer-events-none" />
        <input
          type="text"
          placeholder="Search services, categories, or providers..."
          className="w-6/7 md:w-3/7 pl-10 sm:pl-12 px-3 sm:px-4 py-2 md:py-4 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50 text-md sm:text-lg transition bg-white"
        />
      </div>

      {/* services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {services.map((item) => (
          <ServiceCard
            key={item._id}
            service={item}
            onRequest={() => {
              setSelectedService(item);
              setRequestModal(true);
            }}
          />
        ))}
      </div>

      {/* confirm modal */}
      <ConfirmModal
        isOpen={requestModal}
        title="Request Service"
        message={`Request ${selectedService?.title} from ${selectedService?.provider.name}`}
        confirmText="Request"
        onCancel={() => setRequestModal(false)}
        onConfirm={() => {
          if (selectedService)
            handleRequest(selectedService?._id);
        }}
      />
    </main>
  )
}

export default Dashboard