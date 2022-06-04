module.exports = class Command
{
    constructor(mysql)
    {
        this.mysql = mysql;

        this.message = '';

        this.signature = '!quote';

        this.commands = {};
    }

    setMessage(message)
    {
        this.message = message;

        return this;
    }

    addCommand(sig, callable)
    {
        this.commands[sig] = callable;
    }

    isCommand()
    {
        return this.message.substring(0, this.signature.length) === this.signature;
    }

    setIntervalID(id)
    {
        this.interval_id = id;
    }

    getIntervalID()
    {
        return this.interval_id;
    }

    stopInterval()
    {
        clearInterval(this.interval_id);
    }

    exec(msg)
    {
        let cmd = this.getCommandFromArg();

        if(!this.commands.hasOwnProperty(cmd.cmd))
        {
            return 'Unknown command ' + cmd.cmd;
        }

        return this.commands[cmd.cmd].exec(cmd.content, msg, this.mysql, this);
    }

    getCommandFromArg()
    {
        let temp = this.message.split(' ', 3);

        if(temp.length < 2)
        {
            return null;
        }

        let content = this.message;

        content = content.replace(temp[0], '');
        content = content.replace(temp[1], '');
        content = content.trim();

        return {
            cmd: temp[1],
            content: content
        }
    }
};