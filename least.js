function detectAndReplaceGreaterThan(input) {
    if (typeof input !== "string") {
      return { detected: false, modified: null };
    }
  
    const regex = /\b(AND|OR)\b\s+([^>]+?)\s*>\s*(\w+|'[^']+')/gi;
  
    if (regex.test(input)) {
      try {
        const modified = input.replace(regex, (match, logicalOperator, leftOperand, rightOperand) => {
          return `${logicalOperator} LEAST(${leftOperand.trim()}, ${rightOperand.trim()} + 1) = ${rightOperand.trim()} + 1`;
        });
  
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
    "1 AND A > B",
    "A OR B > C",
    "X AND Y > 'Z'",
    "Q OR P > 10",
    "SELECT * FROM table WHERE col1 > col2 AND col3 > 5"
  ];
  
  inputs.forEach((input, index) => {
    const result = detectAndReplaceGreaterThan(input);
    console.log(`Input ${index + 1}:`, result);
  });
  
  /*
  Expected Output:
  Input 1: { detected: true, modified: '1 AND LEAST(A,B+1)=B+1' }
  Input 2: { detected: true, modified: 'A OR LEAST(B,C+1)=C+1' }
  Input 3: { detected: true, modified: 'X AND LEAST(Y,'Z'+1)='Z'+1' }
  Input 4: { detected: true, modified: 'Q OR LEAST(P,10+1)=10+1' }
  Input 5: { detected: true, modified: 'SELECT * FROM table WHERE col1 > col2 AND LEAST(col3,5+1)=5+1' }
  */
  