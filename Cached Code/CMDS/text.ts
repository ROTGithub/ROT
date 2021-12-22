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
var CMDname = "text"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `This will make a floating text!`,
    usage: `${CMDname} [text]`,
    example: [
        `${CMDname} Plz donate, I'm homeless!`,
        `${CMDname} Welcome to ROT craft or something dumb.`
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    Server.broadcast(`${Lang.MSC} \u00a7\u0061\u0043\u0072\u0065\u0061\u0074\u0069\u006e\u0067 \u0066\u006c\u006f\u0061\u0074\u0069\u006e\u0067 \u0074\u0065\u0078\u0074\u002e\u002e\u002e\n\u0043\u0072\u0065\u0061\u0074\u0065\u0064 \u0066\u006c\u006f\u0061\u0074\u0069\u006e\u0067 \u0074\u0065\u0078\u0074 \u00a7\u0063${args.join(' ')}\u00a7\u0072\u00a7\u0061!`, chatmsg.sender.name);
    Server.runCommand(`execute @a[name="${chatmsg.sender.name}"] ~~~ summon rabbit "${args.join(' ')}" ~~~`);
});