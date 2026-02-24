import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JudicialActivityStats } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function JudicialTable({ data }: { data: JudicialActivityStats }) {
    return (
        <Card className="border-none shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-primary italic-sans">Détails par Juridiction</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-900 border-t">
                        <TableRow>
                            <TableHead className="font-bold text-slate-900 dark:text-slate-100 pl-6">Nom de la Juridiction</TableHead>
                            <TableHead className="font-bold text-slate-900 dark:text-slate-100">Type</TableHead>
                            <TableHead className="font-bold text-slate-900 dark:text-slate-100 text-right">Entrées</TableHead>
                            <TableHead className="font-bold text-slate-900 dark:text-slate-100 text-right">Clôturées</TableHead>
                            <TableHead className="font-bold text-slate-900 dark:text-slate-100 text-right pr-6">Taux de Couverture</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.jurisdictionBreakdown.map((row) => (
                            <TableRow key={row.name} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <TableCell className="font-medium text-slate-900 dark:text-slate-100 pl-6">{row.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-500 border-slate-200">
                                        {row.type === 'First Instance' && '1ère Instance'}
                                        {row.type === 'Appellate' && 'Cour d\'Appel'}
                                        {row.type === 'Supreme' && 'Cour Suprême'}
                                        {row.type === 'Specialized' && 'Spécialisée'}
                                        {!['First Instance', 'Appellate', 'Supreme', 'Specialized'].includes(row.type) && row.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-semibold">{row.inflow.toLocaleString()}</TableCell>
                                <TableCell className="text-right font-semibold">{row.resolved.toLocaleString()}</TableCell>
                                <TableCell className="text-right pr-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className={`font-bold ${row.clearanceRate >= 90 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                            {row.clearanceRate}%
                                        </span>
                                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${row.clearanceRate >= 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                style={{ width: `${Math.min(row.clearanceRate, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
