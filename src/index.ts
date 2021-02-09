require("dotenv").config();
import Discord from 'discord.js';
import WOKCommands from 'wokcommands';
import { GitHub } from './utils/GitHub/GitHub';

const Client = new Discord.Client({ partials: ["MESSAGE", "REACTION"] });

Client.on("ready", async () => {
  new WOKCommands(Client, 'commands')
    .setDefaultPrefix('gh ');
  new GitHub();

  console.clear();
});

Client.login(process.env.BOT_TOKEN);

export { GitHub }