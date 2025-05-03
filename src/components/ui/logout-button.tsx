"use client";

import { Button } from "./button";
import { LogOutIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { useRouter } from "next/navigation";
import { logoutCredentials } from "@/lib/actions/actions-auth";

const LogoutButton = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <LogOutIcon color="red" />
          <span className={isCollapsed ? "hidden" : ""}>Logout</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent aria-description="logout" aria-describedby="logout">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => logoutCredentials().then(() => router.push("/auth"))}
            className="bg-destructive"
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutButton;
