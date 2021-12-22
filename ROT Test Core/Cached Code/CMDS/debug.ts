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
    name: 'debug',
    description: 'Get information about the current version of ROT installed.',
    usage: 'debug',
    example: [
        'debug'
    ]
};
Server.command.register(registerInformation, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.eBroadcast(Lang.setupa, chatmsg.sender.name);
    Server.broadcast(Lang.version, chatmsg.sender.name);
});