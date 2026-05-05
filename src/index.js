const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const commandHandler = require('./handlers/commandHandler');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
    ],
});

client.commands = new Collection();
client.once('ready', () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);
});
// Load handlers
eventHandler(client);
commandHandler(client);

client.login(process.env.DISCORD_TOKEN);