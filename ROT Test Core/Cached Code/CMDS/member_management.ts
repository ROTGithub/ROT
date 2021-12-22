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
export var players = new Database("players")
var muted_players = new Database("muted_players");
var CONFIG = new Database("rot_config");
if(!CONFIG.has('joinmsg')) CONFIG.set('joinmsg','undefined');
// @ts-ignore
function removeValue(arr,val) {
    for( var i = 0; i < arr.length; i++){ 
    if ( arr[i] === val) { 
        arr.splice(i, 1); 
    }
}};
Server.addListener("playerJoin", player => {
    if(players.has("members")) {
        var members = players.get("members").split('/n//');
        if(members.includes(player.nameTag)) {
            return;
        } else {
            var server_id = (Math.floor(Math.random() * 10000000)).toString();
            players.set(`server_id_${player.nameTag}`,server_id);
            players.set("members",`${players.get("members")}/n//${player.nameTag}`)
            if(CONFIG.get('joinmsg') !== "undefined") Server.broadcast(CONFIG.get('joinmsg'),player.nameTag);
        }
    } else {
        players.set(`server_id_${player.nameTag}`,(Math.floor(Math.random() * 10000000)).toString());
        players.set("members",`${player.nameTag}`)
    }
});
Server.command.register({
    cancelMessage: true,
    name: `members`,
    usage: `members`,
    description: `Shows people who have joined before`
},(data)=> {
    var members = players.get("members").split('/n//');
    Server.runCommands([`playsound random.toast @a[name="${data.sender.name}"] ~~~ 1 0.5`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.MSC}"}]}`]);
    for(let i = 0;i < members.length;i++) {
        Server.broadcast(`§c(§dID: §a${players.get("server_id_"+members[i])}§c, §dName: §a${members[i]}§c)`,`${data.sender.name}`);
    };
});
Server.command.register({
    cancelMessage: true,
    name: `mute`,
    usage: `mute <Name>`,
    description: `Mute a player`
},(data,args)=> {
    if(!Server.player.findTag('v', data.sender.name)) return Server.eBroadcast(`${Lang.error}`, data.sender.name);
    if(!Server.player.find(args.join(' '))) return Server.runCommands([`playsound random.glass @a[name="${data.sender.name}"]`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0055\u006e\u0061\u0062\u006c\u0065 \u0074\u006f \u0066\u0069\u006e\u0064 \u0070\u006c\u0061\u0079\u0065\u0072\u003a ${args.join(' ')}"}]}`]);
    if(muted_players.has('mute')) {
        muted_players.set('mute',`${muted_players.get('mute')}/n//${args.join(' ')}`);
        return Server.runCommands([`playsound random.toast @a[name="${data.sender.name}"] ~~~ 1 0.5`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0061\u0053\u0075\u0063\u0063\u0065\u0073\u0073\u0066\u0075\u006c\u006c\u0079 \u006d\u0075\u0074\u0065\u0064 \u00a7\u0063\u00a7\u006c${args.join(' ')}\u00a7\u0072\u00a7\u0061\u0021"}]}`]);
    }
});
Server.command.register({
    cancelMessage: true,
    name: `unmute`,
    usage: `unmute <Name>`,
    description: `Unmute a player`
},(data,args)=> {
    if (!Server.player.findTag('v', data.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${data.sender.name}"]`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    if(muted_players.has('mute')) {
        var muted_players_list = muted_players.get('mute').split('/n//');
        if(muted_players_list.includes(`${args[0]}`)) {
            removeValue(muted_players_list,args.join(' '));
            muted_players.set('mute',muted_players_list.join('/n//'));
            return Server.runCommands([`playsound random.toast @a[name="${data.sender.name}"] ~~~ 1 0.5`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0055\u006e\u006d\u0075\u0074\u0069\u006e\u0067 \u00a7\u006c\u00a7\u0036${args.join(' ')}\u00a7\u0072\u00a7\u0065\u002e\u002e\u002e\n\u00a7\u0061\u0055\u006e\u006d\u0075\u0074\u0065\u0064 \u00a7\u0036\u00a7\u006c${args.join(' ')}\u00a7\u0072\u00a7\u0061\u0021"}]}`]);
        } else {
            return Server.runCommands([`playsound random.glass @a[name="${data.sender.name}"]`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0049 \u0063\u0061\u006e\u006e\u006f\u0074 \u0066\u0069\u006e\u0064 \u0074\u0068\u0061\u0074 \u006d\u0075\u0074\u0065\u0064 \u0070\u006c\u0061\u0079\u0065\u0072\u002e \u0050\u006c\u0065\u0061\u0073\u0065 \u006d\u0061\u006b\u0065 \u0073\u0075\u0072\u0065 \u0079\u006f\u0075 \u0073\u0070\u0065\u006c\u0074 \u0074\u0068\u0065\u0069\u0072 \u006e\u0061\u006d\u0065 \u0063\u006f\u0072\u0072\u0065\u0063\u0074\u006c\u0079\u0021"}]}`]);
        }
    } else {
        return Server.runCommands([`playsound random.glass @a[name="${data.sender.name}"]`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0063\u0061\u006e\u0027\u0074 \u0075\u006e\u006d\u0075\u0074\u0065 \u0061 \u0070\u006c\u0061\u0079\u0065\u0072 \u006f\u006e \u0061 \u0073\u0065\u0072\u0076\u0065\u0072 \u0074\u0068\u0061\u0074 \u0068\u0061\u0073 \u006e\u006f \u006d\u0075\u0074\u0065\u0064 \u0070\u006c\u0061\u0079\u0065\u0072\u0073\u0021"}]}`]);
    }
});
Server.command.register({
    cancelMessage: true,
    name: `gmp`,
    usage: `gmp`,
    description: `See all muted players`
},(data)=> {
    if (!Server.player.findTag('v', data.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${data.sender.name}"]`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    if(muted_players.has('mute')) {
        var muted_players_list = muted_players.get('mute').split('/n//');
        Server.runCommands([`playsound random.toast @a[name="${data.sender.name}"] ~~~ 1 0.5`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.MSC}"}]}`]);
        for(let i = 0;i < muted_players_list.length;i++) {
            Server.broadcast(`§c(§dMuted Players§c) §b${muted_players_list[i]}`, data.sender.name);
        }
    } else {
        return Server.runCommands([`playsound random.glass @a[name="${data.sender.name}"]`,`tellraw @a[name="${data.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0068\u0061\u0076\u0065 \u006e\u006f \u006d\u0075\u0074\u0065\u0064 \u0070\u006c\u0061\u0079\u0065\u0072\u0073 \u006f\u006e \u0079\u006f\u0075\u0072 \u0073\u0065\u0072\u0076\u0065\u0072\u0021"}]}`]);
    };
});