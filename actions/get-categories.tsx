import { Category } from "@/types";

export const getCategories = async (): Promise<Category[]> => {
    const storeId = '75da612b-161b-4112-82ff-28cc32efb6e8';
    const apiUrl = `http://localhost:3000/api/${storeId}/categories`;
    
    try {
        const res = await fetch(apiUrl);
        
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