import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { headers } from "next/headers";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Separator } from "./separator";
import LogoutButton from "./logout-button";

const UserAvatar = async () => {
  const session = await auth();

  const headersList = await headers();
  const pathname = headersList.get("x-url") || "";

  if (!session) return redirect("/auth");
  if (pathname.includes("/admin") && session.user?.role !== "admin") {
    return redirect("/dashboard");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex-center cursor-pointer gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="hidden flex-col sm:flex">
            <p className="text-sm font-semibold text-gray-600">
              {session?.user?.email}
            </p>
            <p className="text-xs font-semibold text-slate-400 capitalize md:text-sm">
              {session?.user?.role}
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-max">
        <Separator className="my-2" />
        <LogoutButton isCollapsed={false} />
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
