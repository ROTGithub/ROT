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
import { Server, Lang } from '../../../Minecraft.js';
const CMDTname: string = `tpa`
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}T`,
    description: `Turns ${Server.CP}${CMDname} off, and on, so people can use TPAs`,
    usage: `${CMDname}T`,
    example: [
        `${CMDname}T`
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.nameTag)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.nameTag)) return Server.runCommands([ `playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
    if(!Server.player.findTag('v', chatmsg.sender.nameTag)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.nameTag}"]`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    if(Server.entity.getScore(`cl${CMDname}`,'[type=rot:cl]', { minimum: 1, maximum: 1 })) return Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.nameTag}"] ~~~ 1 0.5`,`scoreboard players set @e[type=rot:cl] cl${CMDname} 2`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.CMDmid}${CMDname}${Lang.CMDmid2}"}]}`])
    if(Server.entity.getScore(`cl${CMDname}`,'[type=rot:cl]', { minimum: 2, maximum: 2 })) return Server.runCommands ([`playsound random.toast @a[name="${chatmsg.sender.nameTag}"] ~~~ 1 0.5`,`scoreboard players set @e[type=rot:cl] cl${CMDname} 0`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.CMDoff}${CMDname}${Lang.CMDoff2}"}]}`]);
        Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.nameTag}"] ~~~ 1 0.5`,`scoreboard players set @e[type=rot:cl] cl${CMDname} 1`,`tellraw @a[name="${chatmsg.sender.nameTag}"] {"rawtext":[{"text":"${Lang.CMDon}${CMDname}${Lang.CMDon2}"}]}`]);
});