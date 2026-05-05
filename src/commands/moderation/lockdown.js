const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lockdown')
        .setDescription('Lock the server'),

    async execute(interaction) {
        const channels = interaction.guild.channels.cache;

        channels.forEach(channel => {
            channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                SendMessages: false
            }).catch(() => {});
        });

        await interaction.reply('🔒 Server locked');
    }
};