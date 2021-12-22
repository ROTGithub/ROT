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
const CMDTname: string = `sleep`;
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}T`,
    description: `Turns ${Server.CP}${CMDname} off, and on, so only one person needs to sleep can skip the night.`,
    usage: `${CMDname}T`,
    example: [
        `${CMDname}T`
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.runCommands([ `playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    if(Server.entity.getScore(`cl${CMDname}`,'[type=rot:cl]', { minimum: 1, maximum: 1 })) return Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`scoreboard players set @e[type=rot:cl] cl${CMDname} 2`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u004f\u006e\u006c\u0079 \u0074\u0072\u0075\u0073\u0074\u0065\u0064 \u0070\u006c\u0061\u0079\u0065\u0072\u0073 \u0063\u0061\u006e \u0073\u006b\u0069\u0070 \u0074\u0068\u0065 \u006e\u0069\u0067\u0068\u0074 \u0066\u0061\u0073\u0074\u0065\u0072\u002e"}]}`]);
    if(Server.entity.getScore(`cl${CMDname}`,'[type=rot:cl]', { minimum: 2, maximum: 2 })) return Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`scoreboard players set @e[type=rot:cl] cl${CMDname} 0`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u004e\u006f\u0062\u006f\u0064\u0079 \u0063\u0061\u006e \u0073\u006b\u0069\u0070 \u0074\u0068\u0065 \u006e\u0069\u0067\u0068\u0074 \u0066\u0061\u0073\u0074\u0065\u0072"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`scoreboard players set @e[type=rot:cl] cl${CMDname} 1`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0061\u0045\u0076\u0065\u0072\u0079\u0062\u006f\u0064\u0079 \u0063\u0061\u006e \u0073\u006b\u0069\u0070 \u0074\u0068\u0065 \u006e\u0069\u0067\u0068\u0074 \u0066\u0061\u0073\u0074\u0065\u0072\u002e"}]}`]);
});