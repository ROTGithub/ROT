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
*/import { Server, Database } from '../../../Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'dataset',
    description: 'Data Storage Test',
    usage: 'dataset <Key: String> <Value: String>',
    example: [
        'datatest key value'
    ]
};
var userdb = new Database("ROT_user_db_test");
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
  try {
    var VAL = "";
    for(let i = 1;i < args.length;i++) {
      VAL += args[i] + " ";
    }
    userdb.set(args[0],VAL);
  } catch(e) {

  }
});
Server.command.register({
    cancelMessage: true,
    name: 'datadel',
    description: 'Data Storage Test',
    usage: '<Key: String>',
    example: [
        'datatest key'
    ]
}, (chatmsg,args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
  if(userdb.has(args[0])) userdb.delete(args[0])
})

Server.command.register({
    cancelMessage: true,
    name: 'dataread',
    description: 'Data Storage Test',
    usage: '<Key: String>',
    example: [
        'datatest key'
    ]
}, (chatmsg,args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
  if(userdb.has(args[0])) {
    var val = userdb.get(args[0])
    Server.broadcast("Value: "+val,chatmsg.sender.name)
  }
})