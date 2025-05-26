
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AppointmentBooking } from './AppointmentBooking';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export const AppointmentModal = ({ isOpen, onClose, property }: AppointmentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>Schedule Property Showing</DialogTitle>
        </DialogHeader>
        <AppointmentBooking property={property} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
