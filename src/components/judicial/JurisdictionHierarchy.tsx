
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Gavel,
    ChevronRight,
    Scale,
    Building2,
    Users2,
    Briefcase,
    Baby,
    Globe2
} from "lucide-react";

export function JurisdictionHierarchy() {
    const commonLawJurisdictions = [
        {
            id: 1,
            name: "La Cour Suprême",
            description: "Plus haute juridiction de l'État en matière judiciaire et administrative.",
            icon: <Globe2 className="w-5 h-5 text-indigo-600" />,
            tag: "Sommet"
        },
        {
            id: 2,
            name: "La Cour d'Appel",
            location: "Lomé, Kara",
            description: "Second degré de juridiction chargé de réexaminer les affaires jugées en premier ressort.",
            icon: <Scale className="w-5 h-5 text-blue-600" />,
            tag: "Appel"
        },
        {
            id: 3,
            name: "Les Tribunaux de Grande Instance (TGI)",
            description: "Juridictions de droit commun compétentes pour les litiges importants.",
            icon: <Building2 className="w-5 h-5 text-emerald-600" />,
            tag: "Instance"
        },
        {
            id: 4,
            name: "Les Tribunaux d'Instance (Compétence Correctionnelle et Civile)",
            description: "Traitent les affaires civiles et pénales de moindre importance.",
            icon: <Gavel className="w-5 h-5 text-amber-600" />,
            tag: "Local"
        },
        {
            id: 5,
            name: "Tribunaux d'Instance à Compétence Civile",
            description: "Spécialisés exclusivement dans les litiges civils du quotidien.",
            icon: <Users2 className="w-5 h-5 text-slate-600" />,
            tag: "Civil"
        },
    ];

    const specializedJurisdictions = [
        {
            name: "Tribunaux du Travail",
            description: "Règlent les litiges entre employeurs et salariés.",
            icon: <Briefcase className="w-5 h-5 text-rose-600" />
        },
        {
            name: "Tribunaux de Commerce",
            description: "Compétents pour les litiges entre commerçants ou relatifs aux actes de commerce.",
            icon: <Scale className="w-5 h-5 text-cyan-600" />
        },
        {
            name: "Tribunaux pour Enfants (Juvéniles)",
            description: "Protègent les mineurs en danger et jugent les mineurs délinquants.",
            icon: <Baby className="w-5 h-5 text-violet-600" />
        },
    ];

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Scale className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                        Juridictions de droit commun
                    </h2>
                </div>

                <div className="relative space-y-4 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                    {commonLawJurisdictions.map((j, idx) => (
                        <Card key={idx} className="relative ml-12 border-none shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-200 to-transparent group-hover:from-primary/50" />
                            <div className="absolute -left-[3.25rem] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-slate-200 dark:bg-slate-900 dark:border-slate-700 flex items-center justify-center z-10">
                                <span className="text-[10px] font-black">{j.id}</span>
                            </div>
                            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover:scale-110 transition-transform">
                                        {j.icon}
                                    </div>
                                    <div>
                                        <CardTitle className="text-sm font-bold">{j.name}</CardTitle>
                                        {j.location && (
                                            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{j.location}</span>
                                        )}
                                    </div>
                                </div>
                                <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest">{j.tag}</Badge>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-xs text-muted-foreground leading-relaxed">{j.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <Gavel className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                        Juridictions spécialisées
                    </h2>
                </div>

                <div className="grid gap-4">
                    {specializedJurisdictions.map((j, idx) => (
                        <Card key={idx} className="border-none shadow-sm hover:ring-2 hover:ring-primary/10 transition-all flex h-full items-stretch overflow-hidden">
                            <div className="w-16 bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                {j.icon}
                            </div>
                            <div className="p-4 flex-1">
                                <h3 className="text-sm font-bold mb-1">{j.name}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">{j.description}</p>
                            </div>
                            <div className="p-4 flex items-center">
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </div>
                        </Card>
                    ))}
                </div>

                <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-none shadow-2xl relative overflow-hidden mt-8">
                    <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full -mr-12 -mt-12" />
                    <CardHeader>
                        <CardTitle className="text-white uppercase tracking-widest text-xs font-black opacity-60">Note Institutionnelle</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm font-medium leading-relaxed opacity-90">
                            L'organisation judiciaire de la République Togolaise est structurée pour garantir une justice de proximité, équitable et spécialisée selon la nature des litiges.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                                        <Users2 className="w-4 h-4 text-slate-400" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">Audité par le Conseil Supérieur de la Magistrature</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
