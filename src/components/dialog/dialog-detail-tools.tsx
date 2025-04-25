"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import FormCreateTools from "../form/form-create-tools";

const DialogDetailTools = ({
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
        <FormCreateTools onCloseDialog={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetailTools;
