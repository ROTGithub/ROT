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
const CMDTname: string = `fly`
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `When you type ${Server.CP}${CMDname} in chat, you'll be able to fly.`,
    usage: `${CMDname}`,
    example: [
        `${CMDname}`
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname,'0');};
    if(Server.settings.get(CMDTname) == 0) return Server.broadcast(`${Lang.CMDon}${CMDname}${Lang.CMDon2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'1');
    if(Server.settings.get(CMDTname) == 1) return Server.broadcast(`${Lang.CMDmid}${CMDname}${Lang.CMDmid2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'2');
    if(Server.settings.get(CMDTname) == 2) return Server.broadcast(`${Lang.CMDtag1}${CMDname}${Lang.CMDtag2}${CMDname}${Lang.CMDtag3}${CMDname}${Lang.CMDtag4}`, chatmsg.sender.name), Server.settings.set(CMDTname,'3');
    if(Server.settings.get(CMDTname) == 3) return Server.broadcast(`${Lang.CMDoff}${CMDname}${Lang.CMDoff2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'0');
    if(Server.player.getScore('clfly', chatmsg.sender.name, { minimum: 0, maximum: 0 })) return Server.runCommands([`ability @a[name="${chatmsg.sender.name}"] mayfly true`,`scoreboard players set @a[name="${chatmsg.sender.name}"] clfly 1`]),Server.broadcast(Lang.flyonFB, chatmsg.sender.name);
    if(Server.player.getScore('clfly', chatmsg.sender.name, { minimum: 1, maximum: 1 })) return Server.runCommands([`ability @a[name="${chatmsg.sender.name}"] mayfly false`,`scoreboard players set @a[name="${chatmsg.sender.name}"] clfly 0`]),Server.broadcast(Lang.flyoffFB, chatmsg.sender.name);
});
const registerInformationT = {
    cancelMessage: true,
    name: `${CMDname}T`,
    description: `Turns ${Server.CP}${CMDname} off, and on, so people can fly around when type ${CMDname} in chat.`,
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