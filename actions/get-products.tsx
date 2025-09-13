import { Product } from '@/types'
import qs from 'query-string'

interface Query {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

export const getProducts = async (query: Query): Promise<Product[]> => {
  // Extract store ID from the URL and build correct API endpoint
  const storeUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log("Store URL from env:", storeUrl);
  
  const storeId = storeUrl?.split('/').pop() || '75da612b-161b-4112-82ff-28cc32efb6e8';
  console.log("Store ID:", storeId);
  
  const apiUrl = `http://localhost:3000/api/${storeId}/products`;
  console.log("Base API URL:", apiUrl);

  const url = qs.stringifyUrl({
    url: apiUrl,
    query: {
      categoryId: query.categoryId,
      colorId: query.colorId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    },
  })

  console.log("Fetching products from:", url);

  try {
    const res = await fetch(url)
    console.log("Response status:", res.status);
    
    if (!res.ok) {
      throw new Error(`API returned status: ${res.status}`);
    }
    
    const data = await res.json()
    console.log("Products data:", data);

    // Manual filtering since API doesn't support it yet
    let filteredData = data;

    console.log("=== Products filtering ===");
    console.log("Total products before filtering:", filteredData.length);
    console.log("Filtering by categoryId:", query.categoryId);

  // Filter by categoryId
  if (query.categoryId) {
    console.log("Before categoryId filter:", filteredData.length);
    filteredData = filteredData.filter((product: any) => {
      console.log(`Product ${product.name}: category.id=${product.category?.id}, matches=${product.category?.id === query.categoryId}`);
      return product.category?.id === query.categoryId;
    });
    console.log("After categoryId filter:", filteredData.length);
  }

  // Filter by isFeatured
  if (query.isFeatured !== undefined) {
    filteredData = filteredData.filter((product: any) => 
      product.isFeatured === query.isFeatured
    );
  }

  // Filter by colorId
  if (query.colorId) {
    console.log("Before colorId filter:", filteredData.length);
    filteredData = filteredData.filter((product: any) => {
      console.log(`Product ${product.name}: color.id=${product.color?.id}, matches=${product.color?.id === query.colorId}`);
      return product.color?.id === query.colorId;
    });
    console.log("After colorId filter:", filteredData.length);
  }

  // Filter by sizeId
  if (query.sizeId) {
    console.log("Before sizeId filter:", filteredData.length);
    filteredData = filteredData.filter((product: any) => {
      console.log(`Product ${product.name}: size.id=${product.size?.id}, matches=${product.size?.id === query.sizeId}`);
      return product.size?.id === query.sizeId;
    });
    console.log("After sizeId filter:", filteredData.length);
  }

  console.log("=== Final result ===");
  console.log("Final filtered products count:", filteredData.length);
  console.log("Final products:", filteredData.map((p: any) => ({ name: p.name, categoryId: p.category?.id })));

  return filteredData;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty array if API fails
    return [];
  }
}