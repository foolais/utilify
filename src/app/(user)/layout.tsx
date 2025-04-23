import Title from "@/components/ui/title";
import UserNav from "@/components/ui/user-nav";
import UserAvatar from "@/components/ui/user-avatar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-screen bg-slate-200 p-8">
      <div className="flex items-center justify-between">
        <Title size="lg" />
        <UserNav />
        <UserAvatar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserLayout;
