function detectAndReplaceIfNull(input) {
    if (typeof input !== "string") {
      return { detected: false, decoded: null };
    }
  
    const ifNullRegex = /IFNULL\(([^,]+),([^\)]+)\)/g;
  
    if (ifNullRegex.test(input)) {
      try {
        const decoded = input.replace(
          ifNullRegex,
          (match, valueA, valueB) => {
            return `IF(ISNULL(${valueA.trim()}),${valueB.trim()},${valueA.trim()})`;
          }
        );
  
        return {
          detected: true,
          decoded,
        };
      } catch (error) {
        return {
          detected: true,
          decoded: null,
          error: error.message,
        };
      }
    }
  
    return { detected: false, decoded: null };
  }
  
  // Example usage with 5 strings
  const inputs = [
    "IFNULL(1, 2)",
    "IFNULL(a, b)",
    "SELECT IFNULL(3, 4) FROM table", 
    "IFNULL(NULL, 'default')",
    "IFNULL(column1, column2)"
  ];
  
  inputs.forEach((input, index) => {
    const result = detectAndReplaceIfNull(input);
    console.log(`Input ${index + 1}:`, result);
  });
  
  /*
  Expected Output:
  Input 1: { detected: true, decoded: 'IF(ISNULL(1),2,1)' }
  Input 2: { detected: true, decoded: 'IF(ISNULL(a),b,a)' }
  Input 3: { detected: true, decoded: 'SELECT IF(ISNULL(3),4,3) FROM table' }
  Input 4: { detected: true, decoded: "IF(ISNULL(NULL),'default',NULL)" }
  Input 5: { detected: true, decoded: 'IF(ISNULL(column1),column2,column1)' }
  */
  