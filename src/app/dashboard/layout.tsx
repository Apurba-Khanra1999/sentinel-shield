import type { Metadata } from "next";
import { MainSidebar } from "@/components/main-sidebar";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sentinel Shield Dashboard",
  description: "Your personal security dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar 
        collapsible="icon" 
        className="border-r border-border/50 shadow-sm bg-gradient-to-b from-background to-background/95"
      >
        <MainSidebar />
      </Sidebar>
      <SidebarInset>
        <header className={cn(
          "flex h-16 shrink-0 items-center gap-3 px-6 border-b border-border/50 bg-gradient-to-r from-background/95 to-background backdrop-blur-sm",
          "sticky top-0 z-40 shadow-sm"
        )}>
          <SidebarTrigger className={cn(
            "-ml-1 h-8 w-8 rounded-lg transition-all duration-200 hover:bg-muted/50 hover:scale-105",
            "border border-border/30 shadow-sm hover:shadow-md"
          )} />
          <div className="h-6 w-px bg-border/50" />
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Dashboard Active</span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-background via-background/98 to-muted/20">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
