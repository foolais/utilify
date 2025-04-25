"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import FormUpdateTools from "../form/tools/form-update-tools";

const DialogUpdateTools = ({
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
        <FormUpdateTools onCloseDialog={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateTools;
