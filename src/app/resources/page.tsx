import { Suspense } from "react";
import { fetchResourceStats } from "@/lib/api";
import { ResourceKPIs } from "@/components/resources/ResourceKPIs";
import { ResourceCharts } from "@/components/resources/ResourceCharts";
import { DashboardSkeleton, ErrorState } from "@/components/shared/StatusComponents";
import { Region } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Settings2, Landmark } from "lucide-react";

interface PageProps {
    searchParams: Promise<{
        region?: string;
    }>;
}

export default async function ResourcesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const region = (params.region as Region) || "National";

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 italic-sans">
                            Gestion des Ressources Ministérielles
                        </h1>
                        <Badge className="bg-primary text-white border-none px-4 py-1">
                            Registre Interne
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 max-w-2xl font-medium">
                        Aperçu analytique du capital humain et des ressources financières. Suivi de l'efficacité de l'exécution budgétaire et des ratios magistrats par habitant.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <Landmark className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Données Fiscales Consolidées - AF 2024</span>
            </div>

            <Suspense fallback={<DashboardSkeleton />}>
                <ResourcesContent region={region} />
            </Suspense>

            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2">
                <div className="p-2 bg-slate-100 rounded-full">
                    <Settings2 className="w-5 h-5 text-slate-400" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Portail de Gouvernance Institutionnelle</h4>
                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.1em]">
                    Direction de la Planification, des Ressources Humaines et des Finances • État de l'Audit : Certifié
                </p>
            </div>
        </div>
    );
}

async function ResourcesContent({ region }: { region: Region }) {
    try {
        const data = await fetchResourceStats(region);

        return (
            <div className="space-y-8">
                <ResourceKPIs data={data} />
                <ResourceCharts data={data} />
            </div>
        );
    } catch (error) {
        console.error("Resource Data Fetch Error:", error);
        return <ErrorState message="Délai d'attente de connexion au registre. La base de données financière interne est actuellement en maintenance ou inaccessible." />;
    }
}
