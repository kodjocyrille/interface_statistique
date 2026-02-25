"use client"

import {
    Bar,
    BarChart,
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
import { JudicialActivityStats } from "@/lib/types";

export function JudicialCharts({ data }: { data: JudicialActivityStats }) {
    const pieData = [
        { name: "Pénal", value: data.criminalCases },
        { name: "Civil", value: data.civilCases },
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-primary italic-sans">Matrice de Productivité</CardTitle>
                    <CardDescription>Comparaison entre les affaires entrantes et la vitesse de résolution.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <LineChart data={data.monthlyTrends} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748B', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                <Line
                                    name="Affaires Entrantes"
                                    type="monotone"
                                    dataKey="inflow"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                                <Line
                                    name="Affaires Clôturées"
                                    type="monotone"
                                    dataKey="resolved"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="lg:col-span-3 border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-primary italic-sans">Spécialisation des Affaires</CardTitle>
                    <CardDescription>Répartition des affaires par type de contentieux juridictionnel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full mt-4 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    <Cell fill="#ef4444" />
                                    <Cell fill="#3b82f6" />
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '12px'
                                    }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center pointer-events-none">
                            <span className="text-3xl font-bold text-slate-900 tracking-tight">
                                {((data.criminalCases / (data.criminalCases + data.civilCases)) * 100).toFixed(0)}%
                            </span>
                            <span className="text-[10px] text-muted-foreground uppercase font-black">Pénal</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
