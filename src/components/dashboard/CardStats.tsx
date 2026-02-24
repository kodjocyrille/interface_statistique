import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiData } from "@/lib/types";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface CardStatsProps {
    data: KpiData;
    loading?: boolean;
}

export function CardStats({ data, loading }: CardStatsProps) {
    if (!data || loading) {
        return (
            <Card className="overflow-hidden border-none shadow-sm animate-pulse">
                <div className="h-32 bg-slate-100 dark:bg-slate-800" />
            </Card>
        );
    }

    const Icon = (Icons as any)[data.icon] || Icons.HelpCircle;

    return (
        <Card className="overflow-hidden border-none shadow-sm transition-all hover:shadow-md bg-white dark:bg-slate-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {data.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 italic-sans">
                    {data.value}
                </div>
                <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                    <span className={cn(
                        "font-semibold",
                        data.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    )}>
                        {data.change >= 0 ? "+" : ""}{data.change}%
                    </span>
                    {data.description}
                </p>
            </CardContent>
        </Card>
    );
}
