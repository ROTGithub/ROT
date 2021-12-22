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
var CMDname = "nothing"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `When you type ${Server.CP}${CMDname} in chat, nothing will happen.`,
    usage: `${CMDname}`,
    example: [
        `${CMDname}`
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    var randomstrings = [
        "Nothing",
        "Nothing?",
        "Nothing??",
        "Nothing???",
        "Nothing????",
        "Nothing?????",
        "Nothing??????",
        "Nothing???????",
        "Nothing????????",
        "Nothing?????????",
        "Nothing??????????",
        "Nothing???????????",
        "Nothing????????????",
        "Nothing?????????????",
        "Nothing??????????????",
        "Nothing???????????????",
        "Nothing????????????????",
        "Nothing?????????????????",
        "Nothing??????????????????",
        "Nothing???????????????????",
        "Nothing????????????????????",
        "Nothing!",
        "Nothing!!",
        "Nothing!!!",
        "Nothing",
        "Nothing!!!!!",
        "Nothing!!!!!!",
        "Nothing!!!!!!!",
        "Nothing!!!!!!!!",
        "Nothing!!!!!!!!!",
        "NoThInG",
        "nOtHiNg",
        "NOthINg",
        "noTHinG",
        "NOtHIng",
        "noThiNG"]
    let nR: string = randomstrings[Math.floor(Math.random() * randomstrings.length)]
    Server.runCommand(`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`)
    Server.broadcast(`${Lang.MSC} §4§l${nR}`, chatmsg.sender.name)
});