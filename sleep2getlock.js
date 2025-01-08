function tamper(payload, aliasName = 'ETgP') {
    if (!payload) return payload;
  
    // Replace SLEEP(<number>) with GET_LOCK('<alias>', <number>)
    const regex = /SLEEP\((\d+)\)/g;
    payload = payload.replace(regex, (match, p1) => {
      return `GET_LOCK('${aliasName}', ${p1})`;
    });
  
    return payload;
  }
  
  // Test cases
  const inputs = [
    'SELECT * FROM users WHERE id = 1 AND SLEEP(5)',
    'INSERT INTO orders VALUES (1, "test", SLEEP(10))',
    'UPDATE employees SET salary = salary * 1.1 WHERE id = 2 AND SLEEP(3)',
    'SELECT COUNT(*) FROM logs WHERE timestamp > NOW() AND SLEEP(7)',
    'DELETE FROM products WHERE id = 100 AND SLEEP(2)'
  ];
  
  // Apply tamper function to each input string
  inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
  });
  