const randomInt = (max) => Math.floor(Math.random() * max);

// Main tamper function that adds multiple spaces around SQL keywords
function tamper(payload) {
  if (!payload) return payload;

  // SQL keywords that we want to add spaces around
  const sqlKeywords = [
    "SELECT", "INSERT", "UPDATE", "DELETE", "FROM", "WHERE", "JOIN", "ON", "GROUP", "BY", "ORDER", "HAVING"
  ];

  let retVal = payload;

  // Find all SQL keywords in the payload
  const words = new Set();
  const regex = /\b[A-Za-z_]+\b/g;
  let match;
  while ((match = regex.exec(payload)) !== null) {
    const word = match[0].toUpperCase();
    if (sqlKeywords.includes(word)) {
      words.add(word);
    }
  }

  // Add multiple spaces around each SQL keyword
  words.forEach((word) => {
    const wordRegex = new RegExp(`(?<=\\W)${word}(?=[^A-Za-z_\\(]|\\Z)`, 'g');
    const wordRegexWithParenthesis = new RegExp(`(?<=\\W)${word}(?=[(])`, 'g');
    
    // Add random spaces before and after the keyword
    retVal = retVal.replace(wordRegex, (match) => {
      const spacesBefore = ' '.repeat(randomInt(4) + 1); // Random spaces between 1 and 4
      const spacesAfter = ' '.repeat(randomInt(4) + 1); // Random spaces between 1 and 4
      return spacesBefore + match + spacesAfter;
    });

    // Add random spaces before the keyword if it's followed by an opening parenthesis
    retVal = retVal.replace(wordRegexWithParenthesis, (match) => {
      const spacesBefore = ' '.repeat(randomInt(4) + 1); // Random spaces between 1 and 4
      return spacesBefore + match;
    });
  });

  return retVal;
}

// Test examples
const inputs = [
  '1 UNION SELECT foobar',
  'SELECT * FROM users WHERE id = 1',
  'INSERT INTO logs (id, message) VALUES (1, \'Test\')',
  'UPDATE settings SET value = \'dark\' WHERE key = \'theme\'',
  'DELETE FROM sessions WHERE expired = 1'
];

// Apply tamper function on each input
inputs.forEach(input => {
  const result = tamper(input);
  console.log(`Original: ${input}`);
  console.log(`Tampered: ${result}`);
});
