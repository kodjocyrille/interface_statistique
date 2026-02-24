"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenitentiaryStats } from "@/lib/types";
import { Users, Home, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function PenitentiaryKPIs({ data }: { data: PenitentiaryStats }) {
    const kpis = [
        {
            title: "Total Détenus",
            value: data.totalPopulation.toLocaleString(),
            description: "Population carcérale actuelle",
            icon: Users,
            color: "text-slate-900",
            bg: "bg-slate-100"
        },
        {
            title: "Capacité Théorique",
            value: data.capacity.toLocaleString(),
            description: "Capacité institutionnelle officielle",
            icon: Home,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Taux d'Occupation",
            value: `${data.occupancyRate}%`,
            description: data.overcrowded ? "SURPEUPLEMENT CRITIQUE" : "Dans les limites de capacité",
            icon: AlertTriangle,
            color: data.overcrowded ? "text-rose-600" : "text-emerald-600",
            bg: data.overcrowded ? "bg-rose-50" : "bg-emerald-50",
            alert: data.overcrowded
        },
        {
            title: "Adultes vs Mineurs",
            value: `${data.demographics.adults.toLocaleString()} / ${data.demographics.minors.toLocaleString()}`,
            description: "Répartition par groupe d'âge",
            icon: TrendingUp,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi, i) => (
                <Card key={i} className="border-none shadow-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {kpi.title}
                        </CardTitle>
                        <div className={cn("p-2 rounded-lg", kpi.bg)}>
                            <kpi.icon className={cn("w-4 h-4", kpi.color)} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold tracking-tight text-slate-900 italic-sans">
                                {kpi.value}
                            </div>
                            {kpi.alert && (
                                <Badge variant="destructive" className="animate-pulse text-[10px] py-0 px-1 uppercase">Alerte</Badge>
                            )}
                        </div>
                        <p className={cn(
                            "text-[10px] mt-1 font-bold uppercase tracking-tight",
                            kpi.alert ? "text-rose-600" : "text-muted-foreground"
                        )}>
                            {kpi.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
