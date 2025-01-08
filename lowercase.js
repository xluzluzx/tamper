function detectAndLowercaseSQLKeywords(inputs, keywords) {
    if (!Array.isArray(inputs) || !Array.isArray(keywords)) {
      throw new Error("Inputs and keywords must be arrays.");
    }
  
    return inputs.map((input) => {
      if (typeof input !== "string") {
        return { input, detected: false, transformed: null };
      }
  
      const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  
      const detected = keywordRegex.test(input);
  
      const transformed = input.replace(keywordRegex, (match) => match.toLowerCase());
  
      return { input, detected, transformed };
    });
  }
  
  const sqlKeywords = [
    "SELECT", "INSERT", "UPDATE", "DELETE", "FROM", "WHERE", "JOIN", "ON", "GROUP", "BY", "ORDER", "HAVING",
  ];
  
  const inputs = [
    "SELECT * FROM users WHERE id = 1",
    "INSERT INTO logs (id, message) VALUES (1, 'Test')",
    "UPDATE settings SET value = 'dark' WHERE key = 'theme'",
    "DELETE FROM sessions WHERE expired = 1",
    "CREATE TABLE example (id INT PRIMARY KEY)"
  ];
  
  const results = detectAndLowercaseSQLKeywords(inputs, sqlKeywords);
  console.log(results);
  
  