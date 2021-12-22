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
const CMDTname: string = `health`;
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}T`,
    description: `Turns ${Server.CP}${CMDname} off, and on, so people can see other people's health underneath their gamertag.`,
    usage: `${CMDname}T`,
    example: [
        `${CMDname}T`
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname,'0');};
    if(Server.settings.get(CMDTname) == 0) return Server.broadcast(`${Lang.MSC} \u00a7\u0061\u0050\u006c\u0061\u0079\u0065\u0072\u0073 \u0063\u0061\u006e \u006e\u006f\u0077 \u0073\u0065\u0065 \u006f\u0074\u0068\u0065\u0072 \u0070\u006c\u0061\u0079\u0065\u0072\u0027\u0073 \u0068\u0065\u0061\u006c\u0074\u0068 \u0062\u0065\u006c\u006f\u0077 \u0074\u0068\u0065\u0069\u0072 \u0067\u0061\u006d\u0065\u0072\u0074\u0061\u0067\u0073\u002e`, chatmsg.sender.name), Server.settings.set(CMDTname,'1'),Server.runCommand(`scoreboard objectives setdisplay belowname clROTh`),Server.settings.set(CMDTname, '1');
    if(Server.settings.get(CMDTname) == 1) return Server.broadcast(`${Lang.MSC} \u00a7\u0061\u0050\u006c\u0061\u0079\u0065\u0072\u0073 \u0063\u0061\u006e \u00a7\u0063\u00a7\u006c\u006e\u006f \u006c\u006f\u006e\u0067\u0065\u0072\u00a7\u0061 \u0073\u0065\u0065 \u006f\u0074\u0068\u0065\u0072 \u0070\u006c\u0061\u0079\u0065\u0072\u0027\u0073 \u0068\u0065\u0061\u006c\u0074\u0068 \u0062\u0065\u006c\u006f\u0077 \u0074\u0068\u0065\u0069\u0072 \u0067\u0061\u006d\u0065\u0072\u0074\u0061\u0067\u0073\u002e`, chatmsg.sender.name), Server.settings.set(CMDTname,'0'),Server.runCommand(`scoreboard objectives setdisplay belowname`),Server.settings.set(CMDTname, '0');
});