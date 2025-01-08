function tamper(payload) {
    if (!payload) return payload;
  
    // Use regular expression to split the schema identifiers like 'testdb.users' into 'testdb 9.e.users'
    return payload.replace(/(?)( FROM \w+)\.(\w+)/g, (match, p1, p2) => {
      return `${p1} 9.e.${p2}`;
    });
  }
  
  // Test cases
  const inputs = [
    "SELECT id FROM testdb.users",
    "INSERT INTO testdb.customers (name, age) VALUES ('Alice', 30)",
    "UPDATE testdb.products SET price = 100 WHERE id = 1",
    "DELETE FROM testdb.orders WHERE order_id = 123",
    "SELECT name FROM testdb.users WHERE id = 2"
  ];
  
  // Apply tamper function to each input string
  inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
  });
  