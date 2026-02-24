"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourceStats } from "@/lib/types";
import { Briefcase, Users, DollarSign, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export function ResourceKPIs({ data }: { data: ResourceStats }) {
    const kpis = [
        {
            title: "Magistrats Actifs",
            value: data.magistratesCount.toLocaleString(),
            description: "Officiers de justice en poste",
            icon: Briefcase,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Personnel Administratif",
            value: data.adminStaffCount.toLocaleString(),
            description: "Personnel d'appui et de greffe",
            icon: Users,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Budget Alloué",
            value: `${data.totalBudget.toLocaleString()}M CFA`,
            description: "Allocation fiscale annuelle totale",
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Taux d'Exécution",
            value: `${data.executionRate}%`,
            description: "Efficacité de l'utilisation du budget",
            icon: PieChart,
            color: "text-amber-600",
            bg: "bg-amber-50"
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
                        <div className="text-2xl font-bold tracking-tight text-slate-900 italic-sans">
                            {kpi.value}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-tight">
                            {kpi.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
