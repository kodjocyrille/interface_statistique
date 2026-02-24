import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TooltipProvider } from "@/components/ui/tooltip";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "StatJustice Togo - Portail National des Statistiques",
  description: "Tableau de bord officiel des statistiques judiciaires et indicateurs de performance de la République Togolaise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="antialiased">
      <body className={`${poppins.variable} font-sans min-h-screen bg-slate-50 dark:bg-slate-950`}>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Suspense fallback={<div className="h-16 border-b bg-white dark:bg-slate-900 px-6" />}>
                  <DashboardHeader />
                </Suspense>
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                  <div className="mx-auto max-w-7xl">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
