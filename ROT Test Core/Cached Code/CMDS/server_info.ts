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
*/import { Server, Lang, Database } from '../../../Minecraft.js';
const registerInformation_serverinfoset = {
  cancelMessage: true,
  name: 'serverinfoset',
  description: 'Set info about the server'
}
// @ts-ignore
function ArrayIncludes(input, EQU) {
  for (let i = 0; i < input.length; i++) {
    if (input[i] == EQU) {
      return true;
    }
  }
  return false;
}
Server.command.register(registerInformation_serverinfoset, (chatmsg, args) => {
  if (!Server.player.findTag('rot', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
  if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
  var db = new Database("server_info");
  var args_tmp = args;
  var KEY = "";
  var VAL = "";
  var ALLOWED_KEYS = ["name", "creator", "season"];
  var ALLOWED_KEYS_STR = ALLOWED_KEYS.join(", ");
  if (ArrayIncludes(ALLOWED_KEYS, args[0])) {
    KEY = args[0];
  } else {
    return Server.broadcast("§cThe key you entered is not allowed! Here are the available keys (case sensitive): " + ALLOWED_KEYS_STR, chatmsg.sender.name), Server.runCommand(`playsound random.glass @a[name="${chatmsg.sender.name}"]`);
  }
  var args_tmp2 = "";
  args_tmp2 = args_tmp.join(" ");
  VAL = args_tmp2.replace(KEY + " ", "");
  db.set(KEY, VAL);
})
const registerInformation_serverinfo = {
  cancelMessage: true,
  name: 'si',
  description: 'Shows info about the server'
}
Server.command.register(registerInformation_serverinfo, (chatmsg) => {
  var db = new Database("server_info");
  if (!db.has("name") && !db.has("name"))
    if (db.has("name")) Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"§a§lServer Name:§r ${db.get("name")}"}]}`]);
  if (db.has("creator")) Server.broadcast("§a§lServer Creator:§r " + db.get("creator"), chatmsg.sender.name);
  if (db.has("season")) Server.broadcast("§a§lServer Season:§r " + db.get("season"), chatmsg.sender.name);
});