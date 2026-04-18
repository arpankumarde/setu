"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const navItems = [
  { label: "Student", href: "/student" },
  { label: "Business", href: "/business" },
  { label: "Matches", href: "/match/proj_101" },
  { label: "Workspace", href: "/workspace/proj_101" },
];

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader className="px-3 py-4">
          <p className="text-xs text-muted-foreground">Setu</p>
          <p className="font-medium">Proof-of-work hiring</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-3 pb-4 text-xs text-muted-foreground">
          Early-stage MVP
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-[#FAFAFA]">
        <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-[#FAFAFA]/95 px-4 py-3 backdrop-blur-sm">
          <SidebarTrigger />
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle ? (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

