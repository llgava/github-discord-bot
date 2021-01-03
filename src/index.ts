require("dotenv").config();
import Discord from 'discord.js';
import WOKCommands from 'wokcommands';
import { Octokit } from "@octokit/core";

const Client = new Discord.Client();
const GitHub = new Octokit({auth: process.env.GITHUB_TOKEN})

Client.on("ready", async () => {
  new WOKCommands(Client, 'commands');

  const res = await GitHub.request("GET /users/{username}/repos", {
    username: "llgava",
  });

  console.clear();
  console.log(res.data.find(repo => repo.full_name === 'llgava/llgava'));
});

Client.login(process.env.BOT_TOKEN);