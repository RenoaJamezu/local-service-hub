import Button from "../../components/ui/Button";
import { MdAdd } from "react-icons/md";
import ServiceFormModal from "../../components/ui/ServiceFormModal";
import { useEffect, useState } from "react";
import { HiOutlineWrench } from "react-icons/hi2";
import MyServicesCard from "../../components/ui/MyServiceCard";
import { useService } from "../../hooks/useService";
import ConfirmModal from "../../components/ui/ConfirmModal";
import toast from "react-hot-toast";
import api from "../../api/axios";

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

function Services() {
  const { services, loading, fetchServices } = useService();

  const [serviceFormModal, setServiceFormModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleServiceStatus = async () => {
    try {
      const updateStatus = selectedService?.status === "active" ? "inactive" : "active";

      await api.put(`/api/services/${selectedService?._id}/update-status`, {
        status: updateStatus,
      });

      toast.success("Service status updated");
      setToggleModal(false);
      fetchServices();
    } catch (error) {
      toast.error("Failed to update service status");
      console.log(error);
    };
  };

  const handleDelete = async () => {
    try {
      await api.put(`/api/services/${selectedService?._id}/delete`);

      toast.success("Service deleted");
      setDeleteModal(false);
      fetchServices();
    } catch (error) {
      toast.error("Failed to delete service");
      console.log(error);
    };
  };

  return (
    <main>
      {/* header */}
      <div className="flex gap-3 items-center text-primary mb-3">
        <HiOutlineWrench className="text-3xl" />
        <span className="font-medium text-lg">All Services</span>
      </div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-medium mb-2">My Services</h1>
          <span className="text-muted-foreground text-xl">Manage your service offerings</span>
        </div>
        <div>
          <Button
            onClick={() => {
              setServiceFormModal(true);
              setSelectedService(null);
            }}
            className="flex items-center gap-2 font-medium"
          >
            <MdAdd className="text-2xl" />
            Add Service
          </Button>
        </div>
      </div>

      {/* provider services card */}
      <div className="space-y-5">
        {loading ? (
          <>
            {services.map(() => (
              <div className="flex flex-col h-36 shadow rounded-lg p-5 bg-white animate-pulse">
                <div className="h-10 w-2/6 bg-gray-300 mb-3"></div>
                <div className="h-8 w-1/6 bg-gray-300 mb-3"></div>
                <div className="h-8 w-2/7 bg-gray-300"></div>
              </div>
            ))}
          </>
        ) : (
          <>
            {services.length === 0 ? (
              <>
                <span>No services provided</span>
              </>
            ) : (
              <>
                {services.map((item) => (
                  <MyServicesCard
                    key={item._id}
                    service={item}
                    onToggle={() => {
                      setSelectedService(item);
                      setToggleModal(true);
                    }}
                    onEdit={() => {
                      setSelectedService(item);
                      setServiceFormModal(true);
                    }}
                    onDelete={() => {
                      setSelectedService(item);
                      setDeleteModal(true);
                    }}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* service form modal */}
      <ServiceFormModal
        service={selectedService ?? undefined}
        isOpen={serviceFormModal}
        onClose={() => {
          setServiceFormModal(false);
          setSelectedService(null);
        }}
      />

      {/* confirm modals */}
      <ConfirmModal
        isOpen={toggleModal}
        title="Update Status"
        message={`Are you sure you want to update the service status to ${selectedService?.status === "active" ? "inactive" : "active"}`}
        confirmText="Update"
        onCancel={() => setToggleModal(false)}
        onConfirm={toggleServiceStatus}
      />

      <ConfirmModal
        isOpen={deleteModal}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onCancel={() => setDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </main>
  )
}

export default Services