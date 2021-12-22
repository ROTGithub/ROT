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
import { Server, Lang, setTickInterval} from '../../../Minecraft.js';
var CMDname = "stats"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `When you type ${Server.CP}${CMDname} in chat, you can see your stats`,
    usage: `${CMDname} [player?]`,
    example: [
        `${CMDname}`,
        `${CMDname} moisesgamingtv9`
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    var a = args.join(' ');
    if(a == '' || a == undefined) var a = chatmsg.sender.name;
    if(!Server.player.find(a)) return Server.eBroadcast(`${Lang.MSC} Sorry... You can't check the stats of players that are offline or never joined this server before. In the future, you will be able to :).`, chatmsg.sender.name);
    const w = Server.player.getScore('clwins', a);
    const l = Server.player.getScore('clloss', a);
    const k: number = Server.player.getScore('kills', a);
    const d: number = Server.player.getScore('cld', a);
    var kd = (k/d);
    const s = Server.player.getScore('swg', a);
    const sw = Server.player.getScore('sw', a);
    Server.broadcast(`${Lang.MSC} §a§l${a}§7's§r stats:\n     Wins: ${w}\n     Ls: ${l}\n     Kills: ${k}\n     Deaths: ${d}\n     K/D: ${kd}\n     Skywars Games Played: ${s}\n     Skywars Wins: ${sw}`, chatmsg.sender.name);
});
setTickInterval(function() {
    let r = Server.runCommand(`testfor @r`).statusMessage.replace('Found', '').trim();
    if(Server.player.getScore('killstreak', `${r}`) >= Server.player.getScore('hks', `${r}`)) Server.runCommand(`scoreboard players operation @a[name="${r}"] hks = @a[name="${r}"] killstreak`);
    if(Server.player.getScore('c', `${r}`) >= Server.player.getScore('cs', `${r}`)) Server.runCommand(`scoreboard players operation @a[name="${r}"] cs = @a[name="${r}"] c`);
    if(Server.player.getScore('l2', `${r}`) >= Server.player.getScore('l3', `${r}`)) {let v: number = Server.player.getScore('l3', `${r}`);let nl: number = v+v;Server.runCommands([`scoreboard players add ${r} l 1`,`scoreboard players remove ${r} l2 ${Server.player.getScore('l2', `${r}`)}`,`scoreboard players set ${r} l3 ${nl}`]);}
}, 1)