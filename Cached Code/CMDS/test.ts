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
var CMDname = "test"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `This is an ROT test command.`,
    usage: `${CMDname} [text]`,
    example: [
        `${CMDname} [Hi]`,
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if (!Server.player.find(chatmsg.sender.name)) return null;
    var regex = /\{([\s\S]*?)\}/g;
    var text = "Hi{Ok}Bye{No}";
    var match = text.match(regex);
    let textArray;
    if(match) {
        textArray = match.map(e=>{
            return e.substring(1).slice(0,-1);
        })
    }
    var input = [];
    var inputString = "Hi";
    
    var error1 = false;
    var output;
    try {
    var newRegex = new RegExp(`${inputString}\\{([\\s\\S]*?)\\}`,"g");
    } catch(e) {
        error1 = true;
    }
    if(!error1) {
        // @ts-ignore
        var text2 = text.match(newRegex);
        var text2 = text2[0]
            output = text2.split('{')[1].slice(0,-1);
    }
        Server.broadcast(text2, chatmsg.sender.name);
});