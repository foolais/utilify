import FormDetailLoans from "@/components/form/loans/form-detail-loans";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DialogDetailLoans = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Detail tools</DialogTitle>
          <DialogDescription>Below is the detail tools.</DialogDescription>
        </DialogHeader>
        <FormDetailLoans />
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetailLoans;
