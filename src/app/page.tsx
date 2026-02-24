import { Suspense } from "react";
import { fetchDashboardData } from "@/lib/api";
import { CardStats } from "@/components/dashboard/CardStats";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { DashboardSkeleton, ErrorState } from "@/components/shared/StatusComponents";
import { Region, Year } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 italic-sans">
          Vue d'ensemble Nationale
        </h1>
        <p className="text-muted-foreground mt-2 font-medium">
          Suivi consolidé des indicateurs socio-économiques et judiciaires pour la région <span className="text-primary font-bold">{region}</span> en <span className="text-primary font-bold">{year}</span>.
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent region={region} year={year} />
      </Suspense>
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
