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
*/import { Server, Lang, setTickInterval } from '../../../Minecraft.js';
const CMDTname: string = `vein`;
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}T`,
    description: `Turns ${Server.CP}${CMDname} off, and on, so people can use vein miner`,
    usage: `${CMDname}T`,
    example: [
        `${CMDname}T`
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.setupa}`, chatmsg.sender.name);
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname,'0');};
    if(Server.settings.get(CMDTname) == 0) return Server.broadcast(`${Lang.CMDon}${CMDname}${Lang.CMDon2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'1');
    if(Server.settings.get(CMDTname) == 1) return Server.broadcast(`${Lang.CMDmid}${CMDname}${Lang.CMDmid2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'2');
    if(Server.settings.get(CMDTname) == 2) return Server.broadcast(`${Lang.CMDtag1}${CMDname}${Lang.CMDtag2}${CMDname}${Lang.CMDtag3}${CMDname}${Lang.CMDtag4}`, chatmsg.sender.name), Server.settings.set(CMDTname,'3');
    if(Server.settings.get(CMDTname) == 3) return Server.broadcast(`${Lang.CMDoff}${CMDname}${Lang.CMDoff2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'0');
});
setTickInterval(function() {
    const p = Server.runCommand(`testfor @r`);
    if(!Server.player.find(p)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.eBroadcast(Lang.setupa, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname, '0');};
    if(Server.settings.get(CMDTname) == 0) return Server.eBroadcast(`${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}`, `@a[name="${chatmsg.sender.name}",tag=!v]`), Server.eBroadcast(`${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}`, `@a[name="${chatmsg.sender.name}",tag=v]`);
    if(Server.player.getScore('clcmd', chatmsg.sender.name, { minimum: 1, maximum: 3 })) return Server.eBroadcast(Lang.antispam, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == 2 && !Server.player.findTag('t', chatmsg.sender.name)) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);
    let tags = Server.player.getTags(chatmsg.sender.name);if(Server.settings.get(CMDTname) == 3){if(!tags.includes(`CMD ${CMDname}`)){if(!tags.includes('v')) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);};};
    Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 3`);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.name)) return Server.eBroadcast(Lang.anticlog, chatmsg.sender.name);
}, 10)