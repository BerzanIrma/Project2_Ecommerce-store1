import { Product } from '@/types'
import qs from 'query-string'

interface Query {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  const storeId = '8a053df6-eb77-4a17-b651-535fccee6a32';
  const apiUrl = `http://localhost:3000/api/${storeId}/products`;

  const url = qs.stringifyUrl({
    url: apiUrl,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    },
  })

  try {
    const res = await fetch(url, {
    signal: AbortSignal.timeout(15000),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })

    if (!res.ok) {
      return [];
    }

    const data = await res.json()

    // Manual filtering since API doesn't support it yet
    let filteredData = data;


  // Filter by categoryId
  if (query.categoryId) {
    filteredData = filteredData.filter((product: any) => {
      return product.category?.id === query.categoryId;
    });
  }

  // Filter by isFeatured
  if (query.isFeatured !== undefined) {
    filteredData = filteredData.filter((product: any) => 
      product.isFeatured === query.isFeatured
    );
  }

  // Filter by colorId
  if (query.colorId) {
    filteredData = filteredData.filter((product: any) => {
      return product.color?.id === query.colorId;
    });
  }

  // Filter by sizeId
  if (query.sizeId) {
    filteredData = filteredData.filter((product: any) => {
      return product.size?.id === query.sizeId;
    });
  }

  return filteredData;
  } catch (error) {
    return [];
  }
}