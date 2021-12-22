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
const registerInformation = {
    cancelMessage: true,
    name: 'vanish',
    description: 'Makes you vanish out of thin air so you can spy on people!',
    usage: 'vanish',
    example: [
        'v',
        'vanish'
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    if(!Server.player.findTag('vanish', chatmsg.sender.name)) return Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`tag @a[name="${chatmsg.sender.name}"] remove unvanish`,`tag @a[name="${chatmsg.sender.name}"] add vanish`,`effect @a[name="${chatmsg.sender.name}"] invisibility 100000 255 true`,`effect @a[name="${chatmsg.sender.name}"] night_vision 100000 255 true`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.v1}"}]}`,`event entity @a[name="${chatmsg.sender.name}"] rot:vanish`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`event entity @a[name="${chatmsg.sender.name}"] rot:unvanish`,`tag @a[name="${chatmsg.sender.name}"] add dvvanish`,`effect @a[name="${chatmsg.sender.name}"] invisibility 0`,`effect @a[name="${chatmsg.sender.name}"] night_vision 0`,`tag @a[name="${chatmsg.sender.name}"] remove vanish`,`tag @a[name="${chatmsg.sender.name}"] add unvanish`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.v2}"}]}`,`tag @a[name="${chatmsg.sender.name}"] remove dvvanish`
    ]);
});