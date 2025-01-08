function detectIfNullTamper(input) {
    if (typeof input !== "string") {
      return { detected: false, decoded: null };
    }
  
    const ifNullRegex = /IFNULL\(([^,]+),([^\)]+)\)/g;
    const caseWhenRegex = /CASE WHEN ISNULL\(([^")]+)\) THEN \(([^")]+)\) ELSE \(([^")]+)\) END/g;
  
    if (ifNullRegex.test(input)) {
      try {
        const decoded = input.replace(
          ifNullRegex,
          (match, valueA, valueB) => {
            return `CASE WHEN ISNULL(${valueA.trim()}) THEN (${valueB.trim()}) ELSE (${valueA.trim()}) END`;
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
    } else if (caseWhenRegex.test(input)) {
      try {
        const decoded = input.replace(
          caseWhenRegex,
          (match, valueA, valueB, valueC) => {
            return `IFNULL(${valueA.trim()}, ${valueB.trim()})`;
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
  
  const inputs = [
    'CASE WHEN ISNULL(1) THEN (2) ELSE (1) END',
    'IFNULL(3, 4)',
    'CASE WHEN ISNULL(5) THEN (6) ELSE (5) END',
    'IFNULL(7, 8)',
    'CASE WHEN ISNULL(9) THEN (10) ELSE (9) END'
  ];
  
  inputs.forEach((input, index) => {
    const result = detectIfNullTamper(input);
    console.log(`Input ${index + 1}:`, result);
  });
  

  