const { containsLink } = require('../services/linkDetector');

// 🔁 Persistent storage (IMPORTANT)
const userMessages = new Map();
const warnedUsers = new Set();

module.exports = async (client, message) => {
    try {
        if (message.author.bot) return;
        if (!message.guild) return;

        // Ignore admins
        if (message.member.permissions.has("Administrator")) return;

        const userId = message.author.id;
        const now = Date.now();

        // =====================================================
        // 🔗 1. LINK DETECTION (RUN FIRST)
        // =====================================================
        const hasLink =
            containsLink(message.content) ||
            message.attachments.size > 0 ||
            message.embeds.length > 0;

        if (hasLink) {
            console.log("🔗 Link detected:", message.content);

            try {
                await message.delete();

                const warnMsg = await message.channel.send(
                    `🚫 ${message.author}, links are not allowed!`
                );

                setTimeout(() => warnMsg.delete().catch(() => {}), 3000);

            } catch (err) {
                console.error("❌ Failed to delete link:", err.message);
            }

            return; // 🚨 STOP further execution
        }

        // =====================================================
        // ⚡ 2. ANTI-SPAM SYSTEM
        // =====================================================
        if (!userMessages.has(userId)) {
            userMessages.set(userId, []);
        }

        const msgs = userMessages.get(userId).filter(t => now - t < 5000);
        msgs.push(now);
        userMessages.set(userId, msgs);

        console.log(`📊 Spam Count (${message.author.tag}):`, msgs.length);

        // ⚠️ Warning (only once)
        if (msgs.length >= 5 && !warnedUsers.has(userId)) {
            warnedUsers.add(userId);

            const warnMsg = await message.channel.send(
                `⚠️ ${message.author}, please stop spamming!`
            );

            setTimeout(() => warnMsg.delete().catch(() => {}), 3000);

            // Reset warning after 10 sec
            setTimeout(() => warnedUsers.delete(userId), 10000);
        }

        // 🚫 Hard action (timeout)
        if (msgs.length >= 8) {
            try {
                await message.member.timeout(60000, "Spam detected");

                const muteMsg = await message.channel.send(
                    `🚫 ${message.author} has been muted for spamming.`
                );

                setTimeout(() => muteMsg.delete().catch(() => {}), 3000);

            } catch (err) {
                console.error("❌ Timeout failed:", err.message);
            }
        }

    } catch (error) {
        console.error("❌ Message handler error:", error);
    }
};