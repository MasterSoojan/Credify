
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testVerification() {
  const url = 'http://localhost:3000/api/verify'; // Assuming the app is running
  
  console.log("Testing verification API with type: letter...");
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'letter',
        letterText: 'Offer from hr@tcs.com',
        fileName: 'offer.pdf'
      })
    });
    const data = await res.json();
    console.log("Response:", data);
  } catch (e) {
    console.log("Could not connect to local server (expected if not running).");
  }
}

testVerification();
