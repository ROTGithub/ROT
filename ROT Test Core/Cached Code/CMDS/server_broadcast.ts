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
 name: 'broadcast',
 description: 'Broadcast message to the entire server',
 usage: 'broadcast <Message>',
 example: [
  `broadcast your mom`
]
}
Server.command.register(registerInformation,(chatmsg,args)=> {
  if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.runCommands([ `playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
  if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
  var args_joined = args.join(" ");
  args_joined = args_joined.replace(/&/g,"§")
  var players = Server.player.list();
  if(!args_joined) return Server.runCommands
  for(let i = 0;i < players.length;i++) {
  Server.runCommand(`playsound random.toast @a ~~~ 1 0.5`);
  Server.broadcast(`${Lang.MSC} ${args_joined}`, players[i]);
 }
});