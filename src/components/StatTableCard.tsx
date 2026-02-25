
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StatTableCardProps {
    table: {
        id: string;
        title: string;
        columns: string[];
        data: any[];
        chartConfig?: {
            xAxis: string;
            lines: { key: string, name: string, color: string }[];
        }
    };
    compact?: boolean;
}

export function StatTableCard({ table, compact = false }: StatTableCardProps) {
    const [selectedYear, setSelectedYear] = useState<string>(
        table.data[table.data.length - 1]?.year || ""
    );

    const filteredData = table.data.filter(d => !selectedYear || d.year === selectedYear);
    const years = Array.from(new Set(table.data.map(d => d.year)));

    return (
        <Card className="rounded-none border-slate-200 shadow-[0_4px_20px_-4px_rgba(10,25,47,0.08)] bg-white overflow-hidden group">
            <CardHeader className={cn(
                "flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100 bg-slate-50/30",
                compact ? "px-5 py-3.5" : "px-6 py-5"
            )}>
                <CardTitle className={cn(
                    "font-extrabold uppercase tracking-[0.15em] text-[#0a192f] flex items-center gap-3",
                    compact ? "text-[10px]" : "text-[12px]"
                )}>
                    <div className={cn("w-1 bg-[#0a192f]", compact ? "h-3.5" : "h-5")} />
                    {table.title}
                </CardTitle>
                <div className="flex items-center gap-4">
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className={cn(
                            "font-bold rounded-none border-slate-200 bg-white shadow-none",
                            compact ? "h-6 w-[90px] text-[9px]" : "h-7 w-[110px] text-[10px]"
                        )}>
                            <SelectValue placeholder="Année" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                            <SelectItem value="all" className="text-[10px] font-medium">Toutes les années</SelectItem>
                            {years.map(year => (
                                <SelectItem key={year} value={year} className="text-[10px] font-medium">{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className={cn(
                "pb-6",
                compact ? "pt-4 px-5" : "pt-10 px-8"
            )}>
                <div className="flex flex-col gap-8">
                    {/* Chart Section - Hidden if compact */}
                    {table.chartConfig && !compact && (
                        <div className="h-[450px] w-full bg-[#f8fafc] p-8 border border-slate-100 flex flex-col">
                            {/* Chart will be rendered here if not compact */}
                        </div>
                    )}

                    {/* Table Section */}
                    <div className="bg-white border border-slate-100 shadow-sm overflow-hidden rounded-none">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow className="hover:bg-transparent border-b-2 border-slate-100">
                                    {table.columns.map((column, i) => (
                                        <TableHead key={i} className={cn(
                                            "font-extrabold text-[#0a192f] uppercase tracking-[0.2em] whitespace-nowrap",
                                            compact ? "text-[9px] h-10 px-4" : "text-[11px] h-14 px-8",
                                            i === table.columns.length - 1 && "text-right"
                                        )}>
                                            {column}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(selectedYear === "all" ? table.data : filteredData).map((row, rowIndex) => (
                                    <TableRow key={rowIndex} className={cn(
                                        "border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors",
                                        compact ? "h-11" : "h-16"
                                    )}>
                                        {table.columns.map((column, colIndex) => {
                                            const cellValue = row[column] ?? row[column.toLowerCase()] ?? (colIndex === 0 ? (row.indicateur ?? "-") : (row.valeur ?? 0));
                                            return (
                                                <TableCell
                                                    key={colIndex}
                                                    className={cn(
                                                        "transition-all",
                                                        colIndex === 0
                                                            ? "font-bold text-slate-700"
                                                            : "font-black text-[#0a192f] text-right",
                                                        compact
                                                            ? (colIndex === 0 ? "text-[10px] px-4" : "text-[12px] px-4")
                                                            : (colIndex === 0 ? "text-[12px] px-8" : "text-[14px] px-8 pr-12")
                                                    )}
                                                >
                                                    {cellValue}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
