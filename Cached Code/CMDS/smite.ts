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
var CMDname = "smite"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `Smites the people you hate.`,
    usage: `${CMDname}`,
    example: [
        `${CMDname} [player-name]`
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    Server.runCommands([`execute @a[name="${chatmsg.sender.name}"] ~~~ tag @a[name="${args.join(' ')}"] add smite`,`execute @a[name="${chatmsg.sender.name}"] ~~~ tag ${args.join(' ')} add smite`]);
});