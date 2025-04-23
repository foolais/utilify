"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/history",
    label: "History",
  },
];

const UserNav = () => {
  const pathname = usePathname();
  return (
    <div className="flex-center h-5 space-x-8">
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <div key={href} className="flex-center">
            <Link
              href={isActive ? "#" : href}
              className={cn(
                isActive ? "text-primary" : "text-muted-foreground",
                "text-lg font-medium",
              )}
            >
              {label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default UserNav;
