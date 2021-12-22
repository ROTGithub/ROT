/*
ROT Developers and Contributors:
Moises (OWNER/CEO), 
TRASH (DEVELOPER),
notbeer (Most of ROT's Structure code),
Nightwalker L.o.t.s (ROT Anti Cheat Dev),
UnknownCatastrophe (ROT Anti Cheat Dev),
VUnkownPersonV (ROT Anti Cheat Dev),
__________ ___________________
\______   \\_____  \__    ___/
 |       _/ /   |   \|    |   
 |    |   \/    |    \    |   
 |____|_  /\_______  /____|   
        \/         \/         
Do NOT steal, copy the code, or claim it as yours!
Please message moisesgamingtv0#8583 on Discord, or join the ROT discord: https://discord.com/invite/2ADBWfcC6S
You can also message one of our developers on Discord @TRASH#0001
Copyright 2021-2022!
Thank you!
*/
import { Server, Database, setTickInterval, Lang, } from '../../../Minecraft.js';
const CMDTname: string = `team`
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `When you type !${CMDname} in chat, you'll use TPA`,
    usage: `${CMDname} Send | Accept`,
    example: [
        `${CMDname} send §7(This will open a cool menu of the people you can send TPAs to)§r`,
        `${CMDname} accept §7(This will open a cool menu of the TPAs you can accept)§r`
    ]
};
export const teamsdb = new Database("rot_teams");
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.nameTag)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`, `tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
    if(!Server.entity.getScore(`cl${CMDname}`, '[type=rot:cl]', { minimum: 0, maximum: 0 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`, `tellraw @a[name="${chatmsg.sender.nameTag}",tag=!v] {"rawtext":[{"text":"${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}"}]}`, `tellraw @a[name="${chatmsg.sender.nameTag}",tag=v] {"rawtext":[{"text":"${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}"}]}`]);
    if(Server.player.getScore('clcmd', `${chatmsg.sender.nameTag}`, { minimum: 1, maximum: 3 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`, `execute @a[name="${chatmsg.sender.nameTag}"] ~~~ tellraw @s {"rawtext":[{"text":"${Lang.antispam}"}]}`]);
    Server.runCommands([`scoreboard players set @a[name="${chatmsg.sender.nameTag}"] clcmdc 0`, `execute @e[type=rot:cl,scores={cl${CMDname}=!2}] ~~~ scoreboard players set @a[name="${chatmsg.sender.nameTag}"] clcmdc 1`, `execute @e[type=rot:cl,scores={cl${CMDname}=2}] ~~~ scoreboard players set @a[name="${chatmsg.sender.nameTag}",tag=t] clcmdc 1`]);
    if(!Server.player.getScore('clcmdc', `${chatmsg.sender.nameTag}`, { maximum: 0 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`, `tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.noT}"}]}`]);
    Server.runCommands([`scoreboard players set @a[name="${chatmsg.sender.nameTag}",m=!c] clcmd 3`]);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`, `tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.anticmdpvp}"}]}`]);
    const warpName = args.slice(1).join(' ').toLowerCase();
    let join = ['join','accept','ok'];let invite = ['inv','invite','send'];let create = ['create','make','forage'];let leave = ['leave','exit','betray'];let list = ['list','tell', 'all'];let del = ['delete','remove','col','collapse'];let ally = ['friend','friends','together','form'];let settings = ['settings','set','gui','ui','setting','set'];
    let args1: string = `${args.slice(1).join(' ').toUpperCase()}`
    if(!args.length || join.includes(args[0])) {
    } else if(invite.includes(args[0])) {
        if(!Server.player.findTag('hasteam', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0063\u0061\u006e\u006e\u006f\u0074 \u0069\u006e\u0076\u0069\u0074\u0065 \u0073\u006f\u006d\u0065\u006f\u006e\u0065 \u0069\u006e\u0074\u006f \u0061 \u0074\u0065\u0061\u006d \u0069\u0066 \u0079\u006f\u0075 \u0061\u0072\u0065 \u006e\u006f\u0074 \u0065\u0076\u0065\u006e \u0069\u006e \u006f\u006e\u0065\u0021 \u0059\u006f\u0075 \u0063\u0061\u006e \u0063\u0072\u0065\u0061\u0074\u0065 \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0070\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0063\u0072\u0065\u0061\u0074\u0065 \u0028\u0074\u0065\u0061\u006d \u006e\u0061\u006d\u0065\u0029\u00a7\u0063\u005c\u0022\u002c \u006f\u0072 \u0079\u006f\u0075\u0072 \u0066\u0072\u0069\u0065\u006e\u0064 \u0063\u0061\u006e \u0069\u006e\u0076\u0069\u0074\u0065 \u0079\u006f\u0075 \u0074\u006f \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0069\u006e\u0076\u0069\u0074\u0065\u00a7\u0063\u005c\u0022\u002e"}]}`]);
    } else if(create.includes(args[0])) {
        if(Server.player.findTag('hasteam', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0059\u006f\u0075 \u0061\u0072\u0065 \u0061\u006c\u0072\u0065\u0061\u0064\u0079 \u0061 \u0070\u0061\u0072\u0074 \u006f\u0066 \u0061 \u0074\u0065\u0061\u006d\u0021 \u004c\u0065\u0061\u0076\u0065 \u0074\u0068\u0065 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0070\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u006c\u0065\u0061\u0076\u0065\u00a7\u0065\u005c\u0022 \u0069\u006e \u0063\u0068\u0061\u0074\u002e"}]}`]);
        if(!args[1]) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.error2}"}]}`]);
        if(teamsdb.get(`${args1}`)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0054\u0068\u0065\u0072\u0065 \u0069\u0073 \u0061\u006c\u0072\u0065\u0061\u0064\u0079 \u0061 \u0074\u0065\u0061\u006d \u0077\u0069\u0074\u0068 \u0074\u0068\u0061\u0074 \u006e\u0061\u006d\u0065\u002e\u002e\u002e"}]}`]);
        Server.runCommands([`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0043\u0068\u0065\u0063\u006b\u0069\u006e\u0067 \u0069\u0066 \u0074\u0068\u0065\u0072\u0065 \u0061\u0072\u0065 \u0061\u006e\u0079 \u0074\u0065\u0061\u006d\u0073 \u0077\u0069\u0074\u0068 \u0074\u0068\u0061\u0074 \u006e\u0061\u006d\u0065\u002e\u002e\u002e\n\u00a7\u0061\u0043\u0072\u0065\u0061\u0074\u0065\u0064 \u0061 \u0074\u0065\u0061\u006d \u0077\u0069\u0074\u0068 \u0074\u0068\u0065 \u006e\u0061\u006d\u0065 \u005c\u0022\u00a7\u0036\u00a7\u006c${args1}\u00a7\u0072\u00a7\u0061\u005c\u0022\u002e"}]}`,`tag @a[name="${chatmsg.sender.nameTag}"] add hasteam`,`tag @a[name="${chatmsg.sender.nameTag}"] add teamowner`,`scoreboard players random @a[name="${chatmsg.sender.nameTag}"] clteam 1 250000`]);
        const teamID: number = Server.player.getScore('clteam', chatmsg.sender.nameTag, { minimum: 1});
        Server.runCommand(`say ${teamID}`)
        teamsdb.set(`${teamID}`, args1);
    } else if(leave.includes(args[0])) {
        if(!Server.player.findTag('hasteam', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0063\u0061\u006e\u006e\u006f\u0074 \u006c\u0065\u0061\u0076\u0065 \u0061 \u0074\u0065\u0061\u006d \u0069\u0066 \u0079\u006f\u0075 \u0061\u0072\u0065 \u006e\u006f\u0074 \u0065\u0076\u0065\u006e \u0069\u006e \u006f\u006e\u0065\u0021 \u0059\u006f\u0075 \u0063\u0061\u006e \u0063\u0072\u0065\u0061\u0074\u0065 \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0070\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0063\u0072\u0065\u0061\u0074\u0065 \u0028\u0074\u0065\u0061\u006d \u006e\u0061\u006d\u0065\u0029\u00a7\u0063\u005c\u0022\u002c \u006f\u0072 \u0079\u006f\u0075\u0072 \u0066\u0072\u0069\u0065\u006e\u0064 \u0063\u0061\u006e \u0069\u006e\u0076\u0069\u0074\u0065 \u0079\u006f\u0075 \u0074\u006f \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0069\u006e\u0076\u0069\u0074\u0065\u00a7\u0063\u005c\u0022\u002e"}]}`]);
        const teamID: string = `${Server.player.getScore('clteam', chatmsg.sender.nameTag)}`;
        const teamName = teamsdb.get(teamID);
        Server.runCommands([`scoreboard players reset @a[name="${chatmsg.sender.nameTag}"] clteam`,`tag @a[name="${chatmsg.sender.nameTag}"] remove hasteam`,`tag @a[name="${chatmsg.sender.nameTag}"] remove teamowner`,`tag @a[name="${chatmsg.sender.nameTag}"] remove teamprivs`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0052\u0065\u006d\u006f\u0076\u0069\u006e\u0067 \u0079\u006f\u0075 \u0066\u0072\u006f\u006d \u0079\u006f\u0075\u0072 \u0074\u0065\u0061\u006d\u002e\u002e\u002e\n\u00a7\u0061\u0044\u006f\u006e\u0065\u0021 \u0052\u0065\u006d\u006f\u0076\u0065\u0064 \u0079\u006f\u0075 \u0066\u0072\u006f\u006d \u005c\u0022\u00a7\u0036\u00a7\u006c${teamName}\u00a7\u0072\u00a7\u0061\u005c\u0022\u002e"}]}`,`playsound random.toast @a[name="${chatmsg.sender.nameTag}"] ~~~ 1 0.5`]);
        teamsdb.delete(`${teamID}`);
    } else if(list.includes(args[0])) {
        let listw: string = `${teamsdb.get('')}`;
        Server.runCommand(`say ${listw}`);
        Server.broadcast(`${listw}`, chatmsg.sender.nameTag);
    } else if(del.includes(args[0])) {
        if(!Server.player.findTag('hasteam', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0063\u0061\u006e\u006e\u006f\u0074 \u0064\u0065\u006c\u0065\u0074\u0065 \u0079\u006f\u0075\u0072 \u0074\u0065\u0061\u006d \u0069\u0066 \u0079\u006f\u0075 \u0064\u006f\u006e\u0027\u0074 \u0065\u0076\u0065\u006e \u006f\u0077\u006e \u006f\u006e\u0065\u0021 \u0059\u006f\u0075 \u0063\u0061\u006e \u0063\u0072\u0065\u0061\u0074\u0065 \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0070\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0063\u0072\u0065\u0061\u0074\u0065 \u0028\u0074\u0065\u0061\u006d \u006e\u0061\u006d\u0065\u0029\u00a7\u0063\u005c\u0022\u002c \u006f\u0072 \u0079\u006f\u0075\u0072 \u0066\u0072\u0069\u0065\u006e\u0064 \u0063\u0061\u006e \u0069\u006e\u0076\u0069\u0074\u0065 \u0079\u006f\u0075 \u0074\u006f \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0069\u006e\u0076\u0069\u0074\u0065\u00a7\u0063\u005c\u0022\u002e"}]}`]);
    } else if(ally.includes(args[0])) {
        if(!Server.player.findTag('hasteam', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0063\u0061\u006e\u006e\u006f\u0074 \u0062\u0065\u0063\u006f\u006d\u0065 \u0061\u006c\u006c\u0069\u0065\u0073 \u0077\u0069\u0074\u0068 \u0061 \u0074\u0065\u0061\u006d \u0069\u0066 \u0079\u006f\u0075 \u0061\u0072\u0065 \u006e\u006f\u0074 \u0065\u0076\u0065\u006e \u0069\u006e \u006f\u006e\u0065\u0021 \u0059\u006f\u0075 \u0063\u0061\u006e \u0063\u0072\u0065\u0061\u0074\u0065 \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0070\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0063\u0072\u0065\u0061\u0074\u0065 \u0028\u0074\u0065\u0061\u006d \u006e\u0061\u006d\u0065\u0029\u00a7\u0063\u005c\u0022\u002c \u006f\u0072 \u0079\u006f\u0075\u0072 \u0066\u0072\u0069\u0065\u006e\u0064 \u0063\u0061\u006e \u0069\u006e\u0076\u0069\u0074\u0065 \u0079\u006f\u0075 \u0074\u006f \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0069\u006e\u0076\u0069\u0074\u0065\u00a7\u0063\u005c\u0022\u002e"}]}`]);
    } else if(settings.includes(args[0])) {
        if(!Server.player.findTag('hasteam', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0063\u0061\u006e\u006e\u006f\u0074 \u0065\u0064\u0069\u0074 \u0061 \u0074\u0065\u0061\u006d\u0027\u0073 \u0073\u0065\u0074\u0074\u0069\u006e\u0067\u0073 \u0069\u0066 \u0079\u006f\u0075 \u0061\u0072\u0065 \u006e\u006f\u0074 \u0065\u0076\u0065\u006e \u0069\u006e \u006f\u006e\u0065\u0021 \u0059\u006f\u0075 \u0063\u0061\u006e \u0063\u0072\u0065\u0061\u0074\u0065 \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0070\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0063\u0072\u0065\u0061\u0074\u0065 \u0028\u0074\u0065\u0061\u006d \u006e\u0061\u006d\u0065\u0029\u00a7\u0063\u005c\u0022\u002c \u006f\u0072 \u0079\u006f\u0075\u0072 \u0066\u0072\u0069\u0065\u006e\u0064 \u0063\u0061\u006e \u0069\u006e\u0076\u0069\u0074\u0065 \u0079\u006f\u0075 \u0074\u006f \u0061 \u0074\u0065\u0061\u006d \u0062\u0079 \u0074\u0079\u0069\u006e\u0067 \u005c\u0022\u00a7\u0037\u0021\u0074\u0065\u0061\u006d \u0069\u006e\u0076\u0069\u0074\u0065\u00a7\u0063\u005c\u0022\u002e"}]}`]);
    };
    if(!args[0]) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.error2}"}]}`]);
});

setTickInterval(function() {
   
}, 30);