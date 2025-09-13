// Get billboard details to find the real image URL
const storeId = '75da612b-161b-4112-82ff-28cc32efb6e8';
const billboardId = 'f253608d-5c16-4072-8e8d-1e1b80f79a40'; // test-imag5

fetch(`http://localhost:3000/api/${storeId}/billboards/${billboardId}`)
  .then(res => {
    console.log('Billboard API Status:', res.status);
    return res.json();
  })
  .then(data => {
    console.log('=== BILLBOARD DETAILS ===');
    console.log('ID:', data.id);
    console.log('Label:', data.label);
    console.log('ImageURL:', data.imageUrl);
    console.log('Full data:', JSON.stringify(data, null, 2));
  })
  .catch(err => console.error('Error:', err));

