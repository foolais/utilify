import { auth } from "../../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const UserAvatar = async () => {
  const session = await auth();

  return (
    <div className="flex-center gap-2">
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
  );
};

export default UserAvatar;
