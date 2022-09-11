const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const client = new Client({
  allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
    },
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences, 
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});

require(`colors`) 

const { slash, prefix } = require(`${process.cwd()}/functions/cmdErrorLogs.js`);
client.config = require(`${process.cwd()}/json/config.json`);;
client.embed = require(`${process.cwd()}/json/embed.json`);
client.emotes = require(`${process.cwd()}/json/emojis.json`);;
client.slash_err = slash;
client.msg_err = prefix;
client.prefix = client.config.SETTINGS.PREFIX;
client.slashCommands = new Collection();
client.categories = new Collection();
client.cooldowns = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.aliases = new Collection();
client.events = new Collection();
module.exports = client;

[`extraEvents`, `server`, 'command', 'slashCommand', 'events', `antiCrash`].forEach((handler) => {
  require(`./handlers/${handler}`)(client)
});

client.login(process.env.TOKEN).catch((error) => {console.log((error.message).bold.red)});


