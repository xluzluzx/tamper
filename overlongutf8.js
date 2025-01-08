// Function to tamper payload by converting non-alphanumeric characters to overlong UTF-8 encoding
function tamper(payload) {
    if (!payload) return payload;
  
    let retVal = "";
    let i = 0;
  
    while (i < payload.length) {
      const char = payload[i];
  
      // Check for existing encoded characters
      if (char === '%' && i < payload.length - 2 && /^[0-9A-Fa-f]{2}$/.test(payload[i + 1] + payload[i + 2])) {
        retVal += payload.slice(i, i + 3);
        i += 3;
      } else {
        // For non-alphanumeric characters, convert to overlong UTF-8 encoding
        if (!/^[A-Za-z0-9]$/.test(char)) {
          const utf8First = 0xC0 + (char.charCodeAt(0) >> 6);
          const utf8Second = 0x80 + (char.charCodeAt(0) & 0x3F);
          retVal += `%%${utf8First.toString(16).toUpperCase()}%%${utf8Second.toString(16).toUpperCase()}`;
        } else {
          retVal += char;
        }
        i++;
      }
    }
  
    return retVal;
  }
  
  // Test examples
  const inputs = [
    "SELECT FIELD FROM TABLE WHERE 2>1",
    "INSERT INTO users (name, age) VALUES ('Alice', 30)",
    "UPDATE settings SET theme = 'dark' WHERE user = 'admin'",
    "DELETE FROM logs WHERE created_at < '2021-01-01'",
    "CREATE TABLE example (id INT PRIMARY KEY)"
  ];
  
  // Apply tamper function on each input
  inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
  });
  