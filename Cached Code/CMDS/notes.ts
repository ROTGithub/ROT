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
import { Server, Database, Lang } from '../../../Minecraft.js';
export var notes = new Database("notes");
// @ts-ignore
function removeValue(arr,val) {
        for( var i = 0; i < arr.length; i++ ){ 
        if ( arr[i] === val ) { 
            arr.splice(i, 1); 
        }
    }
}
Server.command.register({
    cancelMessage: true,
    name: `notes`,
    usage: `notes <add <Text> | remove-all | read | remove <ID:Int>>`,
    description: `Add notes for a to do list, store coordinates, and other stuff.`,
    example: [
        `notes add This is a note`,
        `notes remove-all`,
        `notes read`,
        `notes remove 0`
    ]
},(chatmsg,args)=> {
    if(args.length == 0) return;
    if(args[0] == "add") {
        if(notes.has(`${chatmsg.sender.name}_notes`)) {
            var new_value = notes.get(`${chatmsg.sender.name}_notes`)+'/n//'+args.join(' ').replace('add ','');
            notes.set(`${chatmsg.sender.name}_notes`,new_value);
        } else {
            notes.set(`${chatmsg.sender.name}_notes`,args.join(' ').replace('add ',''));
        };
    } else if(args[0] == "read") {
        if(notes.has(`${chatmsg.sender.name}_notes`)) {
            var notes2 = notes.get(`${chatmsg.sender.name}_notes`).split('/n//');
            Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC}"}]}`]);
            for(let i = 0;i < notes2.length;i++) {
               Server.broadcast(`\u00a7\u0063\u0028\u00a7\u0064\u004e\u006f\u0074\u0065 \u00a7\u0061\u0049\u0044\u003a ${i}\u00a7\u0063\u0029 \u00a7\u0062${notes2[i]}`, chatmsg.sender.name);
            }
        } else {
            Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"\u00a7\u0063\u0059\u006f\u0075 \u0064\u006f\u006e\u0027\u0074 \u0068\u0061\u0076\u0065 \u0061\u006e\u0079 \u006e\u006f\u0074\u0065\u0073! \u0055\u0073\u0065 \u005c\u0022!\u006e\u006f\u0074\u0065\u0073 \u0061\u0064\u0064 \u003c\u0054\u0065\u0078\u0074\u003e\u005c\u0022 \u0074\u006f \u0061\u0064\u0064 \u0061 \u006e\u006f\u0074\u0065\u002e"}]}`]);
        }
    } else if(args[0] == "remove-all") {
        if(notes.has(`${chatmsg.sender.name}_notes`)) {
            notes.delete(`${chatmsg.sender.name}_notes`);
        } else {
            Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"\u00a7\u0063\u0059\u006f\u0075 \u0064\u006f\u006e\u0027\u0074 \u0068\u0061\u0076\u0065 \u0061\u006e\u0079 \u006e\u006f\u0074\u0065\u0073!"}]}`]);
        }
    } else if(args[0] == "remove") {
        if(notes.has(`${chatmsg.sender.name}_notes`)) {
            var notes2 = notes.get(`${chatmsg.sender.name}_notes`).split("/n//");
            removeValue(notes2,notes2[parseInt(args[1])]);
            notes.set(`${chatmsg.sender.name}_notes`,notes2.join('/n//'));
        } else {
            Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"\u00a7\u0063\u0059\u006f\u0075 \u0064\u006f\u006e\u0027\u0074 \u0068\u0061\u0076\u0065 \u0061\u006e\u0079 \u006e\u006f\u0074\u0065\u0073!"}]}`]);
        }
    }
});