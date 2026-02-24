import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-8 w-8 rounded-lg" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-[120px] mb-2" />
                            <Skeleton className="h-3 w-[150px]" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Skeleton className="lg:col-span-4 h-[400px] rounded-xl" />
                <Skeleton className="lg:col-span-3 h-[400px] rounded-xl" />
            </div>
        </div>
    );
}

export function ErrorState({ message }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-12 min-h-[400px] bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <div className="p-4 bg-rose-50 text-rose-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Information Retrieval Failed</h3>
            <p className="text-muted-foreground text-center max-w-sm mt-2">
                {message || "We encountered an error while communicating with the central database. Please attempt to refresh the page."}
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-all"
            >
                Retry Connection
            </button>
        </div>
    );
}
