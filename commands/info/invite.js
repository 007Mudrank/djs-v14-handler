const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'invite',
	description: "Get the bot's invite link",
	cooldown: 30,
	userPerms: "",
	botPerms: "",
	run: async (client, message, args) => {
    try {      
		const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID || client.config.CLIENT.ID}&permissions=8&scope=bot%20applications.commands`;
		const embed = new EmbedBuilder()
		.setTitle('Invite me')
		.setDescription(`Invite the bot to your server. [Click here](${inviteUrl}) ${client.emotes.MESSAGE.y}`)
		.setColor('#03fcdb')
		.setTimestamp()
		.setThumbnail(client.user.displayAvatarURL())
		.setFooter({ text: client.user.tag })

		const actionRow = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(inviteUrl)
			.setStyle(5)
		])
		message.reply({ embeds: [embed], components: [actionRow] })
    } catch (error) { 
      client.msg_err(client, message, error);
    }
	}
};
