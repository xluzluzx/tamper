function tamper(payload) {
    let retVal = '';
  
    if (payload) {
      let quote = false;
      let doublequote = false;
      let firstspace = false;
  
      for (let i = 0; i < payload.length; i++) {
        if (!firstspace) {
          if (payload[i].isspace()) {
            firstspace = true;
            retVal += '/**/';
            continue;
          }
        } else if (payload[i] === '\'') {
          quote = !quote;
        } else if (payload[i] === '"') {
          doublequote = !doublequote;
        } else if (payload[i] === ' ' && !doublequote && !quote) {
          retVal += '/**/';
          continue;
        }
  
        retVal += payload[i];
      }
    }
  
    return retVal;
  }
  
  // Test cases
  const inputs = [
    'SELECT id FROM users',
    'INSERT INTO users (name, age) VALUES ("John", 30)',
    'UPDATE users SET age = 31 WHERE name = "John"',
    'DELETE FROM users WHERE id = 1',
    'SELECT * FROM orders WHERE price > 100'
  ];
  
  // Apply tamper function to each input string
  inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
  });
  