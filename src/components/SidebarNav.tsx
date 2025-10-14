"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Wallet, PiggyBank, TrendingUp } from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ElementType;
  }[];
  onLinkClick?: () => void;
}

export function SidebarNav({ className, items, onLinkClick, ...props }: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "w-full justify-start"
            )
          }
          onClick={onLinkClick}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}