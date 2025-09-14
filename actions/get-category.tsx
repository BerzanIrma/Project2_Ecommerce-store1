import { Category } from '@/types'

export const getCategory = async (id: string): Promise<Category | null> => {
    const storeId = '8a053df6-eb77-4a17-b651-535fccee6a32';
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