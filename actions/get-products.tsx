import { Product } from '@/types'
import qs from 'query-string'

// Extract store ID from the URL and build correct API endpoint
const storeUrl = process.env.NEXT_PUBLIC_API_URL;
const storeId = storeUrl?.split('/').pop();
const URL = `http://localhost:3000/api/${storeId}/products`;

interface Query {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    },
  })

  const res = await fetch(url)
  const data = await res.json()

  // Manual filtering since API doesn't support it yet
  let filteredData = data;

  // Filter by categoryId
  if (query.categoryId) {
    filteredData = filteredData.filter((product: any) => 
      product.categoryId === query.categoryId
    );
  }

  // Filter by isFeatured
  if (query.isFeatured !== undefined) {
    filteredData = filteredData.filter((product: any) => 
      product.isFeatured === query.isFeatured
    );
  }

  // Filter by colorId
  if (query.colorId) {
    filteredData = filteredData.filter((product: any) => 
      product.colorId === query.colorId
    );
  }

  // Filter by sizeId
  if (query.sizeId) {
    filteredData = filteredData.filter((product: any) => 
      product.sizeId === query.sizeId
    );
  }

  return filteredData;
}

export default getProducts;