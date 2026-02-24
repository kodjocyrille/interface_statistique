"use client"

import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/lib/types";

const CHART_COLORS = [
    "#2563eb", // Primary Blue
    "#10b981", // Emerald
    "#6366f1", // Indigo
    "#f59e0b", // Amber
    "#64748b", // Slate
];

interface DashboardChartsProps {
    trends: ChartData[];
    distribution: ChartData[];
}

export function DashboardCharts({ trends, distribution }: DashboardChartsProps) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 w-full col-span-7">
            <Card className="lg:col-span-4 border-none shadow-sm overflow-hidden group">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-bold text-primary italic-sans">Tendances Mensuelles</CardTitle>
                            <CardDescription>Évolution des indicateurs clés de performance</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-2 pt-4">
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trends} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="var(--primary)"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: 'var(--primary)', strokeWidth: 3, stroke: '#fff' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                    animationDuration={1500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-3 border-none shadow-sm overflow-hidden">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-primary italic-sans">Distribution Régionale</CardTitle>
                    <CardDescription>Répartition par zone administrative</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distribution}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={8}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {distribution.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    align="center"
                                    iconType="circle"
                                    wrapperStyle={{ paddingTop: '20px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center justify-between text-xs mb-2">
                            <span className="font-bold text-slate-500 uppercase">Zone Dominante</span>
                            <span className="font-black text-primary uppercase tracking-widest">{distribution[0]?.name}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[45%]" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
