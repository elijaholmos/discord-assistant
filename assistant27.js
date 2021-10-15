const Discord = require('discord.js');
const fs = require('fs');
const sarcastic = require('sarcastictexts');
const { token } = require('./credentials.js');
//const cron = require('node-cron');
const client = new Discord.Client();

const codingSOS = '755487590605652138';
const beeMovieScript = require('./beemovie.json');


let beeMovieInterval;
let beeMovieCounter = 0;
let beeMovieStatus = false;

function nonMiningCheck(msg) {
    if(msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}`)) {
        const args = msg.content.trim().split(/ +/).slice(1);
        if(!args.length) return;	//if user just typed the prefix and not any actual command
        const commandName = args.shift().toLowerCase();
        if (commandName == 'image') {
            msg.channel.send(msg.mentions.users.filter((user) => user.id != client.user.id).first().avatarURL);
            return;
        }
        if(commandName == 'grid' || commandName == 'diamond') {
            //if(args.length > 20) return message.channel.send("That's too many emojis, simp");
            function grid(border, arr) {
                // If no border is provided, use the first value as the border
                if (!border) {
                    border = arr[0];
                }
            
                // Generate the grid
                let grid = []
                for (let i = 0; i < arr.length * 2 - 1; i++) {
                    grid.push([]);
                    for (let j = 0; j < arr.length * 2 - 1; j++) {
                        grid[i][j] = border;
                    }
                }
                // This is the center index of both grid and column
                let center = Math.floor(grid.length / 2);
                // Run for each array index
                arr.forEach((arrVal, arrInd) => {
                    // Run for each array index as well, manipulating the rows in an outward fashion
                    for (let row = 0; row < arr.length; row++) {
                    if (arrInd + row <= center) {
                        grid[center + row][arrInd + row] = arrVal;
                        grid[center - row][arrInd + row] = arrVal;
                    }
                    if (grid.length - arrInd - 1 - row >= center) {
                        grid[center + row][grid.length - arrInd - 1 - row] = arrVal;
                        grid[center - row][grid.length - arrInd - 1 - row] = arrVal;
                    }
                  }
                });
                return grid.map(row => row.join("")).join("\u200b\n") + '\u200b';
            }
            
            let res = grid(args.shift(), args);
            return msg.channel.send(res, {split:true});
        }
    }

    //bee movie stuff
    if(!beeMovieStatus && msg.content.toLowerCase().split(' ').includes('bee')) {
        beeMovieStatus = true;
        beeMovieCounter = 0;    //reset counter
        beeMovieInterval = setInterval(() => {
            if(beeMovieCounter == beeMovieScript.length) {
                beeMovieStatus = false;
                return clearInterval(beeMovieInterval);
            }
            msg.channel.send(beeMovieScript[beeMovieCounter]);
            beeMovieCounter++;
        }, 2000);
        return;
    } else if(beeMovieStatus && msg.isMentioned(client.user.id) && msg.content.toLowerCase().includes("stop")) {
        beeMovieStatus = false;
        return clearInterval(beeMovieInterval);
    }

    if(msg.isMentioned('298550002827919372'))
        msg.channel.send('<@!298550002827919372>');
    
    if(msg.author.id === '298550002827919372')
        if(Math.floor(Math.random() * 12) == 0) //7.7% chance
            msg.channel.send(`*${sarcastic.getsarcastic(msg.content)}*`);
};


try {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('message', (message) => {
        if (message.author.id === client.user.id) return; //dont respond to myself :flushed:

        if (message.guild.id !== codingSOS) return; //guild check
        nonMiningCheck(message);
    });
} catch (e) {
    console.log(e);
}

client.login(token);