import { Suspense } from "react";
import { fetchPenitentiaryStats } from "@/lib/api";
import { PenitentiaryKPIs } from "@/components/penitentiary/PenitentiaryKPIs";
import { PenitentiaryCharts } from "@/components/penitentiary/PenitentiaryCharts";
import { DashboardSkeleton, ErrorState } from "@/components/shared/StatusComponents";
import { Region } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PageProps {
    searchParams: Promise<{
        region?: string;
    }>;
}

export default async function PenitentiaryPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const region = (params.region as Region) || "National";

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 italic-sans">
                            Statistiques de l'Administration Pénitentiaire
                        </h1>
                        <Badge className="bg-slate-900 text-white hover:bg-slate-800">
                            Rapport Annuel
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 max-w-2xl font-medium">
                        Suivi stratégique des densités de population carcérale, des capacités des établissements et des tendances démographiques pour appuyer les politiques correctionnelles.
                    </p>
                </div>
            </div>

            <Alert className="bg-blue-50/50 border-blue-100">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800 font-bold text-xs uppercase tracking-wider">Note Méthodologique</AlertTitle>
                <AlertDescription className="text-blue-700 text-xs font-medium">
                    Les statistiques sont agrégées à partir des registres régionaux. La pyramide des âges inclut les détenus en attente de jugement ainsi que les condamnés.
                </AlertDescription>
            </Alert>

            <Suspense fallback={<DashboardSkeleton />}>
                <PenitentiaryContent region={region} />
            </Suspense>

            <div className="mt-12 py-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center px-6">
                <ShieldAlert className="w-10 h-10 text-slate-300 mb-4" />
                <h4 className="text-slate-900 font-bold uppercase tracking-widest text-[10px]">Habilitation de Sécurité Requise</h4>
                <p className="text-muted-foreground text-[10px] mt-2 max-w-md font-bold uppercase tracking-tighter">
                    Cet ensemble de données est autorisé pour un usage administratif officiel uniquement. La distribution non autorisée de micro-données démographiques est strictement interdite.
                </p>
            </div>
        </div>
    );
}

async function PenitentiaryContent({ region }: { region: Region }) {
    try {
        const data = await fetchPenitentiaryStats(region);

        return (
            <div className="space-y-8">
                <PenitentiaryKPIs data={data} />

                {data.overcrowded && (
                    <Alert variant="destructive" className="border-rose-200 bg-rose-50/50 animate-pulse">
                        <ShieldAlert className="h-4 w-4" />
                        <AlertTitle className="font-black uppercase tracking-widest text-[10px]">Alerte Critique : Surpeuplement du Système</AlertTitle>
                        <AlertDescription className="font-bold text-xs">
                            La population carcérale actuelle dépasse la capacité totale des établissements suivis. Une réallocation immédiate des ressources est recommandée.
                        </AlertDescription>
                    </Alert>
                )}

                <PenitentiaryCharts data={data} />
            </div>
        );
    } catch (error) {
        console.error("Penitentiary Data Failure:", error);
        return <ErrorState message="Échec de l'authentification avec la base de données pénitentiaire centrale. Veuillez vérifier vos accès." />;
    }
}
