function detectAndAddInlineComment(input) {
    if (typeof input !== "string") {
      return { detected: false, modified: null };
    }
  
    const regex = /(information_schema)\./gi;
  
    if (regex.test(input)) {
      try {
        const modified = input.replace(regex, "$1/**/.");
  
        return {
          detected: true,
          modified,
        };
      } catch (error) {
        return {
          detected: true,
          modified: null,
          error: error.message,
        };
      }
    }
  
    return { detected: false, modified: null };
  }
  
  // Example usage with 5 strings
  const inputs = [
    "SELECT table_name FROM INFORMATION_SCHEMA.TABLES",
    "SELECT column_name FROM information_schema.COLUMNS WHERE table_name = 'users'",
    "SELECT * FROM INFORMATION_SCHEMA.SCHEMATA",
    "USE information_schema;",
    "SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'test'"
  ];
  
  inputs.forEach((input, index) => {
    const result = detectAndAddInlineComment(input);
    console.log(`Input ${index + 1}:`, result);
  });
  

  