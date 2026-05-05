const { detectRaid } = require('../services/antiRaidService');

module.exports = async (client, member) => {

    if (detectRaid(member.guild.id)) {
        member.guild.channels.cache.forEach(channel => {
            if (channel.permissionOverwrites) {
                channel.permissionOverwrites.edit(member.guild.roles.everyone, {
                    SendMessages: false
                }).catch(() => {});
            }
        });
    }

    // New account filter
    const age = Date.now() - member.user.createdTimestamp;
    if (age < 3 * 24 * 60 * 60 * 1000) {
        await member.kick('New account');
    }
};