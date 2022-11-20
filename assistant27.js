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
	if (msg.content.startsWith(`<@${client.user.id}>`) || msg.content.startsWith(`<@!${client.user.id}`)) {
		const args = msg.content.trim().split(/ +/).slice(1);
		if (!args.length) return; //if user just typed the prefix and not any actual command
		const commandName = args.shift().toLowerCase();
		if (commandName == 'image') {
			msg.channel.send(msg.mentions.users.filter((user) => user.id != client.user.id).first().avatarURL);
			return;
		}
		if (commandName == 'grid' || commandName == 'diamond') {
			//if(args.length > 20) return message.channel.send("That's too many emojis, simp");
			function grid(border, arr) {
				// If no border is provided, use the first value as the border
				if (!border) {
					border = arr[0];
				}

				// Generate the grid
				let grid = [];
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
				return grid.map((row) => row.join('')).join('\u200b\n') + '\u200b';
			}

			let res = grid(args.shift(), args);
			return msg.channel.send(res, { split: true });
		}
	}

	//bee movie stuff
	/*
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
    */

	if (msg.content.toLowerCase().includes('rival'))
		return msg.channel.send(
			'https://cdn.discordapp.com/attachments/892872832617426975/945724803468365914/unknown.png'
		);

	if (msg.content.toLowerCase().includes('programfam'))
		return msg.channel.send(
			':stefRekt1::stefRekt2::tylersmile::AnaDone::dripMax::AnaFruit::shad::fancymax::ElijahSunglasses::nicole::lilkayla::pablo::melanie_sunglasses::ArinWhy::sarlo::stef::zach::reha::austin::thecouncil::fishbrain::ArinJoy::noahBruh::kaceymoji::stylemacks::michael:'
		);

	if (msg.content.toLowerCase().includes('thecouncil') || msg.content.toLowerCase().includes('the council'))
		return msg.channel.send(
			'https://cdn.discordapp.com/attachments/884613459390656562/958401719451127858/unknown.png'
		);

	if (msg.content.toLowerCase().includes('glutencouncil') || msg.content.toLowerCase().includes('gluten council'))
		return msg.channel.send(
			'https://cdn.discordapp.com/attachments/884613459390656562/958402722921599017/unknown.png'
		);

	if (msg.channel.name.includes('help')) return;

	if (msg.content.toLowerCase().includes('gm')) return msg.channel.send('gm');

	if (msg.content.toLowerCase().includes('good'))
		return msg.channel.send(`good${msg.content.split('good').slice(1).join('')}`);

	//7.7% chance
	if (!!msg.mentions?.members?.size)
		if (Math.floor(Math.random() * 13) === 0) msg.channel.send(msg.mentions.members.random().toString());

	//4% chance
	if (Math.floor(Math.random() * 25) === 0) msg.channel.send(`*${sarcastic.getsarcastic(msg.content)}*`);

	//1% chance
	if (Math.floor(Math.random() * 100) === 0)
		if (Math.floor(Math.random() * 2) === 0) msg.channel.send(`<:this:814215304460107866>`);
		else msg.channel.send(`<:feelsDumbMan:909924361228656660>`);

	//0.1% chance
	if (Math.floor(Math.random() * 1000) === 0)
		if (Math.floor(Math.random() * 4) === 0)
			//25% max
			msg.channel.send('<@!298550002827919372>');
		else msg.channel.send(`<@!${msg.channel.members.randomKey()}>`); //random person in channel

	//kacey
	// if(msg.author.id === '272617382298648586' || msg.isMentioned('272617382298648586'))
	//     if(Math.floor(Math.random() * 500) === 0) //0.2% chance
	//         msg.channel.send('<:kaceymoji:940808884870860840>');

	// mel
	if (msg.author.id === '462278512787718144' || msg.isMentioned('462278512787718144'))
		if (Math.floor(Math.random() * 500) === 0)
			//0.2% chance
			msg.channel.send('<:melanie_sunglasses:940784770382708746>');

	//max
	if (msg.author.id === '298550002827919372' || msg.isMentioned('298550002827919372'))
		if (Math.floor(Math.random() * 500) === 0)
			//0.2% chance
			msg.channel.send(
				'https://cdn.discordapp.com/attachments/508495069914071042/941484201729990756/welcome.png'
			);

	if (msg.content.toLowerCase().startsWith('!clear') && msg.author.id === '298550002827919372')
		msg.channel.send(`no one: \n<@!298550002827919372>: \`!clear ${msg.content.split(' ').pop()}\``);

	//soupcult
	const soup_responses = ['<:thinksoup:1029929235227357275>', '<:soupthink:1030156124613255249>'];
	if (msg.member.roles.has('1030154504299085844'))
		if (Math.floor(Math.random() * 100) === 0)
			//1% chance
			msg.channel.send(soup_responses[Math.floor(Math.random() * soup_responses.length)]);
}

try {
	client.on('ready', () => {
		console.log(`Logged in as ${client.user.tag}!`);
	});

	client.on('message', (message) => {
		if (message.author.id === client.user.id) return; //dont respond to myself :flushed:

		if (message.channel.type === 'dm')
			return console.log(`dm received from ${message.author.tag}: ${message.content}`);

		if (message.guild.id !== codingSOS) return; //guild check
		nonMiningCheck(message);
	});
} catch (e) {
	console.log(e);
}

client.login(token);
