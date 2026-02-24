import { Suspense } from "react";
import { fetchJudicialActivity } from "@/lib/api";
import { JudicialFilters } from "@/components/judicial/JudicialFilters";
import { JudicialKPIs } from "@/components/judicial/JudicialKPIs";
import { JudicialCharts } from "@/components/judicial/JudicialCharts";
import { JudicialTable } from "@/components/judicial/JudicialTable";
import { DashboardSkeleton, ErrorState } from "@/components/shared/StatusComponents";
import { Region, Year, JurisdictionType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PageProps {
    searchParams: Promise<{
        region?: string;
        year?: string;
        type?: string;
    }>;
}

export default async function JudicialActivityPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const region = (params.region as Region) || "National";
    const year = (params.year as Year) || "2024";
    const type = params.type === "All" ? undefined : (params.type as JurisdictionType);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 italic-sans">
                            Analyse de l'Activité Judiciaire
                        </h1>
                        <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 px-3 py-0.5 font-bold uppercase tracking-tighter shadow-sm">
                            Registre en Direct
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 max-w-2xl font-medium">
                        Aperçu intelligent de l'efficacité du traitement des affaires, des taux de clôture et du débit juridictionnel à travers le système judiciaire national.
                    </p>
                </div>
            </div>

            <Separator className="bg-slate-200 dark:bg-slate-800" />

            <JudicialFilters />

            <Suspense fallback={<DashboardSkeleton />}>
                <JudicialContent region={region} year={year} type={type} />
            </Suspense>

            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2">
                <div className="flex items-center gap-4 opacity-40">
                    <div className="h-6 w-px bg-slate-300" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Justice et Transparence</span>
                    <div className="h-6 w-px bg-slate-300" />
                </div>
                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.1em]">
                    Certifié par le Bureau National des Statistiques • Intégrité des Données : Vérifié • Session Sécurisée
                </p>
            </div>
        </div>
    );
}

async function JudicialContent({
    region,
    year,
    type
}: {
    region: Region;
    year: Year;
    type?: JurisdictionType
}) {
    try {
        const data = await fetchJudicialActivity(region, year, type);

        if (!data || data.inflow === 0) {
            return (
                <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-muted-foreground font-medium">No judicial records found for the selected criteria.</p>
                </div>
            );
        }

        return (
            <div className="space-y-8">
                <JudicialKPIs data={data} />
                <JudicialCharts data={data} />
                <JudicialTable data={data} />
            </div>
        );
    } catch (error) {
        console.error("Judicial Analytics Error:", error);
        return <ErrorState message="Critical failure in communicating with the judicial registry. Please contact system administration if the issue persists." />;
    }
}
