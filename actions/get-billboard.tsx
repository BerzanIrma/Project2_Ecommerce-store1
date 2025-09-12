import { Billboard } from "@/types";

const getBillboard = async (id: string): Promise<Billboard> => {
    // Extract store ID from the URL and build correct API endpoint
    const storeUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("Store URL from env:", storeUrl);
    
    // If URL is like http://localhost:3000/api/stores/STORE_ID, extract the STORE_ID
    const storeId = storeUrl?.split('/').pop();
    console.log("Store ID:", storeId);
    
    const apiUrl = `http://localhost:3000/api/${storeId}/billboards/${id}`;
    console.log("Trying API URL:", apiUrl);
    
    try {
        console.log("Attempting to fetch from:", apiUrl);
        const res = await fetch(apiUrl);
        console.log("Response status:", res.status);
        console.log("Response ok:", res.ok);
        
        if (!res.ok) {
            const errorText = await res.text();
            console.log("Error response text:", errorText);
            throw new Error(`API returned status: ${res.status} - ${errorText}`);
        }
        
        const data = await res.json();
        console.log("Billboard data:", data);
        
        return data;
    } catch (error) {
        console.error("Detailed error fetching billboard:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        
        // Return mock data temporarily to see the rest of the app
        return { 
            id: "temp", 
            label: "Temporary Billboard", 
            imageUrl: "https://via.placeholder.com/800x400/cccccc/666666?text=Billboard+Placeholder" 
        };
    }
};

export default getBillboard;