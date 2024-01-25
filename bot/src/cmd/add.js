module.exports = {
    signature: 'add',

    exec(content, msg, mysqlPool, cmd) {

        return await mysqlPool.execute(
            'INSERT INTO quotes (author, content, created_at, deleted_at) VALUES (?, ?, NOW(), NULL)',
            [msg.author.username, content],
            function(err, result) {
                msg.reply(`Quote added, ID: ${result.insertId}!`);
            }
        );
    }
};