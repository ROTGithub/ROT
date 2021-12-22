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
var CMDname = "rickroll"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `When you type ${Server.CP}${CMDname} in chat, it rickrolls everybody in the server but you.`,
    usage: `${CMDname}`,
    example: [
        `${CMDname}`
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.getScore('clcmdc', `${chatmsg.sender.name}`, { maximum: 0 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.noT}"}]}`]);
    Server.runCommands([`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 8`]);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.anticmdpvp}"}]}`])
    let r1: string = `Never gonna give you up`;
    let r2: string = `Never gonna let you down`;
    let r3: string = `Never gonna run around and desert you`;
    let r4: string = `Never gonna make you cry`;
    let r5: string = `Never gonna say goodbye`;
    let r6: string = `Never gonna tell a lie and hurt you`;
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0038\u0048\u0061\u0068\u0061\u002d\u0068\u0061\u0068\u0061\u002d\u0068\u0061\u0068\u0061\u002c \u0049 \u0052\u0069\u0063\u006b\u0072\u006f\u006c\u006c\u0065\u0064 \u0065\u0076\u0065\u0072\u0079\u006f\u006e\u0065 \u0069\u006e \u0074\u0068\u0065 \u0073\u0065\u0072\u0076\u0065\u0072!"}]}`])
    Server.broadcast(`${Lang.MSC} ${r1}`, `@a[name=!"${chatmsg.sender.name}"]`);
    Server.broadcast(`${Lang.MSC} ${r2}`, `@a[name=!"${chatmsg.sender.name}"]`);
    Server.broadcast(`${Lang.MSC} ${r3}`, `@a[name=!"${chatmsg.sender.name}"]`);
    Server.broadcast(`${Lang.MSC} ${r4}`, `@a[name=!"${chatmsg.sender.name}"]`);
    Server.broadcast(`${Lang.MSC} ${r5}`, `@a[name=!"${chatmsg.sender.name}"]`);
    Server.broadcast(`${Lang.MSC} ${r6}`, `@a[name=!"${chatmsg.sender.name}"]`);
});