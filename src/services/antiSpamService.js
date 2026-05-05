const userMessages = new Map();

function isSpamming(userId) {
    const now = Date.now();

    if (!userMessages.has(userId)) {
        userMessages.set(userId, []);
    }

    const msgs = userMessages.get(userId).filter(t => now - t < 5000);
    msgs.push(now);
    userMessages.set(userId, msgs);

    return msgs.length >= 5;
}

module.exports = { isSpamming };