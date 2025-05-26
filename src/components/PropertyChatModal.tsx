
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PropertyChatBot } from './PropertyChatBot';

interface PropertyChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: any;
}

export const PropertyChatModal = ({ isOpen, onClose, property }: PropertyChatModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 flex flex-col">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Chat about {property.title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <PropertyChatBot property={property} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
