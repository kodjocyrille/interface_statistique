"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JudicialActivityStats } from "@/lib/types";
import {
    FilePlus,
    FileCheck,
    Clock,
    History,
    Gavel,
    CheckCircle2,
    TrendingUp,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

export function JudicialKPIs({ data }: { data: JudicialActivityStats }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-none shadow-sm bg-white dark:bg-slate-900 border-l-4 border-l-blue-600">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Affaires Entrantes</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <FilePlus className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-black text-slate-900 dark:text-slate-50">{data.inflow.toLocaleString()}</div>
                    <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase tracking-tighter">Nouvelles saisines</p>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white dark:bg-slate-900 border-l-4 border-l-emerald-600">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Affaires Clôturées</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <FileCheck className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-black text-slate-900 dark:text-slate-50">{data.resolved.toLocaleString()}</div>
                    <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tighter">Décisions rendues</p>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white dark:bg-slate-900 border-l-4 border-l-indigo-600">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Taux de Couverture</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Clock className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-black text-slate-900 dark:text-slate-50">{data.clearanceRate}%</div>
                    <p className="text-[10px] font-bold text-indigo-600 mt-1 uppercase tracking-tighter">Indice d'efficacité</p>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white dark:bg-slate-900 border-l-4 border-l-amber-600">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Affaires en Souffrance</CardTitle>
                    <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                        <History className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-black text-slate-900 dark:text-slate-50">{data.backlog.toLocaleString()}</div>
                    <p className="text-[10px] font-bold text-amber-600 mt-1 uppercase tracking-tighter">Stock restant</p>
                </CardContent>
            </Card>
        </div>
    );
}
