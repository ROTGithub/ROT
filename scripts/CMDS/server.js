const registerInformationH = {
    admin: false,
    cancelMessage: true,
    name: 'help',
    description: 'Get list of all the commands available or input an argument to get information about that specific command',
    category: 'Help',
    documentation: {
        usage: 'help <CommandName?>',
        information: 'This command will help you find the stats of a player faster! You can find their score on a scoreboard, their play time on this server, and the amount of warnings they have gotten from ROT.',
        examples: [
            'help',
            'help spawn',
            'help warps'
        ],
        developers: ['moisesgamingtv9', 'TRASH']
    }
};
Server.command.register(registerInformationH, (data, args) => {
    if (!Server.player.find(data.sender.name))
        return null;
    const cmdInfo = Server.command.getRegistration(args[0]);
    var cmdList = Server.command.get();
    if (cmdInfo) {
        if (cmdInfo && cmdInfo.private)
            return Server.eBroadcast('I couldn\'t find the command...', data.sender.name, 'HELP');
        if (cmdInfo && cmdInfo.admin == true && !Server.player.isAdmin(data.sender.name))
            Server.eBroadcast(Lang.noT, data.sender.name);
        let hI = `§l§cCommand: §l§5${Server.CP}§l§4${cmdInfo.name}§r\n`;
        if (cmdInfo.description)
            hI += `§l§cDescription§5:§r§a ${cmdInfo.description}\n`;
        if (cmdInfo.aliases)
            hI += `§l§cAliases§5: §c${cmdInfo.aliases.join(`§a,\n§l${Server.CP}§r§5`)}§r\n`;
        if (cmdInfo.category)
            hI += `§l§cCategory§5: ${cmdInfo.category}§c§r\n`;
        if (cmdInfo.documentation)
            hI += `§l§cDocumentation§5:`;
        if (cmdInfo.documentation.usage)
            hI += '\n§l§cUsage§5: ' + cmdInfo.documentation.usage;
        if (cmdInfo.documentation.information)
            hI += '\n§l§cInformation§5: ' + cmdInfo.documentation.information;
        if (cmdInfo.documentation.subaliases)
            hI += '\n§l§cSub-Aliases§5: ' + cmdInfo.documentation.subaliases.join(`§c,\n§5`);
        if (cmdInfo.documentation.examples)
            hI += `\n§l§cExample(s)§5: \n §c§l${Server.CP}§r§5` + cmdInfo.documentation.examples.join(`§c,\n §l${Server.CP}§r§5`);
        if (cmdInfo.documentation.notes)
            hI += '\n§l§cNotes§5: ' + cmdInfo.documentation.notes;
        if (cmdInfo.documentation.developers)
            hI += '\n§l§cDeveloper(s)§5: \n ' + cmdInfo.documentation.developers.join(`§c,\n §5`);
        return Server.broadcast(hI, data.sender.name, 'Help'), Server.tBroadcast('Join the ROT Discord if you need any more help!§l§d https://discord.gg/2ADBWfcC6S', data.sender.name, 'Help');
    }
    ;
    var args0_is_int = false;
    try {
        if (args[0])
            parseInt(args[0]);
        args0_is_int = true;
    }
    catch (e) {
        args0_is_int = false;
    }
    ;
    if (!cmdInfo && args0_is_int || !args[0]) {
        Server.tBroadcast('Join the ROT Discord if you need any more help!§l§d https://discord.gg/2ADBWfcC6S', data.sender.name, 'ROT');
        var color_int = 0;
        var commands_list = cmdList;
        var n = 15;
        var help_page = args[0] ? parseInt(args[0]) : 1;
        var help_page_original = help_page;
        if (help_page != 0) {
            help_page = help_page - 1;
        }
        var result = new Array(Math.ceil(commands_list.length / n)).fill().map(_ => commands_list.splice(0, n));
        for (let i = 0; i < result[help_page].length; i++) {
            color_int++;
            if (color_int > 1) {
                color_int = 0;
            }
            var help = "";
            if (color_int == 0) {
                help += "§5§l";
            }
            if (color_int == 1) {
                help += "§c§l";
            }
            var cmdInfo2 = Server.command.getRegistration(result[help_page][i]);
            help += result[help_page][i];
            if (cmdInfo2.description)
                help += `§d - §a${cmdInfo2.description}\n`;
            Server.broadcast(`${help}`, `${data.sender.name}`);
        }
        ;
        Server.broadcast(`§l§cHelp page:§r §a${help_page_original}§d/§5${result.length}`, data.sender.name);
        return Server.broadcast(`§5Use "§c${Server.CP}help§5" §d<Page Number> §5To see the next page`, data.sender.name, 'HELP');
    }
    ;
});
var CMDname = "close";
const registerInformationC = {
    cancelMessage: true,
    name: CMDname,
    description: `When you type ${Server.CP}${CMDname} in chat, time will end!`,
    category: 'Server',
    usage: CMDname,
    admin: true,
    example: [
        CMDname
    ]
};
Server.command.register(registerInformationC, (chatmsg) => {
    if (!Server.player.find(chatmsg.sender.name))
        return null;
    if (!Server.player.isAdmin == false)
        return Server.eBroadcast(Lang.error, chatmsg.sender.name, 'ROT');
    Server.close();
});
export const CONFIG = new Database("rot_config");
var CHAT_LOGGER = new Database("chatlogger");
if (!CHAT_LOGGER.has("messages"))
    CHAT_LOGGER.set('messages', '0');
if (!CHAT_LOGGER.has("pages"))
    CHAT_LOGGER.set('pages', '1');
if (!CONFIG.has('rot_id'))
    CONFIG.set('rot_id', Math.floor(Math.random() * 1525000000).toString());
if (!CONFIG.has('chatlogger'))
    CONFIG.set('chatlogger', '0');
Server.command.register({
    cancelMessage: true,
    name: `prefix`,
    description: '',
    category: 'Server',
    admin: true
}, (chatmsg, args) => {
    if (!Server.player.findTag('rot', chatmsg.sender.name))
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
    if (!Server.player.findTag('v', chatmsg.sender.name))
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]} `]);
    if (!args[0])
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":" \u00a7\u0063\u0059\u006f\u0075\u0072 \u0063\u006f\u006d\u006d\u0061\u006e\u0064 \u0070\u0072\u0065\u0066\u0069\u0078 \u0063\u0061\u006e\u006e\u006f\u0074 \u0062\u0065 \u006e\u006f\u0074\u0068\u0069\u006e\u0067\u002e"}]}`]);
    if (args[0].startsWith('/'))
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":" \u00a7\u0063\u0050\u006c\u0065\u0061\u0073\u0065 \u0064\u006f \u004e\u004f\u0054 \u0075\u0073\u0065 \u0061\u006e\u0079\u0074\u0068\u0069\u006e\u0067 \u0074\u0068\u0061\u0074 \u0073\u0074\u0061\u0072\u0074\u0073 \u0077\u0069\u0074\u0068 \u005c\u0022\u002f\u005c\u0022! \u0049\u0074\u0027\u006c\u006c \u0062\u0072\u0065\u0061\u006b \u0052\u004f\u0054 \u0061\u006e\u0064 \u006d\u0061\u006b\u0065 \u0069\u0074 \u0075\u006e\u0075\u0073\u0061\u0062\u006c\u0065 \u0077\u0069\u0074\u0068\u006f\u0075\u0074 \u0063\u006f\u006d\u0070\u006c\u0065\u0074\u0065\u006c\u0079 \u0064\u0065\u006c\u0065\u0074\u0069\u006e\u0067 \u0061\u006c\u006c \u0064\u0061\u0074\u0061\u0062\u0061\u0073\u0065 \u0064\u0061\u0074\u0061\u002e"}]}`]);
    Server.runCommands([`playsound random.toast @a`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":" \u00a7\u0065\u0043\u0068\u0061\u006e\u0067\u0069\u006e\u0067 \u0073\u0065\u0072\u0076\u0065\u0072 \u0070\u0072\u0065\u0066\u0069\u0078\u002e\u002e\u002e\n\u00a7\u0061\u0044\u006f\u006e\u0065\u0021 \u0043\u0068\u0061\u006e\u0067\u0065\u0064 \u0073\u0065\u0072\u0076\u0065\u0072 \u0070\u0072\u0065\u0066\u0069\u0078 \u0074\u006f \u005c\u0022\u00a7\u0036\u00a7\u006c${args[0]}\u00a7\u0072\u00a7\u0061\u005c\u0022\u002e \u00a7\u0063\u0049\u0074\u0027\u0073 \u0072\u0065\u0063\u006f\u006d\u006d\u0065\u006e\u0064 \u0074\u0068\u0061\u0074 \u0079\u006f\u0075 \u0072\u0065\u0073\u0074\u0061\u0072\u0074 \u0074\u0068\u0069\u0073 \u0077\u006f\u0072\u006c\u0064\u002c \u0073\u0065\u0072\u0076\u0065\u0072\u002c \u006f\u0072 \u0072\u0065\u0061\u006c\u006d \u0074\u006f \u0061\u0076\u006f\u0069\u0064 \u0052\u004f\u0054 \u0062\u0072\u0065\u0061\u006b\u0069\u006e\u0067\u002e\u002e\u002e"}]}`, `tellraw @a[name=!"${chatmsg.sender.name}"] {"rawtext":[{"text":" \u00a7\u0061\u0041\u006e \u0061\u0064\u006d\u0069\u006e \u0068\u0061\u0073 \u0063\u0068\u0061\u006e\u0067\u0065\u0064 \u0074\u0068\u0065 \u0073\u0065\u0072\u0076\u0065\u0072 \u0070\u0072\u0065\u0066\u0069\u0078 \u0074\u006f \u00a7\u0036\u00a7\u006c${args[0]}"}]}`]);
    CONFIG.set('prefix', args[0]);
});
var CMDname = `chatlogst`;
Server.command.register({
    cancelMessage: true,
    name: 'chatlogst',
    description: '',
    category: 'Server',
    admin: true,
}, (chatmsg) => {
    if (!Server.player.findTag('rot', chatmsg.sender.name))
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
    if (!Server.player.findTag('v', chatmsg.sender.name))
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]} `]);
    if (CONFIG.get('chatlogger') == 1) {
        CONFIG.set('chatlogger', 0);
        Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.CMDoff}${CMDname}${Lang.CMDoff2}"}]}`]);
    }
    else {
        CONFIG.set('chatlogger', 1);
        Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.CMDon}${CMDname}${Lang.CMDon2}"}]}`]);
    }
});
let CMDTname2 = `chatlogs`;
Server.command.register({
    cancelMessage: true,
    name: 'chatlogs',
    description: '',
    category: 'Server',
    admin: true,
}, (chatmsg, args) => {
    if (!Server.player.findTag('rot', chatmsg.sender.name))
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
    if (!Server.player.findTag('t', chatmsg.sender.name))
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    if (CONFIG.get('chatlogger') == 0)
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}",tag=!v] {"rawtext":[{"text":"${Lang.CMDnotOna1}${CMDTname2}${Lang.CMDnotOna2}"}]}`, `tellraw @a[name="${chatmsg.sender.name}",tag=v] {"rawtext":[{"text":"${Lang.CMDnotOnb1}${CMDTname2}${Lang.CMDnotOnb2}${CMDTname2}${Lang.CMDnotOnb3}"}]}`]);
    if (CHAT_LOGGER.get('messages') == '0' && CHAT_LOGGER.get('pages') == '1')
        return;
    if (CHAT_LOGGER.has(`p${args[0]}_messages`)) {
        var MESSAGES = CHAT_LOGGER.get(`p${args[0]}_messages`).split('[///n///');
        for (let i = 0; i < MESSAGES.length; i++) {
            Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"\u00a7\u0063\u0028\u00a7\u0064\u0043\u0068\u0061\u0074 \u004c\u006f\u0067\u00a7\u0063\u0029 \u00a7\u0062${MESSAGES[i]}"}]}`]);
        }
    }
    else
        return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error2}"}]}`]);
});
