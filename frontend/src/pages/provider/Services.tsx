import Button from "../../components/ui/Button";
import { MdAdd } from "react-icons/md";
import ServiceFormModal from "../../components/ui/ServiceFormModal";
import { useEffect, useState } from "react";
import { HiOutlineWrench } from "react-icons/hi2";
import MyServicesCard from "../../components/ui/MyServiceCard";
import { useService } from "../../hooks/useService";
import ConfirmModal from "../../components/ui/ConfirmModal";
import NoData from "../../components/ui/NoData";

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
  const { services, fetchServices, toggleServiceStatus, deleteService } = useService();

  const [serviceFormModal, setServiceFormModal] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleStatus = async () => {
    if (!selectedService) return;
    const updateStatus = selectedService?.status === "active" ? "inactive" : "active";

    await toggleServiceStatus(selectedService?._id, updateStatus);
    setToggleModal(false);
  };

  const handleDelete = async () => {
    if (!selectedService) return;

    await deleteService(selectedService._id);
    setDeleteModal(false);
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      {/* header */}
      <div className="flex gap-3 items-center text-primary mb-3">
        <HiOutlineWrench className="text-3xl" />
        <h1 className="font-medium text-lg">All Services</h1>
      </div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-medium mb-2">My Services</h1>
          <p className="text-muted-foreground text-xl">Manage your service offerings</p>
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
        {services.length === 0 ? (
          <div className="flex flex-col items-center h-full">
            <NoData
              icon={<HiOutlineWrench />}
              title="No services yet"
              message="Create your first service to start receiving bookings."
            />
            <Button
              onClick={() => {
                setServiceFormModal(true);
                setSelectedService(null);
              }}
              className="font-medium"
            >
              Create Service
            </Button>
          </div>
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
        onConfirm={handleToggleStatus}
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