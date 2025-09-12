import { Product } from "@/types";

const getProduct = async (id: string): Promise<Product | null> => {
    // Extract store ID from the URL and build correct API endpoint
    const storeUrl = process.env.NEXT_PUBLIC_API_URL;
    const storeId = storeUrl?.split('/').pop();
    
    const apiUrl = `http://localhost:3000/api/${storeId}/products/${id}`;
    console.log("Fetching product from:", apiUrl);
    
    try {
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
            throw new Error(`API returned status: ${res.status}`);
        }
        
        const product = await res.json();
        console.log("Product data:", product);
        console.log("Product category:", product?.category);
        console.log("Product categoryId:", product?.category?.id);
        
        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};

export default getProduct;