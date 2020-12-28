const config = require("./config");
const Canvas = require("canvas");
const Discord = require("discord.js");
const { Server } = require("https");

module.exports = function (client) {

    const description = {
        name: "WelcomeImages",
        filename: "welcome.js",
        version: "4.8"
    }
    //log that the module is loaded
    console.log(` :: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
    //fires every time when someone joins the server
    client.on("guildMemberAdd", async member => {
      const canvas = Canvas.createCanvas(700, 250);
      const ctx = canvas.getContext('2d');
    
      // Since the image takes time to load, you should await it
      const background = await Canvas.loadImage('./welcome.png');
      // This uses the canvas dimensions to stretch the image onto the entire canvas
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      // Use helpful Attachment class structure to process the file for you
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');
    
      channel.send(`Welcome to **WARKOP**, ${member}!`, attachment);

      const welcomeembed = new Discord.MessageEmbed()
      .setColor("#efca8e")
      .setTimestamp()
      .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
      .setDescription(`<@${member.id}> Langsung Aja Verify Di <#791946752768737281> Setelah itu jangan lupa 
      baca rules **WARKOP** di <#778068162801041418> kalo udah bisa langsung ambil role nya di <#791946755964665906> dan bisa langsung tag rolenya di <#791946755964665906>
      betah - betah disini jangan sungkan untuk nimbrung di <#791946758972112897> ataupun room pois!! "Rasakan hangatnya keluarga **WARKOP** STAY ENJOY WITH **WARKOP**`)
      .setImage("attachment://welcome3.png")
      .attachFiles(attachment);
    //define the welcome channel
    const channel = member.guild.channels.cache.find(ch => ch.id === config.welcome);
    //send the welcome embed to there
    channel.send(welcomeembed);
    })
}
