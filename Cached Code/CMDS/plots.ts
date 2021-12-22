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
var CMDname = "plots"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `This command will help you create islands for people easier.`,
    usage: `${CMDname} create|load|tp|invite|kick|settings`,
    example: [
        `${CMDname} create [name] [structure block name] [player spawn location] [Generating area] [Distance between]`,
        `${CMDname} create`,
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.eBroadcast(Lang.setupa, chatmsg.sender.name);
    let createPlots = ['create', 'make', 'set'];
    if(!args.length || createPlots.includes(args[0])) {
        if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
        Server.broadcast(`${Lang.MSC} \u00a7\u0061\u0047\u0065\u0074\u0074\u0069\u006e\u0067 \u0072\u0065\u0061\u0064 \u0074\u006f \u0063\u0072\u0065\u0061\u0074\u0065 \u0069\u0073\u006c\u0061\u006e\u0064\u002e\u002e\u002e\n\u0050\u006c\u0065\u0061\u0073\u0065 \u0074\u0079\u0070\u0065 \u006e\u0061\u006d\u0065 \u0066\u006f\u0072 \u0074\u0068\u0065 \u0069\u0073\u006c\u0061\u006e\u0064\u002e`, chatmsg.sender.name);
        Server.runCommand('');
    };
});