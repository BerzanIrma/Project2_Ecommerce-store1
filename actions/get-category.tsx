import { Category } from '@/types'

export const getCategory = async (id: string): Promise<Category | null> => {
    const storeId = '75da612b-161b-4112-82ff-28cc32efb6e8';
    const apiUrl = `http://localhost:3000/api/${storeId}/categories/${id}`;
    
    try {
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
            return null;
        }
        
        const data = await res.json();
        
        // If category has billboardId but no billboard data, fetch it
        if (data.billboardId && !data.billboard?.imageUrl) {
            try {
                const billboardUrl = `http://localhost:3000/api/${storeId}/billboards/${data.billboardId}`;
                const billboardRes = await fetch(billboardUrl);
                if (billboardRes.ok) {
                    const billboardData = await billboardRes.json();
                    data.billboard = billboardData;
                }
            } catch (error) {
                // Ignore billboard fetch errors
            }
        }
        
        return data;
    } catch (error) {
        return null;
    }
}