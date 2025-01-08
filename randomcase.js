function randomCase(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
      result += Math.random() < 0.5 ? str[i].toUpperCase() : str[i].toLowerCase();
    }
    return result;
  }
  
  function tamper(payload) {
    if (!payload) return payload;
  
    let retVal = payload;
  
    // Regex to match words that consist of letters or underscores (SQL keywords)
    const regex = /\b[A-Za-z_]{2,}\b/g;
  
    // Replace each keyword with a random case variation
    retVal = retVal.replace(regex, (match) => {
      // Skip if it looks like a function (e.g., SELECT() or some other keyword with parentheses)
      if (match.includes("(")) return match;
  
      // Randomly change the case of each character in the word
      return randomCase(match);
    });
  
    return retVal;
  }
  
  // Test cases
  const inputs = [
    "SELECT * FROM users WHERE id = 1",
    "INSERT INTO table (name, age) VALUES ('John', 30)",
    "UPDATE users SET name = 'Alice' WHERE id = 2",
    "DELETE FROM employees WHERE id = 5",
    "CREATE TABLE my_table (id INT, name VARCHAR(100))"
  ];
  
  // Apply tamper function to each input string
  inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
  });
  