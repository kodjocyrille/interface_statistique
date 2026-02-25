import { Suspense } from "react";
import { fetchDashboardData } from "@/lib/api";
import { CardStats } from "@/components/dashboard/CardStats";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { DashboardSkeleton, ErrorState } from "@/components/shared/StatusComponents";
import { Region, Year } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PageProps {
  searchParams: Promise<{
    region?: string;
    year?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const region = (params.region as Region) || "National";
  const year = (params.year as Year) || "2024";

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Suspense fallback={<div className="h-16 border-b bg-white dark:bg-slate-950 px-8" />}>
        <DashboardHeader />
      </Suspense>
      <ScrollArea className="flex-1">
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 italic-sans">
                Vue d'ensemble Nationale
              </h1>
              <p className="text-muted-foreground mt-2 font-medium">
                Suivi consolidé des indicateurs socio-économiques et judiciaires pour la région <span className="text-primary font-bold">{region}</span> en <span className="text-primary font-bold">{year}</span>.
              </p>
            </div>
            <a
              href="/jurisdictions"
              className="inline-flex items-center justify-center bg-[#0a192f] text-white px-6 py-3 text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              Accéder aux Juridictions
            </a>
          </div>

          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent region={region} year={year} />
          </Suspense>
        </div>
      </ScrollArea>
    </div>
  );
}

async function DashboardContent({ region, year }: { region: Region; year: Year }) {
  try {
    const data = await fetchDashboardData(region, year);

    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.kpis.map((kpi, i) => (
            <CardStats key={i} data={kpi} />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <DashboardCharts
            trends={data.monthlyTrends}
            distribution={data.regionalDistribution}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return <ErrorState message="Échec de la récupération des données du tableau de bord. Veuillez contacter l'administrateur système." />;
  }
}
