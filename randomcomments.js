function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function tamper(payload) {
    if (!payload) return payload;
  
    let retVal = payload;
  
    // Regex to match words that consist of letters or underscores (SQL keywords)
    const regex = /\b[A-Za-z_]+\b/g;
  
    retVal = retVal.replace(regex, (word) => {
      // Skip short words (e.g., single-character keywords or identifiers)
      if (word.length < 2) return word;
  
      // Randomly insert comments inside the word
      let result = word[0]; // Start with the first character
  
      for (let i = 1; i < word.length - 1; i++) {
        // Randomly decide whether to insert a comment or not
        result += randomRange(0, 1) === 0 ? `/**/` + word[i] : word[i];
      }
  
      result += word[word.length - 1]; // Append the last character
  
      // If no comment was added, insert it at a random position
      if (!result.includes("/**/")) {
        const index = randomRange(1, word.length - 1);
        result = word.slice(0, index) + "/**/" + word.slice(index);
      }
  
      return result;
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
  