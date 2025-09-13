import { Size } from '@/types'

export const getSizes = async (): Promise<Size[]> => {
    // Extract store ID from the URL and build correct API endpoint
    const storeUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("Store URL from env:", storeUrl);
    
    // If URL is like http://localhost:3000/api/stores/STORE_ID, extract the STORE_ID
    const storeId = storeUrl?.split('/').pop() || '75da612b-161b-4112-82ff-28cc32efb6e8';
    console.log("Store ID:", storeId);
    
    const apiUrl = `http://localhost:3000/api/${storeId}/sizes`;
    console.log("Trying API URL:", apiUrl);
    
    try {
        const res = await fetch(apiUrl);
        console.log("Response status:", res.status);
        
        if (!res.ok) {
            throw new Error(`API returned status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Sizes data:", data);
        
        return data;
    } catch (error) {
        console.error("Error fetching sizes:", error);
        // Return empty array if API fails
        return [];
    }
}