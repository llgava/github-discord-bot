require("dotenv").config();
import Discord from 'discord.js';
import WOKCommands from 'wokcommands';
import { Octokit } from "@octokit/core";

const Client = new Discord.Client({ partials: ["MESSAGE", "REACTION"] });
const GitHub = new Octokit({ auth: process.env.GITHUB_TOKEN });

Client.on("ready", async () => {
  new WOKCommands(Client, 'commands');

  console.clear();
});

Client.login(process.env.BOT_TOKEN);

export { GitHub }