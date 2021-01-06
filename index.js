const Discord = require("discord.js")
const client = new Discord.Client({ disableMentions: 'everyone' })
client.commands = new Discord.Collection();
const config = require('./config.json')
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
const app = express ()

app.listen(process.env.PORT)

app.get("/", (req, res) => {
  res.sendStatus(200);
});

client.on('message', async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  });


  client.on("ready", async() => {
    
        function randomStatus() {
      let status = [`©Created By Juliansyah_`, `©Created By Naufal`, `${client.users.cache.size} CUSTOMER`] 
      let rstatus = Math.floor(Math.random() * status.length);
   
      
      client.user.setActivity(status[rstatus], {type: "WATCHING" });
    }; setInterval(randomStatus, 5000)
    
    client.user.setStatus('online').then(console.log).catch(console.error);
      console.log(`Logged in as : ${client.user.tag}`);
      console.log(`${client.user.username} is ready!`)
  
  }, 30000)
  

   client.login(config.TOKEN);