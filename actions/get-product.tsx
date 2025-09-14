import { Product } from "@/types";

export default async function getProduct(id: string): Promise<Product | null> {
    try {
        const storeId = '8a053df6-eb77-4a17-b651-535fccee6a32';
        const apiUrl = `http://localhost:3000/api/${storeId}/products/${id}`;
        
        const res = await fetch(apiUrl);
        if (res.ok) {
            const product = await res.json();
            return product;
        }
        return null;
    } catch (error) {
        return null;
    }
}