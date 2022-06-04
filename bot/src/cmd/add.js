module.exports = {
    signature: 'add',

    exec(content, msg, mysql, cmd) {

        return mysql.execute(
            'INSERT INTO quotes (author, content, created_at) VALUES (?, ?, NOW())',
            [msg.author.username, content],
            function(err, result) {

                msg.reply(`Quote added, ID: ${result.insertId}!`);
            }
        );
    }
};