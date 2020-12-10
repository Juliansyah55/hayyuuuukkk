const config = require("./config");
const Canvas = require("canvas");
const Discord = require("discord.js");

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
      //If not in a guild return
      if(!member.guild) return;
      //create a new Canvas
      const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(`./welcome2.png`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#ffcb81';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 10) {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#ffcb81';
        ctx.fillText(textString3, 700, canvas.height / 2 + 20);
      }
      //else dont do it: NAMA ORANG BARU
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#ffcb81';
        ctx.fillText(textString3, 700, canvas.height / 2 + 20);
      }
      //define the HASTAG
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#ffcb81';
      ctx.fillText(textString2, 730, canvas.height / 2 + 90);
      //define the Member count
      var textString4 = `Member #${member.guild.memberCount}`;
      ctx.font = 'bold 70px Genta';
      ctx.fillStyle = '#ffcb81';
      ctx.fillText(textString4, 750, canvas.height / 2 + 170);
      //get the SERVER GRUP
      var textString4 = `${member.guild.name}`;
      ctx.font = 'bold 130px Genta';
      ctx.fillStyle = '#ffcb81';
      ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
      //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome2.png');
      //define the welcome embed
      const welcomeembed = new Discord.MessageEmbed()
        .setColor("#ffcb81")
        .setTimestamp()
        .setFooter("Welcome", member.guild.iconURL({ dynamic: true }))
        .setDescription(`**Welcome to ${member.guild.name}!**
      Hi <@${member.id}>!, Kalo udah join silahkan verifikasi dulu Di <#781384730691108886> dan 
      baca rules Di <#778068162801041418> kalo udah bisa langsung ambil role nya di <#776571173802606653> sesuai gender kalian!
     betah" disini yahh, rasakan hangatnya pertemanan rasa keluarga!! "JANGAN SUNGKAN BERBAUR"♡ ENJOY with WARKOP!!`)
        .setImage("attachment://welcome2.png")
        .attachFiles(attachment);
      //define the welcome channel
      const channel = member.guild.channels.cache.find(ch => ch.id === config.welcome);
      //send the welcome embed to there
      channel.send(welcomeembed);
    })
}
