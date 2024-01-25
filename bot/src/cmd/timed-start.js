module.exports = {
    signature: 'bullshit-start',

    exec(id, msg, mysqlPool, cmd) {

        const interval = 24 * 60 * 60 * 1000;

        // clear existing interval
        cmd.stopInterval();

        const interval_id = setInterval(() => {

            return mysqlPool.query(
                'SELECT author, content, created_at FROM quotes WHERE deleted_at IS NULL ORDER BY RAND() LIMIT 1',
                [id],
                function (err, result) {

                    if(err) {
                        return msg.channel.send('Error: ', err);
                    }

                    if(result.length === 0)
                    {
                        return msg.channel.send(`No such quote: ${id}`)
                    }

                    return msg.channel.send({embeds: [
                        {
                            color: 3447003,
                            title: `Random nagrada od mentalnog proljeva`,
                            description: result[0].content,
                            author: {
                                name: result[0].author
                            },
                            timestamp: new Date()
                        }]
                    });

                }
            );

        }, interval);

        cmd.setIntervalID(interval_id);

        msg.reply('Bot spama svakih 24*60 minuta. da zatvori radnju, napiši !quote bullshit-stop')
    }
};