import { Size } from '@/types'

export const getSizes = async (): Promise<Size[]> => {
    // Extract store ID from the URL and build correct API endpoint
    const storeId = '75da612b-161b-4112-82ff-28cc32efb6e8';
    const apiUrl = `http://localhost:3000/api/${storeId}/sizes`;
    
    try {
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
            console.log(`Sizes not found (${res.status}), returning empty array`);
            return [];
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching sizes:", error);
        return [];
    }
}