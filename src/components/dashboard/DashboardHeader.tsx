
"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Region, Year } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentYear = (searchParams.get("year") as Year) || "2026";

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(key, value);
        router.push(`${pathname}?${params.toString()}`);
    };

    const navItems = [
        { name: "Global", href: "/" },
        { name: "Juridictions", href: "/jurisdictions" },
        { name: "Pénitentiaire", href: "/penitentiary" },
        { name: "Accès Justice", href: "/access-justice" },
    ];

    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-white dark:bg-slate-950 px-8 shadow-sm">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-12">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black tracking-[0.3em] text-slate-400 uppercase leading-none">Ministère de la Justice</span>
                        <h1 className="text-sm font-black tracking-tighter text-slate-950 dark:text-slate-100 mt-1 uppercase">
                            StatJustice <span className="text-primary/40">Togo</span>
                        </h1>
                    </div>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all",
                                    pathname === item.href
                                        ? "bg-slate-100 text-[#0a192f] border-b-2 border-[#0a192f]"
                                        : "text-slate-500 hover:text-[#0a192f] hover:bg-slate-50"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 px-4 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Période d'analyse</span>
                        <Select value={currentYear} onValueChange={(val) => updateFilters("year", val)}>
                            <SelectTrigger className="w-[80px] h-6 text-[10px] font-bold border-none shadow-none bg-transparent">
                                <SelectValue placeholder="Année" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none">
                                <SelectItem value="2026" className="text-[10px]">2026</SelectItem>
                                <SelectItem value="2025" className="text-[10px]">2025</SelectItem>
                                <SelectItem value="2024" className="text-[10px]">2024</SelectItem>
                                <SelectItem value="2023" className="text-[10px]">2023</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </header>
    );
}
