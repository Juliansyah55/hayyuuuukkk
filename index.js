const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ytdl = require("ytdl-core");
client.commands = new Discord.Collection();
const config = require('./config.json')
const snek = require("node-superfetch")
const dotenv = require("dotenv")
const Canvas = require("canvas")

const welcome = require("./welcome");
welcome(client);

client.aliases = new Discord.Collection();
client.snipes = new Map();
const queue = new Map();
const fs = require('fs')
const ms = require('ms')

const http = require('http');
const express = require('express');
const { measureMemory } = require('vm');
const app = express ()

app.listen(process.env.PORT)

app.get("/", (req, res) => {
  res.sendStatus(200);
});

client.on('message', async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;


    let prefix = (config.prefix);
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let sender = message.author;
    if (message == `<@${client.user.id}>` || message == `<@!${client.user.id}>`) {
    message.channel.send(`**Prefix Saya : ${prefix}**`)
  }

  if(!message.content.startsWith(prefix)) return undefined;
  message.prefix = prefix;

    if(!msg.startsWith(prefix)) return;//---------------------

    try {
        let commandFile = require(`./cmds/${command}.js`); 
        commandFile.run(client, message, args); 
    } catch(e) { 
        console.log(e.message); 
    } finally { 
        console.log(`${message.author.tag} menggunakan command: ${command} di ${message.guild.name}`);
    }
  
  });


  client.on("ready", async() => {
    client.user.setStatus('online').then(console.log).catch(console.error);
      console.log(`Logged in as : ${client.user.tag}`);
      console.log(`${client.user.username} is ready!`)
  
  }, 30000)
  


   client.login(config.TOKEN);