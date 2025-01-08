// Main tamper function that replaces ORD() with ASCII()
function tamper(payload) {
    if (!payload) return payload;
  
    // Replace all occurrences of ORD() with ASCII()
    return payload.replace(/\bORD\(/gi, "ASCII(");
  }
  
  // Test examples
  const inputs = [
    "ORD('42')",
    "SELECT * FROM users WHERE id = ORD(1)",
    "INSERT INTO logs (id, message) VALUES (ORD('test'), 'example')",
    "UPDATE settings SET value = ORD('dark') WHERE key = 'theme'",
    "ORD('hello')"
  ];
  
  // Apply tamper function on each input
  inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
  });
  