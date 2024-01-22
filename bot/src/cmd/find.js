module.exports = {
    signature: 'find',

    exec(content, msg, mysql, cmd) {
        return mysql.query(
            "SELECT id, author, content, created_at FROM quotes WHERE content LIKE CONCAT('%', ?, '%') ORDER BY RAND() LIMIT 1",
            [content],
            function(err, result) {
                if(err) {
                    return msg.reply('Error: ', err);
                }

                if(result.length === 0)
                {
                    return msg.reply('Nothing found matching ' + content);
                }

                return msg.reply({embeds: [
                    {
                        color: 3447003,
                        title: `Matching quote ID #${result[0].id}`,
                        description: result[0].content,
                        author: {
                            name: result[0].author
                        },
                        timestamp: result[0].created_at
                    }]
                });

            }
        );
    }
};