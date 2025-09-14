async function testProducts() {
  console.log('📦 Testing products API...');
  
  const storeId = '8a053df6-eb77-4a17-b651-535fccee6a32';
  
  try {
    const url = `http://localhost:3000/api/${storeId}/products`;
    console.log('Testing URL:', url);
    
    const res = await fetch(url, {
      signal: AbortSignal.timeout(5000)
    });
    
    console.log('Status:', res.status);
    
    if (res.ok) {
      const products = await res.json();
      console.log('✅ Products found:', products.length);
      
      if (products.length > 0) {
        console.log('First product:', products[0].name);
        console.log('Has images:', !!products[0].images?.length);
        console.log('Category:', products[0].category?.name);
      } else {
        console.log('❌ No products in response!');
      }
    } else {
      console.log('❌ API returned error status');
    }
  } catch (error) {
    console.log('❌ Fetch error:', error.message);
  }
}

testProducts();

