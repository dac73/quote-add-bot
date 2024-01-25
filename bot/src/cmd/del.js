module.exports = {
    signature: 'del',

    exec(id, msg, mysqlPool, cmd) {

        return await mysqlPool.execute(
            'UPDATE quotes SET deleted_at = NOW() WHERE id = ?',
            [id],
            function(err, result) {
                if(err) {
                    return msg.reply('Error: ', err);
                }

                return msg.reply(`Quote ${id} deleted`);
            }
        );
    }
};