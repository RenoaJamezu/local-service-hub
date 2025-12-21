import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import toast from "react-hot-toast";
import { useService } from "../../hooks/useService";

interface ServiceFormModalProps {
  service?: {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
  };
  isOpen: boolean;
  onClose: () => void;
};

export default function ServiceFormModal({ service, isOpen, onClose }: ServiceFormModalProps) {
  const { createService, updateService } = useService();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(service);

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setCategory(service.category);
      setPrice(String(service.price));
      setDescription(service.description);
    } else {
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
    };
  }, [service])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!title || !category || !price || !description) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    };

    try {
      if (isEdit) {
        if (!service?._id) return;

        await updateService(service?._id, {
          title,
          category,
          price: Number(price),
          description,
        })
        
        toast.success("Service Updated");
      } else {
        await createService({
          title,
          category,
          price: Number(price),
          description,
        })

        toast.success("Service Created");
      };
      
      handleClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    };
  };

  const handleClose = () => {
    onClose();
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex flex-col items-center justify-center z-50 shadow-elevated fade-zoom-in">
      <div className="rounded-lg">

        {/* header */}
        <div className="bg-white rounded-t-lg shadow-lg p-6 w-104 flex items-center justify-between">
          <h1 className="font-medium text-xl">{isEdit ? "Edit Service" : "Create New Service"}</h1>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="py-3"
          >
            <MdOutlineClose className="text-2xl text-muted-foreground" />
          </Button>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-lg shadow-lg p-6 w-104 flex flex-col"
        >
          {/* title input */}
          <div className="mb-5">
            <label className="block text-md font-medium mb-1">Service Title</label>
            <input
              type="text"
              value={title}
              placeholder="e.g.,Plumbing Repair"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50"
            />
          </div>

          {/* category input */}
          <div className="mb-5">
            <label className="block text-md font-medium mb-1">Category</label>
            <input
              type="text"
              value={category}
              placeholder="e.g.,Home Repair"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50"
            />
          </div>

          {/* price input */}
          <div className="mb-5">
            <label className="block text-md font-medium mb-1">Price (₱)</label>
            <input
              type="number"
              value={price}
              placeholder="500"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50"
            />
          </div>

          {/* price input */}
          <div className="mb-10">
            <label className="block text-md font-medium mb-1">Description</label>
            <textarea
              value={description}
              placeholder="Describe your service..."
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg focus:ring outline-2 outline-muted focus:outline-primary bg-muted/50"
            />
          </div>

          <div className="flex gap-3 w-full justify-between">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full"
            >
              {loading ? (isEdit ? "Saving..." : "Creating...") : (isEdit ? "Save Service" : "Create Service")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}