module.exports = {
    signature: 'id',

    exec(id, msg, mysqlPool, cmd) {

        return mysqlPool.query(
            'SELECT author, content, created_at FROM quotes WHERE deleted_at IS NULL AND id = ?',
            [id],
            function (err, result) {

                if(err) {
                    return msg.reply('Error: ', err);
                }

                if(result.length === 0)
                {
                    return msg.reply(`No such quote: ${id}`)
                }

                return msg.reply({embeds: [
                    {
                        color: 3447003,
                        title: `Matching quote ID #${id}`,
                        description: result[0].content,
                        author: {
                            name: result[0].author
                        },
                        timestamp: new Date()
                    }]
                });

            }
        );
    }
};