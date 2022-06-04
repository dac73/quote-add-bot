module.exports = {
    signature: 'del',

    exec(id, msg, mysql, cmd) {

        return mysql.query(
            'DELETE FROM quotes WHERE id = ?',
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