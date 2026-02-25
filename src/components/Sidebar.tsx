
"use client"

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ChevronRight,
    BookOpen,
    Scale
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarProps {
    data: any;
    onSelect: (jurisdictionId: string) => void;
    activeId: string | null;
}

export function Sidebar({ data, onSelect, activeId }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={cn(
            "bg-[#0a192f] flex flex-col h-full transition-all duration-300 border-r border-[#112240]",
            isCollapsed ? "w-16" : "w-72"
        )}>
            {/* Minimal Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                {!isCollapsed && (
                    <div className="flex items-center gap-2 text-slate-100">
                        <Scale className="w-4 h-4 text-blue-400" />
                        <h2 className="text-[11px] font-bold tracking-widest uppercase">
                            Navigation
                        </h2>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10 rounded-none transition-colors"
                >
                    <ChevronRight className={cn("w-4 h-4 transition-transform", !isCollapsed && "rotate-180")} />
                </Button>
            </div>

            <ScrollArea className="flex-1">
                <div className="py-4">
                    <Accordion type="single" collapsible className="w-full px-2">
                        {data.categories.map((category: any, catIdx: number) => (
                            <AccordionItem key={catIdx} value={`cat-${catIdx}`} className="border-none mb-1">
                                <AccordionTrigger className={cn(
                                    "py-3 px-4 hover:no-underline transition-all text-left font-bold text-[10px] uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5",
                                    isCollapsed && "justify-center px-0"
                                )}>
                                    {!isCollapsed && <span>{category.name}</span>}
                                </AccordionTrigger>
                                <AccordionContent className="pb-2 pt-0">
                                    <div className="space-y-0.5 mt-1">
                                        {category.jurisdictions?.map((jurisdiction: any) => (
                                            <button
                                                key={jurisdiction.id}
                                                onClick={() => onSelect(jurisdiction.id)}
                                                className={cn(
                                                    "w-full text-left py-2 px-8 text-[11px] font-medium transition-all",
                                                    activeId === jurisdiction.id
                                                        ? "bg-white text-[#0a192f] font-bold"
                                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                                )}
                                            >
                                                <span className="truncate block uppercase">{jurisdiction.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </ScrollArea>
        </div>
    );
}
