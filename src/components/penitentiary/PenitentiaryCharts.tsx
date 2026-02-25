"use client"

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    ReferenceLine,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenitentiaryStats } from "@/lib/types";

export function PenitentiaryCharts({ data }: { data: PenitentiaryStats }) {
    // Data for Population Pyramid (M/F split by age)
    const pyramidData = data.ageGroups.map(group => ({
        ...group,
        female_neg: -group.female // Negative for left side of axis
    }));

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Occupancy Gauge */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Analyse d'Occupation</CardTitle>
                        <CardDescription>Utilisation de la capacité dans tous les établissements.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center pt-6">
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="none" stroke="#f1f5f9" strokeWidth="12"
                                />
                                <circle
                                    cx="50" cy="50" r="40"
                                    fill="none"
                                    stroke={data.overcrowded ? "#e11d48" : "#2563eb"}
                                    strokeWidth="12"
                                    strokeDasharray={`${Math.min(data.occupancyRate * 2.51, 251)} 251`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 50 50)"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-slate-900">{data.occupancyRate}%</span>
                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Capacité</span>
                            </div>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-8 w-full">
                            <div className="text-center">
                                <div className="text-xl font-bold text-slate-900">{data.totalPopulation.toLocaleString()}</div>
                                <div className="text-[10px] uppercase font-bold text-muted-foreground">Population</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-slate-900">{data.capacity.toLocaleString()}</div>
                                <div className="text-[10px] uppercase font-bold text-muted-foreground">Limite</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Population Pyramid */}
                <Card className="lg:col-span-2 border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Pyramide Démographique</CardTitle>
                        <CardDescription>Répartition par âge et par sexe des détenus.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <BarChart
                                    layout="vertical"
                                    data={pyramidData}
                                    stackOffset="sign"
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="age" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                                    <Tooltip
                                        formatter={(value: number | undefined) => (value !== undefined ? Math.abs(value) : 0)}
                                        labelStyle={{ fontWeight: 'bold' }}
                                    />
                                    <Legend verticalAlign="top" iconType="circle" />
                                    <Bar name="Hommes" dataKey="male" fill="#2563eb" stackId="a" radius={[0, 4, 4, 0]} />
                                    <Bar name="Femmes" dataKey="female_neg" fill="#db2777" stackId="a" radius={[4, 0, 0, 4]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Regional Comparison */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Saturation Régionale</CardTitle>
                        <CardDescription>Population vs Capacité par région administrative.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <BarChart data={data.regionalComparison} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="top" align="right" />
                                    <Bar name="Population" dataKey="population" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                    <Bar name="Limite de Capacité" dataKey="capacity" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* 10-Year Evolution */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Évolution de la Population (2012-2022)</CardTitle>
                        <CardDescription>Tendance historique de la population carcérale totale.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <LineChart data={data.evolution}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        name="Total"
                                        dataKey="total"
                                        stroke="var(--primary)"
                                        strokeWidth={4}
                                        dot={{ r: 4, strokeWidth: 0, fill: 'var(--primary)' }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
