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
import { AccessJusticeStats } from "@/lib/types";

export function JusticeCharts({ data }: { data: AccessJusticeStats }) {
    const ratioData = [
        { name: "Médiation", value: data.mediationRatio, color: "#10b981" },
        { name: "Voie Judiciaire", value: data.judicialRatio, color: "#3b82f6" },
    ];

    const genderData = [
        { name: "Hommes", value: data.beneficiaryDemographics.male },
        { name: "Femmes", value: data.beneficiaryDemographics.female },
    ];

    // Localized reasons
    const localizedUsage = data.usageByReason.map(item => {
        let reason = item.reason;
        if (reason === 'Family Law') reason = 'Droit de la Famille';
        if (reason === 'Land Disputes') reason = 'Litiges Fonciers';
        if (reason === 'Labor Issues') reason = 'Droit du Travail';
        if (reason === 'Civil Registry') reason = 'État Civil';
        if (reason === 'Criminal Advice') reason = 'Conseil Pénal';
        return { ...item, reason };
    });

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Mediation Ratio */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Stratégie de Résolution</CardTitle>
                        <CardDescription>Préférence pour la médiation vs. procès standard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <PieChart>
                                    <Pie
                                        data={ratioData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={10}
                                        dataKey="value"
                                    >
                                        {ratioData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
                                <span className="text-2xl font-black text-slate-800">{data.mediationRatio}%</span>
                                <span className="text-[8px] uppercase font-bold text-muted-foreground">Médiation</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Gender Disaggregation */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Inclusivité des Citoyens</CardTitle>
                        <CardDescription>Répartition par sexe des utilisateurs du service.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        <Cell fill="#6366f1" />
                                        <Cell fill="#ec4899" />
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none' }}
                                    />
                                    <Legend verticalAlign="bottom" iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Growth Trend */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary italic-sans">Expansion de l'Infrastructure</CardTitle>
                        <CardDescription>Croissance des Maisons de Justice depuis 2018.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <BarChart data={data.historicalGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Usage by Reason */}
            <Card className="border-none shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-primary italic-sans">Demande de Consultation par Sujet</CardTitle>
                    <CardDescription>Principaux problèmes juridiques abordés dans le réseau national.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart layout="vertical" data={localizedUsage} margin={{ left: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="reason"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fontWeight: 600, fill: '#475569' }}
                                    width={150}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={30}>
                                    {localizedUsage.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? "#1e40af" : "#3b82f6"} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
