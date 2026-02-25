
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
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
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
