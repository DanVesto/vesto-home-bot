const Discord = require("discord.js");
var schedule = require('node-schedule');
var fs = require('fs'),
    request = require('request');

const client = new Discord.Client();
var updateIcon = schedule.scheduleJob('30 12 * * *', function(){
        client.guilds.fetch('758002666273243340')
         .then(guild => setGuildIcon(guild))
         .catch(console.error);
});
var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
var setGuildIcon = function(guild){
        downloadMyHouse();
        guild.setIcon('./myhouse.png')
                .then(updated => console.log(""))
                .catch(console.error);
}
var downloadMyHouse = function(){
        download(process.env.HOMEURL,"myhouse.png",function(){
                console.log('done');
        });
        return new Promise(function(){console.log('done')});
}
client.login(process.env.BOT_TOKEN);



