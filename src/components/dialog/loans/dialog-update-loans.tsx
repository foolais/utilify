import FormUpdateLoans from "@/components/form/loans/form-update-loans";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DialogUpdateLoans = ({
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
          <DialogTitle>Update tools</DialogTitle>
          <DialogDescription>
            Make changes to your tools here.
          </DialogDescription>
        </DialogHeader>
        <FormUpdateLoans onCloseDialog={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateLoans;
