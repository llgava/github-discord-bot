const { UsersRepos } = require('../utils/GitHub/UsersRepos');
const { Message } = require('discord.js');

const UR = new UsersRepos('llgava');

module.exports = {

  /**
   * @param {Message} msg 
   */
  run: (msg) => {
    msg.channel.send('Foi encontrado o total de ' + UR.repos_amount + ' em bla bla bla.')
  }
}