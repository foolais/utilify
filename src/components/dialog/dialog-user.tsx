import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { auth } from "../../../auth";
import { User2 } from "lucide-react";
import { FormFieldInput } from "../form/form-field";

const DialogUser = async () => {
  const session = await auth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full">
          <User2 />
          Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>All information about the user</DialogDescription>
        </DialogHeader>
        <div className="mt-2 mb-4 grid w-full items-center gap-4">
          <FormFieldInput
            name="id"
            label="ID"
            value={session?.user?.id ?? ""}
            placeholder="ID"
            disabled
          />
          <FormFieldInput
            name="name"
            label="Name"
            value={session?.user?.name ?? ""}
            placeholder="Name"
            disabled
          />
          <FormFieldInput
            name="email"
            label="Email"
            value={session?.user?.email ?? ""}
            placeholder="Email"
            disabled
          />
          <FormFieldInput
            name="role"
            label="Role"
            value={session?.user?.role ?? ""}
            placeholder="Role"
            className="uppercase"
            disabled
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUser;
