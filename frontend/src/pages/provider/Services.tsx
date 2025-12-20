import Button from "../../components/ui/Button";
import { MdAdd } from "react-icons/md";
import ServiceForm from "../../components/ui/ServiceForm";
import { useEffect, useState } from "react";
import { HiOutlineWrench } from "react-icons/hi2";
import MyServicesCard from "../../components/ui/MyServiceCard";
import { useService } from "../../hooks/useService";

function Services() {
  const { services, fetchServices } = useService();

  useEffect(() => {
    fetchServices();
  }, [])

  const [serviceForm, setServiceForm] = useState(false);
  return (
    <main className="mb-10">
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
            onClick={() => setServiceForm(true)}
            className="flex items-center gap-2 font-medium"
          >
            <MdAdd className="text-2xl" />
            Add Service
          </Button>
        </div>
      </div>

      {/* provider services */}
      <div className="space-y-5">
        {services.map((item) => (
          <MyServicesCard key={item._id} service={item} />
        ))}
      </div>

      {/* service form */}
      <ServiceForm
        isOpen={serviceForm}
        onClose={() => setServiceForm(false)}
      />
    </main>
  )
}

export default Services