function randomIP() {
    let octets = [];
  
    // Ensure the first octet is from a private IP range (10.x.x.x, 172.x.x.x, or 192.x.x.x)
    while (octets.length === 0 || ![10, 172, 192].includes(octets[0])) {
      octets = Array.from({ length: 4 }, () => Math.floor(Math.random() * 255) + 1);
    }
  
    return octets.join('.');
  }
  
  function tamper(payload, headers = {}) {
    /**
     * Appends fake HTTP headers such as 'X-Forwarded-For', 'X-Real-Ip', etc.
     * to simulate different IP addresses.
     *
     * @param {string} payload - The request payload.
     * @param {object} headers - Optional headers object to append fake headers.
     * @returns {object} - Updated headers and original payload.
     */
  
    // Append fake headers
    headers["X-Forwarded-For"] = randomIP();
    headers["X-Client-Ip"] = randomIP();
    headers["X-Real-Ip"] = randomIP();
    headers["CF-Connecting-IP"] = randomIP();
    headers["True-Client-IP"] = randomIP();
  
    // Add Cloudflare header for IP country
    const countries = ['GB', 'US', 'FR', 'AU', 'CA', 'NZ', 'BE', 'DK', 'FI', 'IE', 'AT', 'IT', 'LU', 'NL', 'NO', 'PT', 'SE', 'ES', 'CH'];
    headers["CF-IPCountry"] = countries[Math.floor(Math.random() * countries.length)];
  
    // Add the 'Via' header to simulate proxy connection
    headers["Via"] = "1.1 Chrome-Compression-Proxy";
  
    return { payload, headers };
  }
  
  // Test cases for tamper function with 5 input strings
  const inputs = [
    "GET /index.html HTTP/1.1",
    "POST /login HTTP/1.1",
    "PUT /update HTTP/1.1",
    "DELETE /remove HTTP/1.1",
    "PATCH /modify HTTP/1.1"
  ];
  
  // Apply tamper function to each input string and output the result
  inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Headers: ${JSON.stringify(result.headers)}`);
    console.log(`Payload: ${result.payload}`);
  });
  