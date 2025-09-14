import { Billboard } from "@/types";

export default async function getBillboard(id: string): Promise<Billboard | null> {
    const storeId = '8a053df6-eb77-4a17-b651-535fccee6a32';
    const apiUrl = `http://localhost:3000/api/${storeId}/billboards/${id}`;
    
    try {
        const res = await fetch(apiUrl, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!res.ok) {
            return null;
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        return null;
    }
}