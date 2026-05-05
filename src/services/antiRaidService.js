const joinTracker = new Map();

function detectRaid(guildId) {
    const now = Date.now();

    if (!joinTracker.has(guildId)) {
        joinTracker.set(guildId, []);
    }

    const joins = joinTracker.get(guildId).filter(t => now - t < 10000);
    joins.push(now);
    joinTracker.set(guildId, joins);

    return joins.length >= 5;
}

module.exports = { detectRaid };