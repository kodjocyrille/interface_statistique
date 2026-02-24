"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AccessJusticeStats } from "@/lib/types";
import { Search, MapPin, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function JusticeMap({ centers }: { centers: AccessJusticeStats['regionalCenters'] }) {
    return (
        <Card className="border-none shadow-sm overflow-hidden h-full">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-primary italic-sans">Carte Interactive du Réseau</CardTitle>
                <CardDescription>Distribution géographique des Maisons de Justice.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 relative bg-slate-100 min-h-[400px] flex items-center justify-center">
                {/* Placeholder for dynamic map component */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale" />

                <div className="relative z-10 w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        {centers.map(center => (
                            <div key={center.id} className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3 transition-transform hover:scale-[1.02]">
                                <div className={`p-2 rounded-full ${center.status === 'Active' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                                    <MapPin className={`w-4 h-4 ${center.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`} />
                                </div>
                                <div className="flex-1">
                                    <h5 className="text-xs font-bold text-slate-900">{center.name}</h5>
                                    <p className="text-[10px] text-muted-foreground">Région {center.region}</p>
                                </div>
                                <Badge variant={center.status === 'Active' ? 'secondary' : 'outline'} className="text-[9px] px-1 py-0 h-5">
                                    {center.status === 'Active' ? 'Actif' : 'Inactif'}
                                </Badge>
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center justify-center">
                        <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center gap-4 text-center">
                            <div className="p-4 bg-primary/10 rounded-full">
                                <Search className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Couverture du Réseau</h4>
                            <p className="text-[10px] text-muted-foreground max-w-[200px] font-medium leading-relaxed">
                                Couvrant actuellement 85% du territoire national. Données mises à jour toutes les 24 heures.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
