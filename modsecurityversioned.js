const crypto = require('crypto');

// Helper function to generate a random integer between 0 and a max value
function randomInt(max) {
  return Math.floor(Math.random() * max);
}

// Main tamper function that surrounds the query with a versioned comment for MySQL
function tamper(payload) {
  if (!payload) return payload;

  let retVal = payload;
  let postfix = '';

  // Check for comments (#, --, /*) and extract the postfix if found
  const commentTypes = ['#', '--', '/*'];
  for (let comment of commentTypes) {
    const commentIndex = payload.indexOf(comment);
    if (commentIndex !== -1) {
      postfix = payload.slice(commentIndex);
      payload = payload.slice(0, commentIndex);
      break;
    }
  }

  // If there is a space in the payload, apply the versioned comment
  if (payload.includes(' ')) {
    const versionedComment = `/*!30${randomInt(1000)}${payload.slice(payload.indexOf(' ') + 1)}*/`;
    retVal = `${payload.slice(0, payload.indexOf(' '))} ${versionedComment}${postfix}`;
  }

  return retVal;
}

// Test examples
const inputs = [
  '1 AND 2>1--',
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
