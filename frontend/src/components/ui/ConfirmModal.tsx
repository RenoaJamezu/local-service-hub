import Button from "./Button";

type buttonVariant = "default" | "outline" | "active" | "destructive" | "ghost";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  variant?: buttonVariant;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 fade-zoom-in">
        <h2 className="text-lg sm:text-xl font-medium mb-2">{title}</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">{message}</p>

        <div className="flex justify-end gap-2 sm:gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={variant}
            className="w-full sm:w-auto"
          >
            {loading ? "Please wait..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}