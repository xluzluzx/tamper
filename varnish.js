function tamper(payload, headers = {}) {
    /**
     * Appends a HTTP header 'X-originating-IP' to bypass Varnish Firewall
     *
     * Example:
     * headers["X-originating-IP"] = "127.0.0.1"
     *
     * @param {string} payload - The payload to be processed.
     * @param {object} headers - The HTTP headers object.
     * @returns {string} - The payload (headers are modified in place).
     */
    
    // Appending the 'X-originating-IP' header
    headers["X-originating-IP"] = "127.0.0.1";
  
    return payload;
  }
  
  // Input strings
  const inputs = [
    "GET /index.php?username=admin HTTP/1.1",
    "POST /login HTTP/1.1",
    "GET /admin HTTP/1.1",
    "POST /register HTTP/1.1",
    "GET /profile HTTP/1.1"
  ];
  
  // Apply tamper function to each input string
  inputs.forEach(input => {
    let headers = {};  // Initialize an empty headers object
    const result = tamper(input, headers);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
    console.log(`Headers: ${JSON.stringify(headers)}`);
  });
  