import AdminPathname from "@/components/ui/admin-pathname";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserAvatar from "@/components/ui/user-avatar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full py-4 pr-4 pl-4 md:pl-0">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex-center">
              <SidebarTrigger />
              <AdminPathname />
            </div>
            <UserAvatar />
          </div>
          <div className="px-2">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
