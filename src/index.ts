require("dotenv").config();
import Discord from 'discord.js';
import WOKCommands from 'wokcommands';

const Client = new Discord.Client();

Client.on("ready", () => {
  new WOKCommands(Client, 'commands');
  
  console.clear();
  console.log('O bot está online.');
});

Client.login(process.env.BOT_TOKEN);