"use client";

import Header from "@/components/ui/header";
import { usePathname } from "next/navigation";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const showHeader = pathname !== "/login" && pathname !== "/register" && pathname !== "/forgot-password";
  
    return (
    <div>
      {showHeader && <Header />}
      <main>{children}</main>
    </div>
  );
}
