const { containsLink } = require('../services/linkDetector');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    // Ignore admins (optional)
    if (message.member.permissions.has("Administrator")) return;

    if (containsLink(message.content)) {

        // ✅ DELETE MESSAGE
        await message.delete().catch(() => {});

        // ✅ SEND WARNING (auto delete after 3 sec)
        const warnMsg = await message.channel.send(
            `🚫 ${message.author}, links are not allowed!`
        );

        setTimeout(() => {
            warnMsg.delete().catch(() => {});
        }, 3000);
    }
};