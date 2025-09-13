import { Product } from "@/types";

export default async function getProduct(id: string): Promise<Product | null> {
    try {
        const storeId = '75da612b-161b-4112-82ff-28cc32efb6e8';
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