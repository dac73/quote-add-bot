module.exports = {
    signature: 'bullshit-stop',

    exec(id, msg, mysqlPool, cmd) {

        cmd.stopInterval();

        msg.reply('Bot je zatvorio radnju, sve ruke u zrak za bajbija.')
    }
};