import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';

interface FormSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export default function FormSuccessModal({
  isOpen,
  onClose,
  title,
  message,
}: FormSuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-background border-2 border-dashed border-accent rounded-lg p-6 md:p-8 max-w-md w-full shadow-2xl shadow-accent/20 animate-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={48} className="text-accent animate-bounce" />
        </div>

        {/* Content */}
        <h2 className="text-center text-xl md:text-2xl font-bold uppercase tracking-wider mb-3">
          {title}
        </h2>
        <p className="text-center text-sm md:text-base text-muted-foreground mb-6">
          {message}
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="btn-primary w-full text-center py-2"
        >
          Close
        </button>

        {/* Auto-close info */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          This will close automatically in 4 seconds
        </p>
      </div>
    </div>
  );
}
