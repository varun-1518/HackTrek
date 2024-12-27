const responses = {
    greeting: "Hello! I'm here to assist you. How can I help?",
    challenges: "To solve challenges, visit the 'Challenges' page or ask a specific question.",
    no_sql_injection: "For NoSQL Injection: Use patterns like `.*` to retrieve all users and `^admin.*` for admin-specific users. Mitigate this by sanitizing inputs and validating queries.",
    login_admin: "For Login Admin: Use Burp Suite's Intruder with a password list. Implement rate limiting and strong password policies to enhance security.",
    login_testuser: "For Login TestUser: Use NoSQL injection or brute force techniques to discover weak credentials. Enforce proper authentication mechanisms.",
    privacy_policy: "For privacy policies, visit `/privacy-policy`. For restricted documents, ensure access is authorized via `/confidential-document`.",
    bonus_payload: "For bonus payload testing: Try injecting XSS payloads like `<iframe>` or external resources. Enforce CSPs to reduce risks.",
    file_upload: "For File Upload vulnerabilities: Test with unsupported extensions (e.g., `.php`, `.html`). Enforce MIME-type validation and disable execution of uploaded files.",
    xss: "For XSS: Use payloads like `<script>alert('XSS')</script>`. Apply input sanitization and output encoding to prevent script execution.",
    redirect: "For Unvalidated Redirects: Test URLs like `/redirect?target=malicious.com`. Restrict redirections to trusted domains.",
    coupon_code: "Here is your coupon code: COUPON2024", // Added coupon code response
    unknown: "I'm sorry, I don't understand. Could you rephrase?",
};

// Enhanced keyword mappings for specific responses
const keywordMappings = [
    { keywords: ["hello", "hi", "hey"], responseKey: "greeting" },
    { keywords: ["challenge", "solve", "task", "problem"], responseKey: "challenges" },
    { keywords: ["nosql", "injection", "database", "nosql challenge"], responseKey: "no_sql_injection" },
    { keywords: ["login admin", "admin password", "admin login", "login admin challenge"], responseKey: "login_admin" },
    { keywords: ["test user", "login testuser", "login test user"], responseKey: "login_testuser" },
    { keywords: ["privacy", "confidential", "policy"], responseKey: "privacy_policy" },
    { keywords: ["payload", "xss", "cross-site scripting"], responseKey: "bonus_payload" },
    { keywords: ["file upload", "file exploit"], responseKey: "file_upload" },
    { keywords: ["script tag", "script injection", "xss"], responseKey: "xss" },
    { keywords: ["redirect", "open redirect", "url"], responseKey: "redirect" },
    { keywords: ["coupon code"], responseKey: "coupon_code" }, // Added keyword for coupon code
];

// Global counter to track occurrences of "coupon code"
let couponCounter = 0;

/**
 * Function to process user messages.
 * @param {string} message - The input from the user.
 * @returns {string} - Bot response based on detected intent.
 */
const processUserMessage = (message) => {
    const lowerMessage = message.toLowerCase().trim();

    // Check if "coupon code" is mentioned
    if (lowerMessage.includes("coupon code")) {
        couponCounter++;
        if (couponCounter >= 5) {
            couponCounter = 0; // Reset the counter after giving the coupon code
            return responses.coupon_code; // Return the coupon code response
        }
    }

    // Iterate through keyword mappings to find a match
    for (const mapping of keywordMappings) {
        const match = mapping.keywords.some((keyword) => lowerMessage.includes(keyword));
        if (match) {
            return responses[mapping.responseKey];
        }
    }

    // Default fallback response
    return responses.unknown;
};

// Test cases to validate improvements
const testCases = [
    "Hi!",
    "Help me solve NoSQL challenge",
    "Can you assist with NoSQL injection attack?",
    "Tell me about admin login procedures.",
    "What do I do for testuser login?",
    "Where can I find the privacy document?",
    "How do I test a file upload vulnerability?",
    "Explain XSS vulnerabilities.",
    "What is an unvalidated redirect?",
    "This input doesn't match anything.",
    "Help me solve login admin challenge",
    "nosql challenge",
    "I need a coupon code", // Test case for coupon code
    "coupon code", // First time mentioning coupon code
    "coupon code", // Second time mentioning coupon code
    "coupon code", // Third time mentioning coupon code
    "coupon code", // Fourth time mentioning coupon code
    "coupon code" // Fifth time mentioning coupon code
];

// Output results for each test case
testCases.forEach((testCase) => {
    console.log(`User: ${testCase}`);
    console.log(`Bot: ${processUserMessage(testCase)}`);
    console.log("\n");

});

module.exports = { processUserMessage };
