export interface KpiData {
    title: string;
    value: string | number;
    change: number;
    description: string;
    icon: string;
}

export interface ChartData {
    name: string;
    value: number;
    color?: string;
}

export interface DashboardData {
    kpis: KpiData[];
    monthlyTrends: ChartData[];
    regionalDistribution: ChartData[];
    lastUpdated: string;
}

export type Region = 'National' | 'Maritime' | 'Plateaux' | 'Centrale' | 'Kara' | 'Savanes';
export type Year = '2022' | '2023' | '2024' | '2025';
export type JurisdictionType = 'First Instance' | 'Appellate' | 'Supreme' | 'Specialized';

export interface JudicialCaseData {
    month: string;
    inflow: number;
    resolved: number;
}

export interface JudicialActivityStats {
    inflow: number;
    resolved: number;
    backlog: number;
    clearanceRate: number;
    criminalCases: number;
    civilCases: number;
    monthlyTrends: JudicialCaseData[];
    jurisdictionBreakdown: {
        name: string;
        type: JurisdictionType;
        inflow: number;
        resolved: number;
        clearanceRate: number;
    }[];
}

export interface PrisonPopulationEvo {
    year: number;
    total: number;
}

export interface PenitentiaryStats {
    totalPopulation: number;
    capacity: number;
    occupancyRate: number;
    overcrowded: boolean;
    demographics: {
        adults: number;
        minors: number;
        male: number;
        female: number;
    };
    ageGroups: {
        age: string;
        male: number;
        female: number;
    }[];
    regionalComparison: {
        region: string;
        population: number;
        capacity: number;
    }[];
    evolution: PrisonPopulationEvo[];
}

export interface AccessJusticeStats {
    totalHouses: number;
    totalConsultations: number;
    mediationRatio: number; // Percentage
    judicialRatio: number; // Percentage
    beneficiaryDemographics: {
        male: number;
        female: number;
    };
    usageByReason: {
        reason: string;
        count: number;
    }[];
    regionalCenters: {
        id: string;
        name: string;
        region: Region;
        coordinates: [number, number];
        status: 'Active' | 'Planned' | 'Under Construction';
    }[];
    historicalGrowth: {
        year: number;
        count: number;
    }[];
}

export interface ResourceStats {
    magistratesCount: number;
    adminStaffCount: number;
    totalBudget: number; // In millions
    executionRate: number; // Percentage
    budgetBreakdown: {
        category: string;
        value: number;
    }[];
    financialEvolution: {
        year: number;
        budget: number;
        execution: number;
    }[];
    regionalHR: {
        region: Region;
        magistrates: number;
        staff: number;
    }[];
}
