module.exports = async (client, channel) => {
    const logs = await channel.guild.fetchAuditLogs({
        limit: 1,
        type: 12
    });

    const entry = logs.entries.first();
    if (!entry) return;

    const executor = entry.executor;

    const member = await channel.guild.members.fetch(executor.id);
    await member.ban({ reason: 'Anti-nuke triggered' });

    await channel.guild.channels.create({
        name: channel.name,
        type: channel.type
    });
};