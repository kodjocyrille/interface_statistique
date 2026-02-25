
import fs from 'fs';
import path from 'path';
import { JurisdictionsDashboard } from "@/components/JurisdictionsDashboard";

export default async function JurisdictionsPage() {
    // Read JSON data on server
    const filePath = path.join(process.cwd(), 'data', 'judicial-data.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    return (
        <JurisdictionsDashboard initialData={jsonData} />
    );
}
