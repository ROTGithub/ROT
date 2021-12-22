/*
ROT BM Developers and Contributors:
The iOpTicX (OWNER/CEO) 
Moises (Head Developer)
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 ______     __    __    
/\  == \   /\ "-./  \   
\ \  __<   \ \ \-./\ \  
 \ \_____\  \ \_\ \ \_\ 
  \/_____/   \/_/  \/_/ 
                        
-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
© Copyright 2021 all rights reserved by Moisesgamingtv9. Do NOT steal, copy the code, or claim it as yours!
Please message moisesgamingtv9#8583 on Discord, or join the ROT discord: https://discord.com/invite/2ADBWfcC6S
Thank you!
*/
import { Server, Lang } from '../Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'setup',
    description: 'This command sets up ROT!',
    usage: 'setup',
    example: [
        'setup'
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v' || 'kv', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.broadcast('Hi, hello my name is moisesgamingtv9');
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`, `execute @a[name="${chatmsg.sender.name}"] ~~~ summon rot:cl "cl" ~~~`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setups}"}]}`]);
    Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setupb}"}]}`]);
});