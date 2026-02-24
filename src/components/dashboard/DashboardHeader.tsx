"use client"

import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Region, Year } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function DashboardHeader() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentRegion = (searchParams.get("region") as Region) || "National";
    const currentYear = (searchParams.get("year") as Year) || "2024";

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.push(`?${params.toString()}`);
    };

    return (
        <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center border-b bg-white/95 dark:bg-slate-900/95 px-6 backdrop-blur-md shadow-sm">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-6">
                    <SidebarTrigger className="md:hidden" />
                    <Separator orientation="vertical" className="h-8 md:hidden" />

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black tracking-[0.2em] text-primary uppercase">Ministère de la Justice</span>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">République Togolaise</span>
                        </div>
                        <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 italic-sans mt-0.5">
                            StatJustice <span className="text-primary">Togo</span>
                        </h1>
                        <span className="text-[8px] font-medium text-muted-foreground uppercase tracking-widest leading-none">Service de l'Information et des Statistiques</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 ml-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Année</span>
                        <Select value={currentYear} onValueChange={(val) => updateFilters("year", val)}>
                            <SelectTrigger className="w-[100px] h-8 text-[11px] font-bold border-none shadow-none bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 focus:ring-1">
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

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Région</span>
                        <Select value={currentRegion} onValueChange={(val) => updateFilters("region", val)}>
                            <SelectTrigger className="w-[140px] h-8 text-[11px] font-bold border-none shadow-none bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 focus:ring-1">
                                <SelectValue placeholder="Région" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="National">National (Togo)</SelectItem>
                                <SelectItem value="Maritime">Région Maritime</SelectItem>
                                <SelectItem value="Plateaux">Région des Plateaux</SelectItem>
                                <SelectItem value="Centrale">Région Centrale</SelectItem>
                                <SelectItem value="Kara">Région de la Kara</SelectItem>
                                <SelectItem value="Savanes">Région des Savanes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </header>
    );
}
