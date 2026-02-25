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
import { ResourceStats } from "@/lib/types";

export function ResourceCharts({ data }: { data: ResourceStats }) {
    // Localize budget categories
    const localizedBudget = data.budgetBreakdown.map(item => {
        let category = item.category;
        if (category === 'Salaries') category = 'Salaires';
        if (category === 'Operations') category = 'Opérations';
        if (category === 'Investment') category = 'Investissements';
        if (category === 'Maintenance') category = 'Maintenance';
        return { ...item, category };
    });

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {/* Budget Breakdown */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Répartition Budgétaire</CardTitle>
                        <CardDescription>Ventilation par grandes catégories de dépenses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <PieChart>
                                    <Pie
                                        data={localizedBudget}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        nameKey="category"
                                    >
                                        {localizedBudget.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={[`#2563eb`, `#3b82f6`, `#60a5fa`, `#93c5fd`][index % 4]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value: number | undefined) => (value !== undefined ? `${value}%` : '0%')}
                                    />
                                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Evolution */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Trajectoire Financière</CardTitle>
                        <CardDescription>Comparaison entre l'allocation et l'exécution effective.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <LineChart data={data.financialEvolution}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="top" align="right" iconType="circle" />
                                    <Line
                                        name="Alloué"
                                        type="monotone"
                                        dataKey="budget"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                    />
                                    <Line
                                        name="Exécuté"
                                        type="monotone"
                                        dataKey="execution"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Regional HR Distribution */}
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-primary italic-sans">Répartition du Capital Humain</CardTitle>
                    <CardDescription>Niveaux d'effectifs dans les secteurs administratifs régionaux.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={data.regionalHR} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500 }} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="top" align="right" iconType="circle" />
                                <Bar name="Magistrats" dataKey="magistrates" fill="#2563eb" radius={[4, 4, 0, 0]} />
                                <Bar name="Personnel Administratif" dataKey="staff" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
