
"use client"

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
} from "@/components/ui/select";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Search,
    Gavel,
    Home,
    ChevronRight,
    Building2,
    Scaling,
    Globe2,
    Briefcase,
    Baby,
    Landmark,
    Users,
    Activity,
    FolderTree,
    GanttChartSquare,
    ShieldCheck
} from "lucide-react";
import { Region, Year } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Hierarchy Data based on juridiction_.md
const DEPARTMENTS = [
    { id: "parquet", label: "Parquet", icon: ShieldCheck, color: "text-rose-600" },
    { id: "siege", label: "Siège", icon: Landmark, color: "text-blue-600" },
    { id: "instruction", label: "Cabinet d'Instruction", icon: FolderTree, color: "text-amber-600" },
    { id: "enfants", label: "Juridiction pour Enfants", icon: Baby, color: "text-indigo-600" },
];

const JURISDICTION_HIERARCHY = {
    "Droit Commun": {
        "Cour Suprême": ["Nationale"],
        "Cour d'Appel": {
            "Lomé": [
                "TGI Atakpamé",
                "TICCC Tsévié",
                "TICCC Anèho",
                "TICCC Vogan",
                "TICCC Notsè",
                "TICCC Kpalimé",
                "TICC Kévé",
                "TICC Danyi",
                "TICC Agou",
                "TICC Amlamé",
                "TICC Badou",
                "TICC Elavagnon",
                "TICC Tohoun",
                "TICC Tabligbo"
            ],
            "Kara": [
                "TGI Sokodé",
                "TGI Kara",
                "TGI Dapaong",
                "TICCC Sotouboua",
                "TICCC Bassar",
                "TICCC Kanté",
                "TICCC Mango",
                "TICC Blitta",
                "TICC Tchamba",
                "TICC Bafilo",
                "TICC Guérin-kouka",
                "TICC Pagouda",
                "TICC Doufelgou",
                "TICC Tandjouaré",
                "TICC Mandouri"
            ]
        },
        "TGI (Indépendant)": ["TGI Lomé"], // Example for TGI outside specific CA list if needed
        "TICCC": [],
        "TICC": []
    },
    "Juridictions Spécialisées": {
        "Tribunaux du Travail": ["Lomé", "Kara"],
        "Tribunaux de Commerce": ["Lomé"],
        "Tribunaux pour Enfants": ["Lomé", "Kara", "Atakpamé"]
    }
};

export function JudicialFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentRegion = (searchParams.get("region") as Region) || "National";
    const currentYear = (searchParams.get("year") as Year) || "2024";
    const currentType = searchParams.get("type") || "All";
    const currentJurisdiction = searchParams.get("jurisdiction") || "";
    const currentDept = searchParams.get("dept") || "siege";

    const updateFilters = (updates: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value === "All" || value === "") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.push(`?${params.toString()}`);
    };

    // Flatten data for the select
    const selectOptions = useMemo(() => {
        return [
            { label: "Cour Suprême", value: "Supreme", group: "Droit Commun", hasDepts: true },
            { label: "Cour d'Appel de Lomé", value: "CA Lomé", group: "Droit Commun", hasDepts: true },
            { label: "Cour d'Appel de Kara", value: "CA Kara", group: "Droit Commun", hasDepts: true },
            { label: "TGI", value: "TGI", group: "Droit Commun", hasDepts: true },
            { label: "TICCC", value: "TICCC", group: "Droit Commun", hasDepts: false },
            { label: "TICC", value: "TICC", group: "Droit Commun", hasDepts: false },
            { label: "Tribunaux du Travail", value: "Travail", group: "Spécialisée", hasDepts: false },
            { label: "Tribunaux de Commerce", value: "Commerce", group: "Spécialisée", hasDepts: false },
            { label: "Tribunaux pour Enfants", value: "Enfants", group: "Spécialisée", hasDepts: false },
        ];
    }, []);

    const showDepts = useMemo(() => {
        const option = selectOptions.find(o => o.value === currentType);
        return option?.hasDepts || false;
    }, [currentType, selectOptions]);

    const getBreadcrumbs = () => {
        const crumbs = [{ label: "Justice", icon: Home, value: "All" }];

        if (currentType !== "All") {
            const typeLabel = selectOptions.find(o => o.value === currentType)?.label || currentType;
            crumbs.push({ label: typeLabel, icon: Gavel, value: currentType });
        }

        if (currentJurisdiction) {
            crumbs.push({ label: currentJurisdiction, icon: Building2, value: currentJurisdiction });
        }

        if (showDepts && currentDept) {
            const deptLabel = DEPARTMENTS.find(d => d.id === currentDept)?.label || currentDept;
            crumbs.push({ label: deptLabel, icon: Activity, value: currentDept });
        }

        return crumbs;
    };

    return (
        <div className="space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-between px-1">
                <Breadcrumb>
                    <BreadcrumbList>
                        {getBreadcrumbs().map((crumb, idx, array) => (
                            <div key={idx} className="flex items-center">
                                <BreadcrumbItem>
                                    <div
                                        className={cn(
                                            "flex items-center gap-1.5 cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800",
                                            idx === array.length - 1 ? "text-primary font-black scale-105" : "text-muted-foreground font-bold hover:text-foreground"
                                        )}
                                        onClick={() => {
                                            if (idx === 0) updateFilters({ type: "All", jurisdiction: "", dept: "" });
                                            else if (idx === 1) updateFilters({ jurisdiction: "", dept: "" });
                                            else if (idx === 2) updateFilters({ dept: "" });
                                        }}
                                    >
                                        <crumb.icon className={cn("h-3.5 w-3.5", idx === array.length - 1 ? "text-primary" : "")} />
                                        <span className="text-[11px] uppercase tracking-wider">{crumb.label}</span>
                                    </div>
                                </BreadcrumbItem>
                                {idx < array.length - 1 && <BreadcrumbSeparator className="mx-1" />}
                            </div>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40">
                    <Scaling className="h-3 w-3" />
                    <span>Analyse Dimensionnelle</span>
                </div>
            </div>

            {/* Department Navigation (Tabs) */}
            {showDepts && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                    <Tabs value={currentDept} onValueChange={(val) => updateFilters({ dept: val })} className="w-full">
                        <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 h-14 w-full justify-start gap-2 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-x-auto no-scrollbar">
                            {DEPARTMENTS.map((dept) => (
                                <TabsTrigger
                                    key={dept.id}
                                    value={dept.id}
                                    className={cn(
                                        "flex-1 md:flex-none px-6 h-full rounded-xl gap-3 transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:ring-1 data-[state=active]:ring-slate-200",
                                        "hover:bg-white/50 dark:hover:bg-slate-700/50"
                                    )}
                                >
                                    <dept.icon className={cn("h-4 w-4", currentDept === dept.id ? dept.color : "text-slate-400")} />
                                    <span className={cn(
                                        "text-xs font-black uppercase tracking-tight",
                                        currentDept === dept.id ? "text-slate-900 dark:text-slate-100" : "text-slate-500"
                                    )}>
                                        {dept.label}
                                    </span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 bg-primary/5 rounded-full -mr-8 -mt-8 grayscale opacity-20 pointer-events-none">
                    <Landmark className="h-16 w-16" />
                </div>

                {/* Jurisdiction Select */}
                <div className="flex flex-col gap-1.5 min-w-[220px]">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Instance Judiciaire</span>
                    <Select value={currentType} onValueChange={(val) => updateFilters({ type: val, jurisdiction: "" })}>
                        <SelectTrigger className="h-10 text-xs font-bold border-slate-200 bg-slate-50 dark:bg-slate-800 shadow-sm focus:ring-primary">
                            <SelectValue placeholder="Choisir une instance" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            <SelectItem value="All">Toutes les Juridictions</SelectItem>
                            <SelectGroup>
                                <SelectLabel className="text-[10px] uppercase tracking-widest opacity-50 font-black">Droit Commun</SelectLabel>
                                <SelectItem value="Supreme">Cour Suprême</SelectItem>
                                <SelectItem value="CA Lomé">Cour d'Appel de Lomé</SelectItem>
                                <SelectItem value="CA Kara">Cour d'Appel de Kara</SelectItem>
                                <SelectItem value="TGI">Tribunaux de Grande Instance</SelectItem>
                                <SelectItem value="TICCC">Tribunaux d'Instance (TICCC)</SelectItem>
                                <SelectItem value="TICC">Tribunaux d'Instance (TICC)</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel className="text-[10px] uppercase tracking-widest opacity-50 font-black">Spécialisées</SelectLabel>
                                <SelectItem value="Travail">Tribunaux du Travail</SelectItem>
                                <SelectItem value="Commerce">Tribunaux de Commerce</SelectItem>
                                <SelectItem value="Enfants">Tribunaux pour Enfants</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* specific Jurisdiction (Dynamic depending on type) */}
                {(currentType.startsWith("CA") || currentType === "TGI" || currentType === "TICCC" || currentType === "TICC") && (
                    <div className="flex flex-col gap-1.5 min-w-[220px] animate-in fade-in slide-in-from-left-2 transition-all">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Juridiction Spécifique</span>
                        <Select value={currentJurisdiction} onValueChange={(val) => updateFilters({ jurisdiction: val })}>
                            <SelectTrigger className="h-10 text-xs font-bold border-slate-200 bg-slate-50 dark:bg-slate-800 shadow-sm">
                                <SelectValue placeholder="Sélectionner le siège" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                <SelectItem value="All">Tout le ressort</SelectItem>
                                {currentType === "CA Lomé" && JURISDICTION_HIERARCHY["Droit Commun"]["Cour d'Appel"]["Lomé"].map(j => (
                                    <SelectItem key={j} value={j}>{j}</SelectItem>
                                ))}
                                {currentType === "CA Kara" && JURISDICTION_HIERARCHY["Droit Commun"]["Cour d'Appel"]["Kara"].map(j => (
                                    <SelectItem key={j} value={j}>{j}</SelectItem>
                                ))}
                                {currentType === "TGI" && [
                                    "TGI Lomé", "TGI Atakpamé", "TGI Sokodé", "TGI Kara", "TGI Dapaong"
                                ].map(j => (
                                    <SelectItem key={j} value={j}>{j}</SelectItem>
                                ))}
                                {(currentType === "TICCC") && [
                                    "TICCC Tsévié", "TICCC Anèho", "TICCC Vogan", "TICCC Notsè", "TICCC Kpalimé", "TICCC Sotouboua", "TICCC Bassar", "TICCC Kanté", "TICCC Mango"
                                ].map(j => (
                                    <SelectItem key={j} value={j}>{j}</SelectItem>
                                ))}
                                {(currentType === "TICC") && [
                                    "TICC Kévé", "TICC Danyi", "TICC Agou", "TICC Amlamé", "TICC Badou", "TICC Elavagnon", "TICC Tohoun", "TICC Tabligbo", "TICC Blitta", "TICC Tchamba", "TICC Bafilo", "TICC Guérin-kouka", "TICC Pagouda", "TICC Doufelgou", "TICC Tandjouaré", "TICC Mandouri"
                                ].map(j => (
                                    <SelectItem key={j} value={j}>{j}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div className="flex flex-col gap-1.5 min-w-[140px]">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Région</span>
                    <Select value={currentRegion} onValueChange={(val) => updateFilters({ region: val })}>
                        <SelectTrigger className="h-10 text-xs font-bold border-slate-200 bg-slate-50 dark:bg-slate-800 shadow-sm">
                            <SelectValue placeholder="Région" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="National">National (Togo)</SelectItem>
                            <SelectItem value="Maritime">Maritime</SelectItem>
                            <SelectItem value="Plateaux">Plateaux</SelectItem>
                            <SelectItem value="Centrale">Centrale</SelectItem>
                            <SelectItem value="Kara">Kara</SelectItem>
                            <SelectItem value="Savanes">Savanes</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5 min-w-[100px]">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Année</span>
                    <Select value={currentYear} onValueChange={(val) => updateFilters({ year: val })}>
                        <SelectTrigger className="h-10 text-xs font-bold border-slate-200 bg-slate-50 dark:bg-slate-800 shadow-sm">
                            <SelectValue placeholder="Année" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}
