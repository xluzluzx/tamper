const crypto = require('crypto');

function tamper(payload, delimiter = "&") {
    // Generate 500 random parameter names, similar to the Python function
    let hintsPrepend = '';
    for (let i = 0; i < 500; i++) {
        const randomParam = crypto.randomBytes(1).toString('hex') + crypto.randomBytes(1).toString('hex');
        hintsPrepend += `${randomParam}=${randomParam}&`;
    }

    // Remove the trailing '&' from the string
    hintsPrepend = hintsPrepend.slice(0, -1);

    return {
        hintsPrepend,
        payload
    };
}

// Example of using the tamper function with 5 string inputs
const payload = "1 AND 2>1"; // Example payload
const result = tamper(payload);
console.log("Prepend:", result.hintsPrepend);
console.log("Payload:", result.payload);
