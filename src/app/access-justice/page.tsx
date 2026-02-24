import { Suspense } from "react";
import { fetchAccessJusticeData } from "@/lib/api";
import { JusticeMap } from "@/components/justice/JusticeMap";
import { JusticeCharts } from "@/components/justice/JusticeCharts";
import { DashboardSkeleton, ErrorState } from "@/components/shared/StatusComponents";
import { Region } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Scale, Users, CheckCircle2, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
    searchParams: Promise<{
        region?: string;
    }>;
}

export default async function AccessJusticePage({ searchParams }: PageProps) {
    const params = await searchParams;
    const region = (params.region as Region) || "National";

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 italic-sans">
                            Réseau d'Accès à la Justice
                        </h1>
                        <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 border-none px-4 py-1">
                            Portail d'Appui aux Citoyens
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 max-w-2xl font-medium">
                        Suivi de la décentralisation de l'aide juridique et des services de conseil public. Rapprocher le système judiciaire des citoyens grâce à des centres de soutien localisés.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-primary to-blue-700 text-white border-none shadow-lg">
                    <CardHeader className="pb-2">
                        <Scale className="w-8 h-8 mb-2 opacity-80" />
                        <CardTitle className="text-xs uppercase font-bold tracking-[0.2em] opacity-80">Infrastructure</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">45 Maisons</div>
                        <p className="text-xs font-medium opacity-80 mt-1">Centres de proximité stratégiques</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm border-l-4 border-emerald-500">
                    <CardHeader className="pb-2">
                        <Users className="w-8 h-8 mb-2 text-emerald-600" />
                        <CardTitle className="text-xs uppercase font-bold tracking-[0.2em] text-muted-foreground">Bénéficiaires</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-slate-900">125K+</div>
                        <p className="text-xs font-bold text-emerald-600 mt-1">Total des consultations servies</p>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm border-l-4 border-indigo-500">
                    <CardHeader className="pb-2">
                        <CheckCircle2 className="w-8 h-8 mb-2 text-indigo-600" />
                        <CardTitle className="text-xs uppercase font-bold tracking-[0.2em] text-muted-foreground">Taux de Résolution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-slate-900">88.4%</div>
                        <p className="text-xs font-bold text-indigo-600 mt-1">Médiations réussies</p>
                    </CardContent>
                </Card>
            </div>

            <Suspense fallback={<DashboardSkeleton />}>
                <AccessJusticeContent region={region} />
            </Suspense>

            <div className="mt-12 py-10 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 bg-primary/5 rounded-full -mr-12 -mt-12" />
                <Globe className="w-12 h-12 text-primary/20 mb-4" />
                <h4 className="text-slate-900 font-black uppercase tracking-widest text-xs">Engagement de Service Public</h4>
                <p className="text-muted-foreground text-[10px] mt-2 max-w-lg font-bold uppercase tracking-tight leading-relaxed">
                    Le Ministère de la Justice garantit l'accès universel à l'orientation juridique. Toutes les statistiques affichées ici font l'objet d'un audit mensuel rigoureux pour garantir l'inclusivité démographique et les normes de qualité de service.
                </p>
                <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-slate-400 uppercase">Systèmes Vérifiés</span>
                </div>
            </div>
        </div>
    );
}

async function AccessJusticeContent({ region }: { region: Region }) {
    try {
        const data = await fetchAccessJusticeData(region);

        return (
            <div className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2">
                    <JusticeMap centers={data.regionalCenters} />
                    <div className="space-y-6">
                        <JusticeCharts data={data} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Access to Justice Data Failure:", error);
        return <ErrorState message="Impossible de synchroniser avec le réseau de justice décentralisé. Veuillez vérifier votre connexion réseau." />;
    }
}
