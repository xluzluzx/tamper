const tamper = (payload) => {
    // Regular expression to replace 'UNION' with '-.1UNION'
    const regex = /\s+(UNION )/gi;

    // Replace 'UNION' with '-.1UNION' if payload exists
    return payload ? payload.replace(regex, '-.1$1') : payload;
}

// Example of using the tamper function with 5 string inputs
const inputs = [
    '1 UNION ALL SELECT',
    '1" UNION ALL SELECT',
    'SELECT UNION ALL',
    'UNION ALL SELECT',
    'test UNION query'
];

// Apply tamper function on each input
inputs.forEach(input => {
    const result = tamper(input);
    console.log(`Original: ${input}`);
    console.log(`Tampered: ${result}`);
});
