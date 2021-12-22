/*
ROT Developers and Contributors:
Moises (OWNER/CEO), 
TRASH (DEVELOPER),
notbeer (Most of ROT's Structure code)
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
*/import { Server, Lang } from '../../../Minecraft.js';
const CMDTname: string = 'home';
const registerInformation = {
    cancelMessage: true,
    name: CMDTname,
    description: 'Use this command to set, delete, or teleport to your home',
    usage: '<set | delete | tp>',
    example: [
        'home set',
        'home delete',
        'home tp'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.eBroadcast(Lang.setupa, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname, '0');};
    if(Server.settings.get(CMDTname) == 0) return Server.eBroadcast(`${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}`, `@a[name="${chatmsg.sender.name}",tag=!v]`), Server.eBroadcast(`${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}`, `@a[name="${chatmsg.sender.name}",tag=v]`);
    if(Server.player.getScore('clcmd', chatmsg.sender.name, { minimum: 1, maximum: 3 })) return Server.eBroadcast(Lang.antispam, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == 2 && !Server.player.findTag('t', chatmsg.sender.name)) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);
    let tags = Server.player.getTags(chatmsg.sender.name);if(Server.settings.get(CMDTname) == 3){if(!tags.includes(`CMD ${CMDname}`)){if(!tags.includes('v')) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);};};
    Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 3`);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.name)) return Server.eBroadcast(Lang.anticlog, chatmsg.sender.name);
    let setOptions = ['set', 'add', 'create']; let removeOptions = ['delete', 'remove']; let warpOptions = ['warp', 'tp'];
    if(setOptions.includes(args[0])) {
        let hX: number = Math.trunc(chatmsg.sender.location.x);
        let hY: number = Math.trunc(chatmsg.sender.location.y);
        let hZ: number = Math.trunc(chatmsg.sender.location.z);
        Server.broadcast(`${Lang.MSC} \u00a7\u0032\u0059\u006f\u0075\u0072 \u0068\u006f\u006d\u0065 \u0068\u0061\u0073 \u0062\u0065\u0065\u006e \u0074\u006f §a${hX}§2, §a${hY}§2, §a ${hZ}§2!`, chatmsg.sender.name);
        Server.runCommands([`scoreboard players set @a[name="${chatmsg.sender.name}"] clhx ${hX}`,`scoreboard players set @a[name="${chatmsg.sender.name}"] clhy ${hY}`,`scoreboard players set @a[name="${chatmsg.sender.name}"] clhz ${hZ}`,`scoreboard players set @a[name="${chatmsg.sender.name}"] clhome 1`]);
    } else if(removeOptions.includes(args[0])) {
        if(!Server.player.getScore('clhome', chatmsg.sender.name, {maximum: 0})) return Server.eBroadcast(Lang.nohomeFB, chatmsg.sender.name);
        Server.broadcast(`${Lang.MSC} \u00a7\u0065\u0044\u0065\u006c\u0065\u0074\u0069\u006e\u0067 \u0068\u006f\u006d\u0065\u002e\u002e\u002e\u005c\u006e\u00a7\u0061\u0044\u006f\u006e\u0065!`, chatmsg.sender.name);
        Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.name}"] clhome 0`);
    } else if(warpOptions.includes(args[0])) {
        if(!Server.player.getScore('clhome', chatmsg.sender.name, {maximum: 0})) return Server.eBroadcast(Lang.nohomeFB, chatmsg.sender.name);
        let hX: number = Server.player.getScore(`clhx`, chatmsg.sender.name);
        let hY: number = Server.player.getScore(`clhy`, chatmsg.sender.name);
        let hZ: number = Server.player.getScore(`clhz`, chatmsg.sender.name);
        Server.broadcast(`\u00a7\u0032\u0059\u006f\u0075 \u0068\u0061\u0076\u0065 \u0062\u0065\u0065\u006e \u0074\u0065\u006c\u0065\u0070\u006f\u0072\u0074\u0065\u0064 \u0074\u006f \u0079\u006f\u0075\u0072 \u0068\u006f\u006d\u0065 \u0061\u0074 §a${hX}§2, §a${hY}§2, §a${hZ}§2\u002e`, chatmsg.sender.name);
        Server.runCommand(`execute @a[name="${chatmsg.sender.name}"] ~~~ tp @s ${hX} ${hY} ${hZ}`);
    } else return Server.eBroadcast(Lang.error2, chatmsg.sender.name);
});
const registerInformationT = {
    cancelMessage: true,
    name: `${CMDname}T`,
    description: `Turns ${Server.CP}${CMDname} off, and on, so people can set their home and teleport to it whenever they want. They will also spawn at the home they set when or if they die.`,
    usage: `${CMDname}T`,
    example: [
        `${CMDname}T`
    ]
};
Server.command.register(registerInformationT, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.setupa}`, chatmsg.sender.name);
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname,'0');};
    if(Server.settings.get(CMDTname) == 0) return Server.broadcast(`${Lang.CMDon}${CMDname}${Lang.CMDon2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'1');
    if(Server.settings.get(CMDTname) == 1) return Server.broadcast(`${Lang.CMDmid}${CMDname}${Lang.CMDmid2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'2');
    if(Server.settings.get(CMDTname) == 2) return Server.broadcast(`${Lang.CMDtag1}${CMDname}${Lang.CMDtag2}${CMDname}${Lang.CMDtag3}${CMDname}${Lang.CMDtag4}`, chatmsg.sender.name), Server.settings.set(CMDTname,'3');
    if(Server.settings.get(CMDTname) == 3) return Server.broadcast(`${Lang.CMDoff}${CMDname}${Lang.CMDoff2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'0');
});