const { Users } = require('../utils/GitHub/Users');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {

  /**
   * @param {Message} msg 
   */
  run: async (msg, args) => {
    const Username = args[0];
    const Message = new MessageEmbed();
    const GitHub = new Users(Username);
    const Author = {
      username: msg.author.tag,
      avatar_url: msg.author.avatarURL()
    };

    msg.delete({ timeout: 5000 });

    GitHub.getUsersData()
      .then(req => {
        Message
          .setColor("#B17EFF")
          .setTitle(req.name)
          .setURL(req.profile_url)
          .setThumbnail(req.avatar_url)
          .setDescription(req.biography)
          .addFields(
            { name: "Followers", value: `This user has ${req.followers} followers.`, inline: true },
            { name: '\u200b', value: '\u200b', inline: true },
            { name: "Following", value: `This user are following ${req.following} peoples.`, inline: true }
          )
          .addFields(
            { name: "Public Repositories", value: `This user has ${req.repos_amount} repositories.`, inline: true },
            { name: '\u200b', value: '\u200b', inline: true },
            { name: "Public Gists", value: `This user has ${req.gists_amount} gists.`, inline: true }
          )
          .addField("Company", req.company, false)
          .setFooter(`Requested by ${Author.username}`, Author.avatar_url)
      })
      .catch(req => {
        Message
          .setColor("#ED2939")
          .addFields({ name: "Erro", value: req.message, inline: true })
      })
      .finally(() => {
        msg.channel.send(Message);
      })
  }
}