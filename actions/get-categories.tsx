import { Category } from "@/types";

export const getCategories = async (): Promise<Category[]> => {
    const storeId = '8a053df6-eb77-4a17-b651-535fccee6a32';
    const apiUrl = `http://localhost:3000/api/${storeId}/categories`;
    
    try {
        const res = await fetch(apiUrl, {
            signal: AbortSignal.timeout(15000),
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!res.ok) {
            return [];
        }
        
        const data = await res.json();
        return data;
    } catch (error) {
        return [];
    }
};

export default getCategories;