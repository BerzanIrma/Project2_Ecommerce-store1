import { Size } from '@/types'

export const getSizes = async (): Promise<Size[]> => {
    // Extract store ID from the URL and build correct API endpoint
    const storeId = '8a053df6-eb77-4a17-b651-535fccee6a32';
    const apiUrl = `http://localhost:3000/api/${storeId}/sizes`;
    
    try {
        const res = await fetch(apiUrl, {
            signal: AbortSignal.timeout(3000)
        });
        
        if (!res.ok) {
            return [];
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        return [];
    }
}