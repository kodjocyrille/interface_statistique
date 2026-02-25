import { StatTableCard } from "./StatTableCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Landmark, FolderTree, Baby, FileText, LayoutGrid, BarChart3, TrendingUp, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Legend
} from 'recharts';

interface JurisdictionContentProps {
    jurisdiction: any;
    departmentId: string;
    onDeptChange: (id: string) => void;
}

const DEPT_MAP: Record<string, { label: string, icon: any }> = {
    "parquet": { label: "Parquet", icon: ShieldCheck },
    "siege": { label: "Siège", icon: Landmark },
    "instruction": { label: "Cabinet d'Instruction", icon: FolderTree },
    "enfants": { label: "Tribunal pour Enfants", icon: Baby },
};

export function JurisdictionContent({ jurisdiction, departmentId, onDeptChange }: JurisdictionContentProps) {
    const [showVbg, setShowVbg] = useState(false);

    const availableDepts = useMemo(() => {
        if (!jurisdiction) return [];
        switch (jurisdiction.type) {
            case "TGI":
                return [
                    { id: "siege", ...DEPT_MAP.siege },
                    { id: "parquet", ...DEPT_MAP.parquet },
                    { id: "instruction", ...DEPT_MAP.instruction },
                    { id: "enfants", ...DEPT_MAP.enfants }
                ];
            case "TICCC":
                return [
                    { id: "siege", ...DEPT_MAP.siege },
                    { id: "parquet", ...DEPT_MAP.parquet },
                    { id: "instruction", ...DEPT_MAP.instruction }
                ];
            case "TICC":
                return [{ id: "siege", ...DEPT_MAP.siege }];
            default:
                // Pour CA, SUPREME, SPECIAL : on n'affiche pas de filtres, ou juste le siège par défaut
                return [];
        }
    }, [jurisdiction]);

    const vbgTable = useMemo(() => ({
        id: "vbg-table",
        title: "Tableau : Statistiques des Violences Basées sur le Genre (VBG)",
        columns: ["Type de Violence", "Nombre de plaintes", "Dossiers instruits", "Jugements rendus", "Année"],
        data: [
            { "Type de Violence": "Violence Physique", "Nombre de plaintes": 0, "Dossiers instruits": 0, "Jugements rendus": 0, "Année": "2026" },
            { "Type de Violence": "Violence Sexuelle", "Nombre de plaintes": 0, "Dossiers instruits": 0, "Jugements rendus": 0, "Année": "2026" },
            { "Type de Violence": "Violence Psychologique", "Nombre de plaintes": 0, "Dossiers instruits": 0, "Jugements rendus": 0, "Année": "2026" },
            { "Type de Violence": "Violence Économique", "Nombre de plaintes": 0, "Dossiers instruits": 0, "Jugements rendus": 0, "Année": "2026" },
        ]
    }), []);

    // Aggregate data for the Master Chart - MUST BE ABOVE EARLY RETURN
    const currentTables = useMemo(() => {
        if (!jurisdiction) return [];
        return jurisdiction.tables.filter((t: any) => !t.departmentId || t.departmentId === departmentId);
    }, [jurisdiction, departmentId]);

    // Aggregate data for the Master Chart - Unified Summary
    const chartData = useMemo(() => {
        if (currentTables.length === 0) return [];

        const periods: Record<string, any> = {};

        currentTables.forEach((table: any) => {
            const tablePeriods: Record<string, { sum: number, explicitTotal: number | null }> = {};

            table.data.forEach((row: any) => {
                const year = row.year || row.Year || "2026";
                if (!tablePeriods[year]) tablePeriods[year] = { sum: 0, explicitTotal: null };

                const val = row.valeur ?? row.Total ?? row.TOTAL ?? row["Total "] ?? 0;
                const isExplicitTotal = row.indicateur?.toLowerCase().includes('total') ||
                    row.Infraction?.toLowerCase() === 'total' ||
                    row.Sexe?.toLowerCase() === 'total';

                if (isExplicitTotal) {
                    tablePeriods[year].explicitTotal = val;
                } else {
                    tablePeriods[year].sum += val;
                }
            });

            Object.entries(tablePeriods).forEach(([yr, data]) => {
                if (!periods[yr]) periods[yr] = { year: yr };
                periods[yr][table.id] = data.explicitTotal !== null ? data.explicitTotal : data.sum;
            });
        });

        return Object.values(periods).sort((a: any, b: any) => a.year.localeCompare(b.year));
    }, [currentTables]);

    const chartConfig = useMemo(() => {
        const colors = ["#60a5fa", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];
        return currentTables.map((t: any, i: number) => ({
            key: t.id,
            name: t.title.split(':')[1]?.trim() || t.title,
            color: colors[i % colors.length]
        }));
    }, [currentTables]);

    if (!jurisdiction) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-slate-200 blur-2xl opacity-20" />
                    <LayoutGrid className="w-16 h-16 text-slate-200 relative z-10" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.3em]">
                        Portail des Statistiques
                    </h2>
                    <p className="text-slate-300 text-[10px] font-medium uppercase tracking-wider">
                        Sélectionnez une juridiction dans le menu latéral
                    </p>
                </div>
            </div>
        );
    }

    const currentDeptNode = DEPT_MAP[departmentId] || DEPT_MAP.siege;
    const showTabs = availableDepts.length > 1;

    return (
        <div className="space-y-12 w-full p-8 md:p-12 lg:p-16 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-[#0a192f] pl-8">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">République Togolaise</span>
                    <h1 className="text-4xl font-black tracking-tighter text-[#0a192f] uppercase leading-none mt-2">
                        {jurisdiction.name}
                    </h1>
                </div>
                {showTabs && (
                    <div className="flex bg-slate-100/50 p-1 border border-slate-200">
                        {availableDepts.map((d) => (
                            <button
                                key={d.id}
                                onClick={() => onDeptChange(d.id)}
                                className={cn(
                                    "px-6 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-3",
                                    departmentId === d.id
                                        ? "bg-[#0a192f] text-white shadow-lg"
                                        : "text-slate-500 hover:text-[#0a192f]"
                                )}
                            >
                                <d.icon className="w-3 h-3" />
                                {d.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Unified Analytics Section */}
            {currentTables.length > 0 && (
                <div className="bg-[#0a192f] p-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full -mr-48 -mt-48" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-white">
                                <div className="p-3 bg-white/10">
                                    <TrendingUp className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm font-black uppercase tracking-[0.3em]">Analyse Globale des Flux</h3>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance consolidée • {currentDeptNode.label}</span>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Total Dossiers</span>
                                    <span className="text-2xl font-black text-white mt-1">103</span>
                                </div>
                                <div className="flex flex-col items-end border-l border-white/10 pl-8">
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Variation</span>
                                    <span className="text-2xl font-black text-green-400 mt-1">+12%</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[350px] w-full mt-10">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        {chartConfig.map((config: any) => (
                                            <linearGradient key={`grad-${config.key}`} id={`color-${config.key}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={config.color} stopOpacity={0.2} />
                                                <stop offset="95%" stopColor={config.color} stopOpacity={0} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis
                                        dataKey="year"
                                        stroke="rgba(255,255,255,0.3)"
                                        fontSize={10}
                                        fontWeight="700"
                                        tickLine={false}
                                        axisLine={false}
                                        dy={15}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.3)"
                                        fontSize={10}
                                        fontWeight="700"
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#112240',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '0',
                                            fontSize: '11px',
                                            fontWeight: '800',
                                            color: '#fff'
                                        }}
                                        itemStyle={{ padding: '2px 0' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        content={(props) => {
                                            const { payload } = props;
                                            return (
                                                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-10">
                                                    {payload?.map((entry: any, index: number) => (
                                                        <div key={`item-${index}`} className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color, width: '8px', height: '8px' }} />
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                                {entry.value}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        }}
                                    />
                                    {chartConfig.map((config: any) => (
                                        <Area
                                            key={config.key}
                                            type="monotone"
                                            dataKey={config.key}
                                            name={config.name}
                                            stroke={config.color}
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill={`url(#color-${config.key})`}
                                            dot={{ r: 4, fill: config.color, strokeWidth: 2, stroke: '#0a192f' }}
                                            activeDot={{ r: 6, strokeWidth: 0 }}
                                        />
                                    ))}
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* Tables Grid - COMPACT MODE */}
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between gap-4">
                    <Separator className="flex-1 opacity-20" />
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Détail des Indicateurs</span>
                        <button
                            onClick={() => setShowVbg(!showVbg)}
                            className={cn(
                                "flex items-center gap-3 px-6 py-2.5 text-[9px] font-black uppercase tracking-widest transition-all",
                                showVbg
                                    ? "bg-rose-600 text-white shadow-lg"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-rose-200 hover:text-rose-600"
                            )}
                        >
                            <Users className="w-3.5 h-3.5" />
                            {showVbg ? "Masquer les VBG" : "Afficher les VBG"}
                        </button>
                    </div>
                    <Separator className="flex-1 opacity-20" />
                </div>

                {showVbg && (
                    <div className="animate-in slide-in-from-top-4 duration-500">
                        <StatTableCard table={vbgTable} compact={false} />
                        <div className="mt-8">
                            <Separator className="opacity-10" />
                        </div>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    {currentTables.length > 0 ?
                        currentTables.map((table: any) => (
                            <StatTableCard key={table.id} table={table} compact={true} />
                        )) : (
                            <div className="col-span-full py-24 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4 bg-white/30">
                                <FileText className="w-10 h-10 text-slate-200" />
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    Aucune donnée disponible pour {currentDeptNode.label}
                                </p>
                            </div>
                        )}
                </div>
            </div>

            <footer className="pt-20 pb-12 text-center border-t border-slate-100">
                <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-300">
                    Système National de Statistiques Judiciaires • Togo
                </p>
            </footer>
        </div>
    );
}
