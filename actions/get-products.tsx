import { Product } from "@/types";
import qs from "query-string";

 interface Query{
        categoryId?: string;
        colorId?: string;
        sizeId?: string;
       isFeaturedId?: boolean;
    }

const getProducts = async (query: Query): Promise<Product[]> => {
    // Extract store ID from the URL and build correct API endpoint
    const storeUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("Store URL from env:", storeUrl);
    
    // If URL is like http://localhost:3000/api/stores/STORE_ID, extract the STORE_ID
    const storeId = storeUrl?.split('/').pop();
    console.log("Store ID:", storeId);
    
    const baseApiUrl = `http://localhost:3000/api/${storeId}/products`;
    
    const url = qs.stringifyUrl({
        url: baseApiUrl,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            categoryId: query.categoryId,
            isFeatured: query.isFeaturedId,
        },
    });
    
    console.log("Trying API URL with query:", url);
    
    try {
        const res = await fetch(url);
        console.log("Response status:", res.status);
        
        if (!res.ok) {
            throw new Error(`API returned status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log("Products data:", data);
        
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        // Return empty array if API fails
        return [];
    }
};

export default getProducts;