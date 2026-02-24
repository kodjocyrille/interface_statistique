import { DashboardData, Region, Year, JurisdictionType, JudicialActivityStats, PenitentiaryStats, AccessJusticeStats, ResourceStats } from './types';

export async function fetchDashboardData(region: Region = 'National', year: Year = '2024'): Promise<DashboardData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const multiplier = region === 'National' ? 1 : Math.random() + 0.5;

    return {
        kpis: [
            {
                title: "Population Totale",
                value: Math.floor(8800000 * multiplier).toLocaleString(),
                change: 2.3,
                description: "Croissance annuelle",
                icon: "Users"
            },
            {
                title: "Croissance du PIB",
                value: (5.4 * multiplier).toFixed(1) + "%",
                change: 0.5,
                description: "Variation annuelle",
                icon: "TrendingUp"
            },
            {
                title: "Taux d'Emploi",
                value: (64.2 * multiplier).toFixed(1) + "%",
                change: -0.8,
                description: "Population active",
                icon: "Briefcase"
            },
            {
                title: "Indice d'Éducation",
                value: (0.72 * multiplier).toFixed(2),
                change: 0.04,
                description: "Score de qualité",
                icon: "GraduationCap"
            }
        ],
        monthlyTrends: [
            { name: 'Jan', value: 400 * multiplier },
            { name: 'Fév', value: 330 * multiplier },
            { name: 'Mar', value: 250 * multiplier },
            { name: 'Avr', value: 278 * multiplier },
            { name: 'Mai', value: 189 * multiplier },
            { name: 'Jui', value: 239 * multiplier },
            { name: 'Juil', value: 349 * multiplier }
        ],
        regionalDistribution: [
            { name: 'Maritime', value: 4500 * multiplier },
            { name: 'Plateaux', value: 3200 * multiplier },
            { name: 'Centrale', value: 1800 * multiplier },
            { name: 'Kara', value: 2100 * multiplier },
            { name: 'Savanes', value: 1400 * multiplier }
        ],
        lastUpdated: new Date().toISOString()
    };
}

export async function fetchJudicialActivity(
    region: Region = 'National',
    year: Year = '2024',
    type?: JurisdictionType
): Promise<JudicialActivityStats> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const multiplier = region === 'National' ? 1 : 0.6;

    const inflow = Math.floor(12000 * multiplier);
    const resolved = Math.floor(10500 * multiplier);

    return {
        inflow,
        resolved,
        backlog: Math.floor(4500 * multiplier),
        clearanceRate: Number(((resolved / inflow) * 100).toFixed(1)),
        criminalCases: Math.floor(5500 * multiplier),
        civilCases: Math.floor(6500 * multiplier),
        monthlyTrends: [
            { month: 'Jan', inflow: 850 * multiplier, resolved: 780 * multiplier },
            { month: 'Fév', inflow: 920 * multiplier, resolved: 810 * multiplier },
            { month: 'Mar', inflow: 1100 * multiplier, resolved: 990 * multiplier },
            { month: 'Avr', inflow: 980 * multiplier, resolved: 1050 * multiplier },
            { month: 'Mai', inflow: 1050 * multiplier, resolved: 980 * multiplier },
            { month: 'Jui', inflow: 1200 * multiplier, resolved: 1150 * multiplier },
        ],
        jurisdictionBreakdown: [
            { name: 'Tribunal de Grande Instance Lomé', type: 'First Instance', inflow: 3500, resolved: 3200, clearanceRate: 91.4 },
            { name: 'Tribunal de Kara', type: 'First Instance', inflow: 1200, resolved: 1100, clearanceRate: 91.6 },
            { name: 'Cour d\'Appel de Lomé', type: 'Appellate', inflow: 650, resolved: 580, clearanceRate: 89.2 },
            { name: 'Tribunal du Travail', type: 'Specialized', inflow: 450, resolved: 470, clearanceRate: 104.4 },
            { name: 'Cour Suprême', type: 'Supreme', inflow: 200, resolved: 185, clearanceRate: 92.5 },
        ]
    };
}

export async function fetchPenitentiaryStats(
    region: Region = 'National'
): Promise<PenitentiaryStats> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const multiplier = region === 'National' ? 1 : 0.4;
    const capacity = Math.floor(4500 * multiplier);
    const totalPopulation = Math.floor(6800 * multiplier);
    const occupancyRate = Number(((totalPopulation / capacity) * 100).toFixed(1));

    return {
        totalPopulation,
        capacity,
        occupancyRate,
        overcrowded: occupancyRate > 100,
        demographics: {
            adults: Math.floor(totalPopulation * 0.96),
            minors: Math.floor(totalPopulation * 0.04),
            male: Math.floor(totalPopulation * 0.98),
            female: Math.floor(totalPopulation * 0.02),
        },
        ageGroups: [
            { age: '18-25', male: 1200, female: 45 },
            { age: '26-35', male: 2500, female: 80 },
            { age: '36-45', male: 1800, female: 40 },
            { age: '46-60', male: 900, female: 25 },
            { age: '60+', male: 400, female: 10 },
        ],
        regionalComparison: [
            { region: 'Maritime', population: 3500, capacity: 2000 },
            { region: 'Plateaux', population: 1200, capacity: 800 },
            { region: 'Centrale', population: 600, capacity: 500 },
            { region: 'Kara', population: 900, capacity: 700 },
            { region: 'Savanes', population: 600, capacity: 500 },
        ],
        evolution: [
            { year: 2012, total: 4200 },
            { year: 2014, total: 4800 },
            { year: 2016, total: 5400 },
            { year: 2018, total: 6000 },
            { year: 2020, total: 6400 },
            { year: 2022, total: 6800 },
        ]
    };
}

export async function fetchAccessJusticeData(
    region: Region = 'National'
): Promise<AccessJusticeStats> {
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const multiplier = region === 'National' ? 1 : 0.5;

    return {
        totalHouses: Math.floor(32 * multiplier),
        totalConsultations: Math.floor(85000 * multiplier),
        mediationRatio: 72,
        judicialRatio: 28,
        beneficiaryDemographics: {
            male: 45,
            female: 55
        },
        usageByReason: [
            { reason: 'Droit de la Famille', count: Math.floor(35000 * multiplier) },
            { reason: 'Conflits Fonciers', count: Math.floor(25000 * multiplier) },
            { reason: 'Droit du Travail', count: Math.floor(15000 * multiplier) },
            { reason: 'Conseil Pénal', count: Math.floor(5000 * multiplier) },
            { reason: 'Autres', count: Math.floor(5000 * multiplier) }
        ],
        regionalCenters: [
            { id: '1', name: 'Maison de Justice Lomé', region: 'Maritime', coordinates: [6.1319, 1.2228], status: 'Active' },
            { id: '2', name: 'Maison de Justice Atakpamé', region: 'Plateaux', coordinates: [7.5333, 1.1333], status: 'Active' },
            { id: '3', name: 'Maison de Justice Sokodé', region: 'Centrale', coordinates: [8.9833, 1.1333], status: 'Active' },
            { id: '4', name: 'Maison de Justice Kara', region: 'Kara', coordinates: [9.5511, 1.1925], status: 'Planned' },
            { id: '5', name: 'Maison de Justice Dapaong', region: 'Savanes', coordinates: [10.8583, 0.2078], status: 'Under Construction' }
        ],
        historicalGrowth: [
            { year: 2018, count: 5 },
            { year: 2019, count: 12 },
            { year: 2020, count: 20 },
            { year: 2021, count: 28 },
            { year: 2022, count: 32 }
        ]
    };
}

export async function fetchResourceStats(
    region: Region = 'National'
): Promise<ResourceStats> {
    await new Promise((resolve) => setTimeout(resolve, 1300));

    const multiplier = region === 'National' ? 1 : 0.45;

    return {
        magistratesCount: Math.floor(450 * multiplier),
        adminStaffCount: Math.floor(1200 * multiplier),
        totalBudget: 15.5 * multiplier,
        executionRate: 88.6,
        budgetBreakdown: [
            { category: 'Personnel', value: 70 },
            { category: 'Infrastructures', value: 15 },
            { category: 'Équipement', value: 10 },
            { category: 'Formation', value: 5 }
        ],
        financialEvolution: [
            { year: 2018, budget: 10.2, execution: 9.8 },
            { year: 2019, budget: 11.5, execution: 10.5 },
            { year: 2020, budget: 12.8, execution: 11.2 },
            { year: 2021, budget: 14.0, execution: 13.1 },
            { year: 2022, budget: 15.5, execution: 14.8 }
        ],
        regionalHR: [
            { region: 'Maritime', magistrates: 180, staff: 450 },
            { region: 'Plateaux', magistrates: 80, staff: 200 },
            { region: 'Centrale', magistrates: 50, staff: 150 },
            { region: 'Kara', magistrates: 90, staff: 250 },
            { region: 'Savanes', magistrates: 50, staff: 150 }
        ]
    };
}
