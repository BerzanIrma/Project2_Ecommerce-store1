import { Category } from '@/types'

export const getCategory = async (id: string): Promise<Category | null> => {
    // Extract store ID from the URL and build correct API endpoint
    const storeUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("=== GET-CATEGORY DEBUG ===");
    console.log("Store URL from env:", storeUrl);
    
    // Temporary hardcoded store ID for testing (replace with your actual store ID)
    const storeId = storeUrl?.split('/').pop() || '75da612b-161b-4112-82ff-28cc32efb6e8';
    console.log("Store ID:", storeId);
    
    const apiUrl = `http://localhost:3000/api/${storeId}/categories/${id}`;
    console.log("Trying API URL for category:", apiUrl);
    console.log("Looking for category ID:", id);
    
    try {
        const res = await fetch(apiUrl);
        console.log("Response status:", res.status);
        
        if (!res.ok) {
            throw new Error(`API returned status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Category data:", data);
        console.log("Billboard in category:", data.billboard);
        console.log("Billboard image URL exists:", !!data.billboard?.imageUrl);
        
        // If category has billboardId but no billboard data, fetch it
        if (data.billboardId && !data.billboard?.imageUrl) {
            console.log("Fetching billboard data for ID:", data.billboardId);
            try {
                const billboardUrl = `http://localhost:3000/api/${storeId}/billboards/${data.billboardId}`;
                const billboardRes = await fetch(billboardUrl);
                if (billboardRes.ok) {
                    const billboardData = await billboardRes.json();
                    console.log("Fetched billboard:", billboardData);
                    data.billboard = billboardData;
                }
            } catch (error) {
                console.log("Failed to fetch billboard:", error);
            }
        }
        
        return data;
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
}