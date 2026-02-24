"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    HelpCircle,
    FileText,
    ChevronLeft,
    ChevronRight,
    Database,
    ShieldCheck,
    ShieldAlert,
    Scale,
    Landmark,
    Gavel,
} from "lucide-react"

import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const items = [
    {
        title: "Vue d'ensemble",
        url: "/",
        icon: LayoutDashboard,
    },
    {
        title: "Activité Judiciaire",
        url: "/judicial-activity",
        icon: FileText,
    },
    {
        title: "Stats Pénitentiaires",
        url: "/penitentiary",
        icon: ShieldAlert,
    },
    {
        title: "Accès à la Justice",
        url: "/access-justice",
        icon: Scale,
    },
    {
        title: "Ressources Ministérielles",
        url: "/resources",
        icon: Landmark,
    },
    {
        title: "Organisation Judiciaire",
        url: "/jurisdictions",
        icon: Gavel,
    },
    {
        title: "Démographie",
        url: "#",
        icon: Users,
    },
    {
        title: "Économie",
        url: "#",
        icon: BarChart3,
    },
]

const secondaryItems = [
    {
        title: "Paramètres",
        url: "#",
        icon: Settings,
    },
    {
        title: "Sécurité",
        url: "#",
        icon: ShieldCheck,
    },
    {
        title: "Aide",
        url: "#",
        icon: HelpCircle,
    },
]

export function AppSidebar() {
    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar shadow-xl">
            <SidebarHeader className="py-6 px-4">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-2xl p-0.5 overflow-hidden">
                        <div className="relative w-full h-full rounded-lg overflow-hidden grid grid-rows-5">
                            <div className="bg-[#006a4e]" />
                            <div className="bg-[#ffce00]" />
                            <div className="bg-[#006a4e]" />
                            <div className="bg-[#ffce00]" />
                            <div className="bg-[#006a4e]" />
                            <div className="absolute top-0 left-0 w-5 h-5 bg-[#d21034] flex items-center justify-center">
                                <span className="text-white text-[10px]">★</span>
                            </div>
                        </div>
                    </div>
                    {state !== "collapsed" && (
                        <div className="flex flex-col">
                            <span className="font-bold text-white tracking-tight leading-none">RÉPUBLIQUE</span>
                            <span className="font-black text-white tracking-widest leading-normal">TOGOLAISE</span>
                            <span className="text-[10px] text-white/50 uppercase tracking-widest font-medium mt-1">Ministère de la Justice</span>
                        </div>
                    )}
                </div>
            </SidebarHeader>
            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white/30 text-[10px] uppercase font-bold px-4 mb-2">Menu Principal</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        className="hover:bg-white/10 active:bg-white/20 text-white/80 hover:text-white transition-all py-6 rounded-lg"
                                    >
                                        <Link href={item.url} className="flex items-center gap-4">
                                            <item.icon className="h-5 w-5" />
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel className="text-white/30 text-[10px] uppercase font-bold px-4 mb-2">Système</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondaryItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        className="hover:bg-white/10 text-white/60 hover:text-white transition-all py-4"
                                    >
                                        <Link href={item.url} className="flex items-center gap-4">
                                            <item.icon className="h-4 w-4" />
                                            <span className="text-sm">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
