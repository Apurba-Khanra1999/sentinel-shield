"use client";

import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  KeyRound,
  NotebookText,
  ShoppingCart,
  User,
  Shield,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/passwords", label: "Password Vault", icon: KeyRound },
  { href: "/dashboard/notes", label: "Notes", icon: NotebookText },
  {
    href: "/dashboard/shopping-lists",
    label: "Shopping Lists",
    icon: ShoppingCart,
  },

];

export function MainSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      <SidebarHeader className={cn(
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "px-1 py-3" : "px-6 py-6"
      )}>
        <Link 
          href="/dashboard" 
          className={cn(
            "flex items-center transition-all duration-300 ease-in-out rounded-lg hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 group",
            isCollapsed ? "justify-center gap-0 p-1.5" : "gap-3 p-2"
          )}
        >
          <div className={cn(
            "flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105",
            isCollapsed ? "w-8 h-8" : "w-10 h-10"
          )}>
            <Shield 
              size={isCollapsed ? 22 : 20} 
              className="drop-shadow-sm transition-all duration-300 ease-in-out" 
            />
          </div>
          {!isCollapsed && (
            <h1 className="font-headline text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Sentinel Shield
            </h1>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className={cn(
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "px-2 py-2" : "px-4 py-2"
      )}>
        <SidebarMenu className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  className={cn(
                    "h-11 transition-all duration-300 ease-in-out group relative overflow-hidden",
                    isCollapsed ? "px-2" : "px-3",
                    isActive 
                      ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-r-2 border-primary shadow-sm" 
                      : "hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/20 hover:shadow-sm"
                  )}
                >
                  <Link href={item.href} className={cn(
                    "flex items-center transition-all duration-300 ease-in-out",
                    isCollapsed ? "justify-center gap-0" : "gap-3"
                  )}>
                    <div className={cn(
                      "flex items-center justify-center rounded-md transition-all duration-300 group-hover:scale-110",
                      isActive 
                        ? "text-primary drop-shadow-sm" 
                        : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      <item.icon 
                        size={isCollapsed ? 22 : 18} 
                        className="transition-all duration-300 ease-in-out"
                      />
                    </div>
                    {!isCollapsed && (
                      <span className={cn(
                        "font-medium transition-all duration-300",
                        isActive ? "text-primary" : "text-foreground/90 group-hover:text-foreground"
                      )}>
                        {item.label}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className={cn(
        "mt-auto transition-all duration-300 ease-in-out border-t border-border/50",
        isCollapsed ? "px-2 py-3" : "px-4 py-4"
      )}>
        <SidebarMenu className="space-y-2">
          {!isCollapsed && (
            <SidebarMenuItem>
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 border border-border/30">
                <span className="text-sm font-medium text-foreground/80">Theme</span>
                <ThemeToggle />
              </div>
            </SidebarMenuItem>
          )}
          {isCollapsed && (
            <SidebarMenuItem>
              <div className="flex justify-center py-2">
                <ThemeToggle />
              </div>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/profile"}
              tooltip="Profile"
              className={cn(
                "h-11 transition-all duration-300 ease-in-out group relative overflow-hidden",
                isCollapsed ? "px-2" : "px-3",
                pathname === "/dashboard/profile"
                  ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary border-r-2 border-primary shadow-sm"
                  : "hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/20 hover:shadow-sm"
              )}
            >
              <Link href="/dashboard/profile" className={cn(
                "flex items-center transition-all duration-300 ease-in-out",
                isCollapsed ? "justify-center gap-0" : "gap-3"
              )}>
                <div className={cn(
                  "flex items-center justify-center rounded-md transition-all duration-300 group-hover:scale-110",
                  pathname === "/dashboard/profile"
                    ? "text-primary drop-shadow-sm"
                    : "text-muted-foreground group-hover:text-foreground"
                )}>
                  <User 
                    size={isCollapsed ? 22 : 18} 
                    className="transition-all duration-300 ease-in-out"
                  />
                </div>
                {!isCollapsed && (
                  <span className={cn(
                    "font-medium transition-all duration-300",
                    pathname === "/dashboard/profile" ? "text-primary" : "text-foreground/90 group-hover:text-foreground"
                  )}>
                    Profile
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className={cn(
                "h-11 transition-all duration-300 ease-in-out group relative overflow-hidden",
                isCollapsed ? "px-2" : "px-3",
                "hover:bg-gradient-to-r hover:from-destructive/20 hover:to-destructive/10 hover:shadow-sm hover:text-destructive"
              )}
            >
              <button 
                onClick={async () => {
                  try {
                    // Call the logout API endpoint
                    const response = await fetch('/api/auth/logout', {
                      method: 'POST',
                      credentials: 'include',
                    });
                    
                    if (response.ok) {
                      // Redirect to login page after successful logout
                      window.location.href = '/login';
                    } else {
                      console.error('Logout failed');
                      // Still redirect to login page even if logout API fails
                      window.location.href = '/login';
                    }
                  } catch (error) {
                    console.error('Logout error:', error);
                    // Redirect to login page even if there's an error
                    window.location.href = '/login';
                  }
                }}
                className={cn(
                  "flex items-center transition-all duration-300 ease-in-out w-full",
                  isCollapsed ? "justify-center gap-0" : "gap-3"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center rounded-md transition-all duration-300 group-hover:scale-110",
                  "text-muted-foreground group-hover:text-destructive"
                )}>
                  <LogOut 
                    size={isCollapsed ? 22 : 18} 
                    className="transition-all duration-300 ease-in-out"
                  />
                </div>
                {!isCollapsed && (
                  <span className={cn(
                    "font-medium transition-all duration-300",
                    "text-foreground/90 group-hover:text-destructive"
                  )}>
                    Logout
                  </span>
                )}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
