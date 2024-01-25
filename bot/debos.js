require('dotenv').config();
const Discord = require('discord.js');
const intents = Discord.GatewayIntentBits;
const client = new Discord.Client({
    intents: [intents.Guilds, intents.GuildMessages, intents.MessageContent]
});
const mysql = require('mysql2/promise');

const Command = require('./src/Command.js');
const addCommand = require('./src/cmd/add.js');
const findCommand = require('./src/cmd/find.js');
const delCommand = require('./src/cmd/del.js');
const idCommand = require('./src/cmd/id.js');
const randomCommand = require('./src/cmd/random.js');
const randomTimedStartCommand = require('./src/cmd/timed-start.js');
const randomTimedStopCommand = require('./src/cmd/timed-stop.js');

// create the pool for connection to database
const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

const cmdParser = new Command(pool);

cmdParser.addCommand(addCommand.signature, addCommand);
cmdParser.addCommand(findCommand.signature, findCommand);
cmdParser.addCommand(delCommand.signature, delCommand);
cmdParser.addCommand(idCommand.signature, idCommand);
cmdParser.addCommand(randomCommand.signature, randomCommand);
cmdParser.addCommand(randomTimedStartCommand.signature, randomTimedStartCommand);
cmdParser.addCommand(randomTimedStopCommand.signature, randomTimedStopCommand);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    cmdParser.setMessage(msg.content);

    if (cmdParser.isCommand()) {
        cmdParser.exec(msg);
    }

    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

client.login(process.env.BOT_TOKEN);
