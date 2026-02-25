
"use client"

import { useState, useMemo, useEffect, Suspense } from "react";
import { Sidebar } from "./Sidebar";
import { JurisdictionContent } from "./JurisdictionContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardHeader } from "./dashboard/DashboardHeader";

export function JurisdictionsDashboard({ initialData }: { initialData: any }) {
    const [selectedJurisdictionId, setSelectedJurisdictionId] = useState<string | null>(null);
    const [selectedDept, setSelectedDept] = useState<string>("siege");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const selectedJurisdiction = useMemo(() => {
        if (!selectedJurisdictionId) return null;

        for (const category of initialData.categories) {
            // Check direct jurisdictions
            if (category.jurisdictions) {
                const found = category.jurisdictions.find((j: any) => j.id === selectedJurisdictionId);
                if (found) return found;
            }
            // Check nested types
            if (category.types) {
                for (const type of category.types) {
                    const found = type.jurisdictions.find((j: any) => j.id === selectedJurisdictionId);
                    if (found) return found;
                }
            }
        }
        return null;
    }, [selectedJurisdictionId, initialData]);

    // Reset department if not valid for selected jurisdiction
    useEffect(() => {
        if (selectedJurisdiction) {
            const type = selectedJurisdiction.type;
            if (type === "TICCC" && selectedDept === "enfants") {
                setSelectedDept("siege");
            } else if (type === "TICC" && selectedDept !== "siege") {
                setSelectedDept("siege");
            }
        }
    }, [selectedJurisdiction, selectedDept]);

    if (!isMounted) {
        return <div className="flex h-screen bg-white dark:bg-slate-950 items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0a192f] rounded-full animate-spin" />
        </div>;
    }

    return (
        <div className="flex h-screen bg-white dark:bg-slate-950 overflow-hidden">
            <Sidebar
                data={initialData}
                onSelect={setSelectedJurisdictionId}
                activeId={selectedJurisdictionId}
            />

            <div className="flex-1 flex flex-col overflow-hidden border-l border-slate-100 dark:border-slate-800">
                <Suspense fallback={<div className="h-16 border-b bg-white dark:bg-slate-950 px-8" />}>
                    <DashboardHeader />
                </Suspense>
                <main className="flex-1 overflow-hidden relative">
                    <ScrollArea className="h-full">
                        <div className="w-full">
                            <JurisdictionContent
                                jurisdiction={selectedJurisdiction}
                                departmentId={selectedDept}
                                onDeptChange={setSelectedDept}
                            />
                        </div>
                    </ScrollArea>
                </main>
            </div>
        </div>
    );
}
