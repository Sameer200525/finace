"use client";

import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon, LayoutDashboard, Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { SidebarNav } from "./SidebarNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { MadeWithDyad } from "./made-with-dyad";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Income",
    href: "/income",
    icon: Wallet,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: PiggyBank,
  },
  {
    title: "Investments",
    href: "/investments",
    icon: TrendingUp,
  },
];

export function Layout() {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (href: string) => {
    if (isMobile) {
      setIsSheetOpen(false);
    }
    navigate(href);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 w-full border-b bg-background p-4 flex items-center justify-between shadow-sm">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <h2 className="text-lg font-semibold mb-4">Finance Tracker</h2>
              <SidebarNav items={sidebarNavItems} onLinkClick={() => setIsSheetOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-xl font-bold">Finance Tracker</h1>
          <div></div> {/* Placeholder for potential right-side elements */}
        </header>
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
        <MadeWithDyad />
      </div>
    );
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen items-stretch"
    >
      <ResizablePanel defaultSize={15} minSize={10} maxSize={20}>
        <div className="flex h-full flex-col p-4 border-r bg-sidebar text-sidebar-foreground">
          <h2 className="text-2xl font-bold mb-6 text-sidebar-primary">Finance Tracker</h2>
          <SidebarNav items={sidebarNavItems} onLinkClick={() => {}} />
          <div className="mt-auto">
            <MadeWithDyad />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={85}>
        <div className="flex flex-col h-full">
          <header className="sticky top-0 z-40 w-full border-b bg-background p-4 shadow-sm">
            <h1 className="text-2xl font-bold">
              {sidebarNavItems.find(item => location.pathname.startsWith(item.href))?.title || "Dashboard"}
            </h1>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}