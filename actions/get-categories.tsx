import { Category } from "@/types";

export const getCategories = async (): Promise<Category[]> => {
    // Extract store ID from the URL and build correct API endpoint
    const storeUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("Store URL from env:", storeUrl);
    
    // If URL is like http://localhost:3000/api/stores/STORE_ID, extract the STORE_ID
    const storeId = storeUrl?.split('/').pop();
    console.log("Store ID:", storeId);
    
    const apiUrl = `http://localhost:3000/api/${storeId}/categories`;
    console.log("Trying API URL:", apiUrl);
    
    try {
        const res = await fetch(apiUrl);
        console.log("Response status:", res.status);
        
        if (!res.ok) {
            throw new Error(`API returned status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Categories data:", data);
        
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        // Return empty array if API fails
        return [];
    }
};

export default getCategories;