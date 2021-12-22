/*
ROT Developers and Contributors:
Moises (OWNER/CEO), 
TRASH (DEVELOPER),
notbeer (ROT's base code)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
__________ ___________________
\______   \\_____  \__    ___/
 |       _/ /   |   \|    |   
 |    |   \/    |    \    |   
 |____|_  /\_______  /____|   
        \/         \/         
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
© Copyright 2021 all rights reserved by Moisesgamingtv9. Do NOT steal, copy the code, or claim it as yours\u0021
Please message moisesgamingtv9#8583 on Discord, or join the ROT discord: https://discord.com/invite/2ADBWfcC6S
Website: https://rotmc.netlify.app/index.html
Docs: https://docs.google.com/document/d/1hasFU7_6VOBfjXrQ7BE_mTzwacOQs5HC21MJNaraVgg
Thank you
*/
import { Server, Lang } from '../../../Minecraft.js';
const CMDTname: string = `spawn`;
const registerInformation = {
    cancelMessage: true,
    name: 's',
    description: 'Teleports you to spawn.',
    usage: 'spawn',
    example: [
        'spawn',
        's'
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname, '0');};
    if(Server.settings.get(CMDTname) == 0) return Server.eBroadcast(`${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}`, `@a[name="${chatmsg.sender.name}",tag=!v]`), Server.eBroadcast(`${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}`, `@a[name="${chatmsg.sender.name}",tag=v]`);
    if(Server.player.getScore('clcmd', chatmsg.sender.name, { minimum: 1, maximum: 3 })) return Server.eBroadcast(Lang.antispam, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == 2 && !Server.player.findTag('t', chatmsg.sender.name)) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);
    let tags = Server.player.getTags(chatmsg.sender.name);if(Server.settings.get(CMDTname) == 3){if(!tags.includes(`CMD ${CMDname}`)){if(!tags.includes('v')) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);};};
    Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 3`);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.name)) return Server.eBroadcast(Lang.anticlog, chatmsg.sender.name);
    let sptext = `${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0064\u0069\u0064\u006e\u0027\u0074 \u0073\u0065\u0074\u0075\u0070 \u0079\u006f\u0075\u0072 \u0073\u0070\u0061\u0077\u006e\u0021 \u0074\u0079\u0070\u0065 \u005c\u0022\u00a7\u0037${Server.CP}\u0073\u0065\u0074\u0073\u0070\u0061\u0077\u006e\u00a7\u0063\u005c\u0022 \u0069\u006e \u0063\u0068\u0061\u0074 \u0074\u006f \u0073\u0065\u0074 \u0074\u0068\u0065 \u0061\u0072\u0065\u0061 \u0079\u006f\u0075\u0072 \u0070\u006c\u0061\u0079\u0065\u0072\u0073 \u0077\u0069\u006c\u006c \u0062\u0065 \u0074\u0065\u006c\u0065\u0070\u006f\u0072\u0074\u0065\u0064 \u0074\u006f\u002e`;
    if(Server.settings.get('spawnx') == undefined) return Server.eBroadcast(sptext, chatmsg.sender.name);if(Server.settings.get('spawny') == undefined) return Server.eBroadcast(sptext, chatmsg.sender.name);if(Server.settings.get('spawmz') == undefined) return Server.eBroadcast(sptext, chatmsg.sender.name);
    const sX: number = Server.settings.get('spawnx');const sY: number = Server.settings.get('spawny');const sZ: number = Server.settings.get('spawnz');
    Server.runCommands([`execute @a[name="${chatmsg.sender.name}"] ~~~ tp @s ${sX} ${sY} ${sZ}`,`playsound mob.shulker.teleport @a[name="${chatmsg.sender.name}"] ${sX} ${sY} ${sZ} 1 0.5`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0054\u0065\u006c\u0065\u006c\u0070\u006f\u0072\u0074\u0069\u006e\u0067\u002e\u002e\u002e\n\u00a7\u0061\u0050\u006f\u006f\u0066!"}]}`]);
});
Server.command.register({
    cancelMessage: true,
    name: 'spawn',
    description: 'Teleports you to spawn.',
    usage: 'spawn',
    example: [
        'spawn',
        's'
    ]
}, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname, '0');};
    if(Server.settings.get(CMDTname) == 0) return Server.eBroadcast(`${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}`, `@a[name="${chatmsg.sender.name}",tag=!v]`), Server.eBroadcast(`${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}`, `@a[name="${chatmsg.sender.name}",tag=v]`);
    if(Server.player.getScore('clcmd', chatmsg.sender.name, { minimum: 1, maximum: 3 })) return Server.eBroadcast(Lang.antispam, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == 2 && !Server.player.findTag('t', chatmsg.sender.name)) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);
    let tags = Server.player.getTags(chatmsg.sender.name);if(Server.settings.get(CMDTname) == 3){if(!tags.includes(`CMD ${CMDname}`)){if(!tags.includes('v')) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);};};
    Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 3`);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.name)) return Server.eBroadcast(Lang.anticlog, chatmsg.sender.name);
    let sptext = `${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0064\u0069\u0064\u006e\u0027\u0074 \u0073\u0065\u0074\u0075\u0070 \u0079\u006f\u0075\u0072 \u0073\u0070\u0061\u0077\u006e\u0021 \u0074\u0079\u0070\u0065 \u005c\u0022\u00a7\u0037${Server.CP}\u0073\u0065\u0074\u0073\u0070\u0061\u0077\u006e\u00a7\u0063\u005c\u0022 \u0069\u006e \u0063\u0068\u0061\u0074 \u0074\u006f \u0073\u0065\u0074 \u0074\u0068\u0065 \u0061\u0072\u0065\u0061 \u0079\u006f\u0075\u0072 \u0070\u006c\u0061\u0079\u0065\u0072\u0073 \u0077\u0069\u006c\u006c \u0062\u0065 \u0074\u0065\u006c\u0065\u0070\u006f\u0072\u0074\u0065\u0064 \u0074\u006f\u002e`;
    if(Server.settings.get('spawnx') == undefined) return Server.eBroadcast(sptext, chatmsg.sender.name);if(Server.settings.get('spawny') == undefined) return Server.eBroadcast(sptext, chatmsg.sender.name);if(Server.settings.get('spawmz') == undefined) return Server.eBroadcast(sptext, chatmsg.sender.name);
    const sX: number = Server.settings.get('spawnx');const sY: number = Server.settings.get('spawny');const sZ: number = Server.settings.get('spawnz');
    Server.runCommands([`execute @a[name="${chatmsg.sender.name}"] ~~~ tp @s ${sX} ${sY} ${sZ}`,`playsound mob.shulker.teleport @a[name="${chatmsg.sender.name}"] ${sX} ${sY} ${sZ} 1 0.5`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0054\u0065\u006c\u0065\u006c\u0070\u006f\u0072\u0074\u0069\u006e\u0067\u002e\u002e\u002e\n\u00a7\u0061\u0050\u006f\u006f\u0066!"}]}`]);
});
Server.command.register({
    cancelMessage: true,
    name: 'setspawn',
    description: `Sets the world spawnpoint. This is also where people will be teleported if they type ${Server.CP}spawn.`,
    usage: 'setspawn',
    example: [
        'setspawn'
    ]
}, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname, '0');};
    if(Server.settings.get(CMDTname) == 0) return Server.eBroadcast(`${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}`,`@a[name="${chatmsg.sender.name}",tag=!v]`), Server.eBroadcast(`${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}`,`@a[name="${chatmsg.sender.name}",tag=v]`);
    Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 3`);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.name)) return Server.eBroadcast(Lang.anticlog, chatmsg.sender.name);
    Server.broadcast(`${Lang.MSC}\u00a7\u0061 \u0053\u0065\u0074 \u0073\u0070\u0061\u0077\u006e \u0074\u006f\u00a7\u0036\u00a7\u006c ${Math.trunc(chatmsg.sender.location.x)}\u002c ${Math.trunc(chatmsg.sender.location.y)}\u002c ${Math.trunc(chatmsg.sender.location.z)}\u00a7\u0072\u00a7\u0061! \u0054\u0079\u0070\u0065 \u00a7\u0037!\u0073\u0070\u0061\u0077\u006e\u00a7\u0061 \u0069\u006e \u0063\u0068\u0061\u0074 \u0074\u006f \u0074\u0065\u006c\u0065\u0070\u006f\u0072\u0074 \u0074\u006f \u0069\u0074 \u0077\u0068\u0065\u006e\u0065\u0076\u0065\u0072 \u0079\u006f\u0075 \u0077\u0061\u006e\u0074\u002e`, chatmsg.sender.name);
    Server.settings.set('spawnx', Math.trunc(chatmsg.sender.location.x));Server.settings.set('spawny', Math.trunc(chatmsg.sender.location.y));Server.settings.set('spawnz', Math.trunc(chatmsg.sender.location.z));
});
const registerInformationT = {
    cancelMessage: true,
    name: `${CMDname}T`,
    description: `Turns ${Server.CP}${CMDname} off, and on, so people can ${Server.CP}${CMDname} teleport thenselfs to spawn.`,
    usage: `${CMDname}T`,
    example: [
        `${CMDname}T`
    ]
};
Server.command.register(registerInformationT, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname,'0');};
    if(Server.settings.get(CMDTname) == 0) return Server.broadcast(`${Lang.CMDon}${CMDname}${Lang.CMDon2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'1');
    if(Server.settings.get(CMDTname) == 1) return Server.broadcast(`${Lang.CMDmid}${CMDname}${Lang.CMDmid2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'2');
    if(Server.settings.get(CMDTname) == 2) return Server.broadcast(`${Lang.CMDtag1}${CMDname}${Lang.CMDtag2}${CMDname}${Lang.CMDtag3}${CMDname}${Lang.CMDtag4}`, chatmsg.sender.name), Server.settings.set(CMDTname,'3');
    if(Server.settings.get(CMDTname) == 3) return Server.broadcast(`${Lang.CMDoff}${CMDname}${Lang.CMDoff2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'0');
});