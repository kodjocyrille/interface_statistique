
import { JurisdictionHierarchy } from "@/components/judicial/JurisdictionHierarchy";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function JurisdictionsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 italic-sans">
                            Organisation Judiciaire
                        </h1>
                        <Badge className="bg-[#006a4e] text-white hover:bg-[#005a42] border-none px-4 py-1">
                            Structure Institutionnelle
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-2 max-w-2xl font-medium">
                        Cartographie hiérarchique des juridictions togolaises. Comprendre la répartition des compétences entre les tribunaux de droit commun et les instances spécialisées.
                    </p>
                </div>
            </div>

            <Separator className="bg-slate-200 dark:bg-slate-800" />

            <JurisdictionHierarchy />

            <footer className="mt-20 py-10 border-t border-slate-100 flex flex-col items-center text-center space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#006a4e] rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#ffce00] rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#d21034] rounded-full" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    Ministère de la Justice et de la Législation • Togo
                </p>
            </footer>
        </div>
    );
}
