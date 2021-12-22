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
*/import { Server, Lang } from '../../../Minecraft.js';
import { notes } from './notes.js';
const CMDTname: string = 'cords';
const registerInformation = {
    cancelMessage: true,
    name: CMDTname,
    description: 'Use this command to find the cords',
    usage: 'cords <warp | spawn | home | pwarp | player | tell | notes>',
    example: [
        'cords spawn',
        'cords tell moisesgamingtv9',
        'cords notes',
        'cords tell Super Man 21'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('rot', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.setupa}"}]}`]);
    if(Server.player.getScore('clcmd', `${chatmsg.sender.name}`, { minimum: 1, maximum: 3 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `execute @a[name="${chatmsg.sender.name}"] ~~~ tellraw @s {"rawtext":[{"text":"${Lang.antispam}"}]}`]);
    Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 3`);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.anticmdpvp}"}]}`]);
    let warpOptions = ['warp', 'warps']; let spawnOptions = ['spawn', 'lobby', 'hub'];let homeOptions = ['home', 'house'];let pwarpOptions = ['pwarp', 'pwarps'];let playerOptions = ['player', 'players', 'find'];let tellOptions = ['tell', 'to', '@', 'forward', 'give'];let teamOptions = ['team', 'friends', 'tag', 'teams'];let notesOptions = ['warp', 'warps'];
     if(warpOptions.includes(args[0])) {
        if(!Server.entity.getScore(`clwarp`, '[type=rot:cl]', { minimum: 0, maximum: 0 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}",tag=!v] {"rawtext":[{"text":"${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}"}]}`, `tellraw @a[name="${chatmsg.sender.name}",tag=v] {"rawtext":[{"text":"${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}"}]}`]);
        const data = Server.runCommand(`tag @e[type=rot:cl] list`);
        const coordFormat = /(?<=[x-zX-Z]: )(-\d+|\d+)/g;
        const warpName = args.slice(1).join(' ').toLowerCase();
        const warpRegex = new RegExp(`\\$\\(ROT{warp-Name: ${warpName}, X: (-\\d+|\\d+), Y: (-\\d+|\\d+), Z: (-\\d+|\\d+)(.*)}\\)`);
        const findXYZ = `${data.statusMessage.match(warpRegex)}`.match(coordFormat);
        if(!args[1]) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cPlease type a warp name to find the cords of it."}]}`]);
        if(!data.statusMessage.match(warpRegex)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cThis server doesn't have a warp with that name!"}]}`]);
        Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §bThe cords of warp \"§6§l${warpName}§r§b\" are §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}"}]}`]);
    } else if(spawnOptions.includes(args[0])) {
        if(!Server.entity.getScore(`clspawn`, '[type=rot:cl]', { minimum: 0, maximum: 0 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}",tag=!v] {"rawtext":[{"text":"${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}"}]}`, `tellraw @a[name="${chatmsg.sender.name}",tag=v] {"rawtext":[{"text":"${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}"}]}`]);
        let sptext = `${Lang.MSC} \u00a7\u0063\u0059\u006f\u0075 \u0064\u0069\u0064\u006e\u0027\u0074 \u0073\u0065\u0074\u0075\u0070 \u0079\u006f\u0075\u0072 \u0073\u0070\u0061\u0077\u006e\u0021 \u0074\u0079\u0070\u0065 \u005c\u0022\u00a7\u0037${Server.CP}\u0073\u0065\u0074\u0073\u0070\u0061\u0077\u006e\u00a7\u0063\u005c\u0022 \u0069\u006e \u0063\u0068\u0061\u0074 \u0074\u006f \u0073\u0065\u0074 \u0074\u0068\u0065 \u0061\u0072\u0065\u0061 \u0079\u006f\u0075\u0072 \u0070\u006c\u0061\u0079\u0065\u0072\u0073 \u0077\u0069\u006c\u006c \u0062\u0065 \u0074\u0065\u006c\u0065\u0070\u006f\u0072\u0074\u0065\u0064 \u0074\u006f\u002e`;
        if(Server.entity.getScore('clsx', '[type=rot:cl]') == undefined) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${sptext}"}]}`]);
        if(Server.entity.getScore('clsy', '[type=rot:cl]') == undefined) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${sptext}"}]}`]);
        if(Server.entity.getScore('clsz', '[type=rot:cl]') == undefined) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${sptext}"}]}`]);
        const sX: number = Server.entity.getScore('clsx', '[type=rot:cl]');
        const sY: number = Server.entity.getScore('clsy', '[type=rot:cl]');
        const sZ: number = Server.entity.getScore('clsz', '[type=rot:cl]');
        Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §bThe cords of warp \"§6§lSPAWN§r§b\" are §a${sX}}§r, §a${sY}§r, §a${sZ}"}]}`]);
    } else if(homeOptions.includes(args[0])) {
        if(!Server.entity.getScore(`clhome`, '[type=rot:cl]', { minimum: 0, maximum: 0 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}",tag=!v] {"rawtext":[{"text":"${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}"}]}`, `tellraw @a[name="${chatmsg.sender.name}",tag=v] {"rawtext":[{"text":"${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}"}]}`]);
        if(!Server.player.getScore('clhome', chatmsg.sender.name, { maximum: 0 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} ${Lang.nohomeFB}"}]}`]);
        let hX: number = Server.player.getScore(`clhx`, chatmsg.sender.name);
        let hY: number = Server.player.getScore(`clhy`, chatmsg.sender.name);
        let hZ: number = Server.player.getScore(`clhz`, chatmsg.sender.name);
        Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] 1 0.5`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0032\u0059\u006f\u0075 \u0068\u0061\u0076\u0065 \u0062\u0065\u0065\u006e \u0074\u0065\u006c\u0065\u0070\u006f\u0072\u0074\u0065\u0064 \u0074\u006f \u0079\u006f\u0075\u0072 \u0068\u006f\u006d\u0065 \u0061\u0074 §a${hX}§2, §a${hY}§2, §a${hZ}§2\u002e"}]}`]);
    } else if(pwarpOptions.includes(args[0])) {
        if(!Server.entity.getScore(`cl${CMDname}`, '[type=rot:cl]', { minimum: 0, maximum: 0 })) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}",tag=!v] {"rawtext":[{"text":"${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}"}]}`, `tellraw @a[name="${chatmsg.sender.name}",tag=v] {"rawtext":[{"text":"${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}"}]}`]);
        const data = Server.runCommand(`tag "${chatmsg.sender.name}" list`);
        const coordFormat = /(?<=[x-zX-Z]: )(-\d+|\d+)/g;
        const pwarpName = args.slice(1).join(' ').toLowerCase();
        const pwarpRegex = new RegExp(`\\$\\(ROT{pwarp-Name: ${pwarpName}, X: (-\\d+|\\d+), Y: (-\\d+|\\d+), Z: (-\\d+|\\d+)(.*)}\\)`);
        const findpwarpNames = /(?<=\$\(ROT{pwarp-Name: ).+?(?=, X: (-\d+|\d+), Y: (-\d+|\d+), Z: (-\d+|\d+)}\))/g;
        const findXYZ = `${data.statusMessage.match(pwarpRegex)}`.match(coordFormat);
        if(!args[1]) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cPlease type a warp name to warp to!"}]}`]);
        if(!data.statusMessage.match(pwarpRegex)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cYou don't have a warp with that name!"}]}`]);
        Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §bThe cords of warp \"§6§l${pwarpName}§r§b\" are §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}"}]}`]);
     } else if (playerOptions.includes(args[0])) {
         if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
         if (!Server.player.find(args.slice(1).join(' ').toLowerCase())) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0063\u0048\u0075\u0068\u002c \u0073\u0065\u0065\u006d\u0073 \u006c\u0069\u006b\u0065 \u0049\u0027\u006d \u0075\u006e\u0061\u0062\u006c\u0065 \u0074\u006f \u0066\u0069\u006e\u0064 \u0074\u0068\u0065 \u0063\u006f\u0072\u0064\u0073 \u006f\u0066 \u0074\u0068\u0061\u0074 \u0070\u006c\u0061\u0079\u0065\u0072\u002e \u0048\u0075\u0068\u002c \u0069\u0074 \u0073\u0065\u0065\u006d\u0073 \u006c\u0069\u006b\u0065 \u0074\u0068\u0065\u0072\u0065\u0027\u0073 \u006e\u006f\u0074 \u0045\u0056\u0045\u004e \u0041 \u0050\u004c\u0041\u0059\u0045\u0052 \u004f\u004e\u004c\u0049\u004e\u0045 \u0057\u0049\u0054\u0048 \u0054\u0048\u0041\u0054 \u004e\u0041\u004d\u0045\u0021"}]}`]);
         if(args.slice(1).join(' ').toLowerCase()  == chatmsg.sender.name) return Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0049 \u0064\u006f\u006e\u0027\u0074 \u0072\u0065\u0061\u006c\u006c\u0079 \u006b\u006e\u006f\u0077 \u0077\u0068\u0079 \u0077\u006f\u0075\u006c\u0064 \u0079\u006f\u0075 \u006e\u0065\u0065\u0064 \u0074\u006f \u0066\u0069\u006e\u0064 \u0079\u006f\u0075\u0072 \u006f\u0077\u006e \u0063\u006f\u0072\u0064\u0073\u002e\u002e\u002e \u00a7\u0061\u0042\u0075\u0074\u002c \u0074\u0068\u0065\u0079 \u0061\u0072\u0065 \u00a7\u0063${Math.trunc(chatmsg.sender.location.x)}\u00a7\u0061\u002c \u00a7\u0063${Math.trunc(chatmsg.sender.location.y)}\u00a7\u0061\u002c \u00a7\u0063${Math.trunc(chatmsg.sender.location.z)}\u00a7\u0061\u002e"}]}`]);
         const fpc = args.slice(1).join(' ').toLowerCase();
         Server.runCommands([
             `execute @a[name="${fpc}"] ~~~ summon rot:finder "rot" ~~~`,
             `tp @e[type=rot:finder] @a[name="${fpc}"]`,
             `execute @e[type=rot:finder,x=16777216,dx=0] ~ ~ ~ scoreboard players set @s clx 16777216`,
             `execute @e[type=rot:finder,x=16777216,dx=0] ~ ~ ~ tp 16777216 ~ ~`,
             `execute @e[type=rot:finder,x=8388608,dx=8388607] ~ ~ ~ scoreboard players add @s clx 8388608`,
             `execute @e[type=rot:finder,x=8388608,dx=8388607] ~ ~ ~ tp ~-8388608 ~ ~`,
             `execute @e[type=rot:finder,x=4194304,dx=4194303] ~ ~ ~ scoreboard players add @s clx 4194304`,
             `execute @e[type=rot:finder,x=4194304,dx=4194303] ~ ~ ~ tp ~-4194304 ~ ~`,
             `execute @e[type=rot:finder,x=2097152,dx=2097151] ~ ~ ~ scoreboard players add @s clx 2097152`,
             `execute @e[type=rot:finder,x=2097152,dx=2097151] ~ ~ ~ tp ~-2097152 ~ ~`,
             `execute @e[type=rot:finder,x=1048576,dx=1048575] ~ ~ ~ scoreboard players add @s clx 1048576`,
             `execute @e[type=rot:finder,x=1048576,dx=1048575] ~ ~ ~ tp ~-1048576 ~ ~`,
             `execute @e[type=rot:finder,x=524288,dx=524287] ~ ~ ~ scoreboard players add @s clx 524288`,
             `execute @e[type=rot:finder,x=524288,dx=524287] ~ ~ ~ tp ~-524288 ~ ~`,
             `execute @e[type=rot:finder,x=262144,dx=262143] ~ ~ ~ scoreboard players add @s clx 262143`,
             `execute @e[type=rot:finder,x=262144,dx=262143] ~ ~ ~ tp ~-262143 ~ ~`,
             `execute @e[type=rot:finder,x=131072,dx=131071] ~ ~ ~ scoreboard players add @s clx 131072`,
             `execute @e[type=rot:finder,x=131072,dx=131071] ~ ~ ~ tp ~-131072 ~ ~`,
             `execute @e[type=rot:finder,x=65536,dx=65535] ~ ~ ~ scoreboard players add @s clx 65536`,
             `execute @e[type=rot:finder,x=65536,dx=65535] ~ ~ ~ tp ~-65536 ~ ~`,
             `execute @e[type=rot:finder,x=32768,dx=32767] ~ ~ ~ scoreboard players add @s clx 32768`,
             `execute @e[type=rot:finder,x=32768,dx=32767] ~ ~ ~ tp ~-32768 ~ ~`,
             `execute @e[type=rot:finder,x=16384,dx=16383] ~ ~ ~ scoreboard players add @s clx 16384`,
             `execute @e[type=rot:finder,x=16384,dx=16383] ~ ~ ~ tp ~-16384 ~ ~`,
             `execute @e[type=rot:finder,x=8192,dx=8191] ~ ~ ~ scoreboard players add @s clx 8192`,
             `execute @e[type=rot:finder,x=8192,dx=8191] ~ ~ ~ tp ~-8192 ~ ~`,
             `execute @e[type=rot:finder,x=4096,dx=4095] ~ ~ ~ scoreboard players add @s clx 4096`,
             `execute @e[type=rot:finder,x=4096,dx=4095] ~ ~ ~ tp ~-4096 ~ ~`,
             `execute @e[type=rot:finder,x=2048,dx=2047] ~ ~ ~ scoreboard players add @s clx 2048`,
             `execute @e[type=rot:finder,x=2048,dx=2047] ~ ~ ~ tp ~-2048 ~ ~`,
             `execute @e[type=rot:finder,x=1024,dx=1023] ~ ~ ~ scoreboard players add @s clx 1024`,
             `execute @e[type=rot:finder,x=1024,dx=1023] ~ ~ ~ tp ~-1024 ~ ~`,
             `execute @e[type=rot:finder,x=512,dx=511] ~ ~ ~ scoreboard players add @s clx 512`,
             `execute @e[type=rot:finder,x=512,dx=511] ~ ~ ~ tp ~-512 ~ ~`,
             `execute @e[type=rot:finder,x=256,dx=255] ~ ~ ~ scoreboard players add @s clx 256`,
             `execute @e[type=rot:finder,x=256,dx=255] ~ ~ ~ tp ~-256 ~ ~`,
             `execute @e[type=rot:finder,x=128,dx=127] ~ ~ ~ scoreboard players add @s clx 128`,
             `execute @e[type=rot:finder,x=128,dx=127] ~ ~ ~ tp ~-128 ~ ~`,
             `execute @e[type=rot:finder,x=64,dx=63] ~ ~ ~ scoreboard players add @s clx 64`,
             `execute @e[type=rot:finder,x=64,dx=63] ~ ~ ~ tp ~-64 ~ ~`,
             `execute @e[type=rot:finder,x=32,dx=31] ~ ~ ~ scoreboard players add @s clx 32`,
             `execute @e[type=rot:finder,x=32,dx=31] ~ ~ ~ tp ~-32 ~ ~`,
             `execute @e[type=rot:finder,x=16,dx=15] ~ ~ ~ scoreboard players add @s clx 16`,
             `execute @e[type=rot:finder,x=16,dx=15] ~ ~ ~ tp ~-16 ~ ~`,
             `execute @e[type=rot:finder,x=8,dx=7] ~ ~ ~ scoreboard players add @s clx 8`,
             `execute @e[type=rot:finder,x=8,dx=7] ~ ~ ~ tp ~-8 ~ ~`,
             `execute @e[type=rot:finder,x=4,dx=3] ~ ~ ~ scoreboard players add @s clx 4`,
             `execute @e[type=rot:finder,x=4,dx=3] ~ ~ ~ tp ~-4 ~ ~`,
             `execute @e[type=rot:finder,x=2,dx=1] ~ ~ ~ scoreboard players add @s clx 2`,
             `execute @e[type=rot:finder,x=2,dx=1] ~ ~ ~ tp ~-2 ~ ~`,
             `execute @e[type=rot:finder,x=1,dx=0] ~ ~ ~ scoreboard players add @s clx 1`,
             `execute @e[type=rot:finder,x=1,dx=0] ~ ~ ~ tp ~-1 ~ ~`,
             `execute @e[type=rot:finder,x=-16777216,dx=0] ~ ~ ~ scoreboard players set @s clx -16777216`,
             `execute @e[type=rot:finder,x=-16777216,dx=0] ~ ~ ~ tp -16777216 ~ ~`,
             `execute @e[type=rot:finder,x=-8388608,dx=-8388607] ~ ~ ~ scoreboard players remove @s clx 8388608`,
             `execute @e[type=rot:finder,x=-8388608,dx=-8388607] ~ ~ ~ tp ~8388608 ~ ~`,
             `execute @e[type=rot:finder,x=-4194304,dx=-4194303] ~ ~ ~ scoreboard players remove @s clx 4194304`,
             `execute @e[type=rot:finder,x=-4194304,dx=-4194303] ~ ~ ~ tp ~4194304 ~ ~`,
             `execute @e[type=rot:finder,x=-2097152,dx=-2097151] ~ ~ ~ scoreboard players remove @s clx 2097152`,
             `execute @e[type=rot:finder,x=-2097152,dx=-2097151] ~ ~ ~ tp ~2097152 ~ ~`,
             `execute @e[type=rot:finder,x=-1048576,dx=-1048575] ~ ~ ~ scoreboard players remove @s clx 1048576`,
             `execute @e[type=rot:finder,x=-1048576,dx=-1048575] ~ ~ ~ tp ~1048576 ~ ~`,
             `execute @e[type=rot:finder,x=-524288,dx=-524287] ~ ~ ~ scoreboard players remove @s clx 524288`,
             `execute @e[type=rot:finder,x=-524288,dx=-524287] ~ ~ ~ tp ~524288 ~ ~`,
             `execute @e[type=rot:finder,x=-262144,dx=-262143] ~ ~ ~ scoreboard players remove @s clx 262143`,
             `execute @e[type=rot:finder,x=-262144,dx=-262143] ~ ~ ~ tp ~262143 ~ ~`,
             `execute @e[type=rot:finder,x=-131072,dx=-131071] ~ ~ ~ scoreboard players remove @s clx 131072`,
             `execute @e[type=rot:finder,x=-131072,dx=-131071] ~ ~ ~ tp ~131072 ~ ~`,
             `execute @e[type=rot:finder,x=-65536,dx=-65535] ~ ~ ~ scoreboard players remove @s clx 65536`,
             `execute @e[type=rot:finder,x=-65536,dx=-65535] ~ ~ ~ tp ~65536 ~ ~`,
             `execute @e[type=rot:finder,x=-32768,dx=-32767] ~ ~ ~ scoreboard players remove @s clx 32768`,
             `execute @e[type=rot:finder,x=-32768,dx=-32767] ~ ~ ~ tp ~32768 ~ ~`,
             `execute @e[type=rot:finder,x=-16384,dx=-16383] ~ ~ ~ scoreboard players remove @s clx 16384`,
             `execute @e[type=rot:finder,x=-16384,dx=-16383] ~ ~ ~ tp ~16384 ~ ~`,
             `execute @e[type=rot:finder,x=-8192,dx=-8191] ~ ~ ~ scoreboard players remove @s clx 8192`,
             `execute @e[type=rot:finder,x=-8192,dx=-8191] ~ ~ ~ tp ~8192 ~ ~`,
             `execute @e[type=rot:finder,x=-4096,dx=-4095] ~ ~ ~ scoreboard players remove @s clx 4096`,
             `execute @e[type=rot:finder,x=-4096,dx=-4095] ~ ~ ~ tp ~4096 ~ ~`,
             `execute @e[type=rot:finder,x=-2048,dx=-2047] ~ ~ ~ scoreboard players remove @s clx 2048`,
             `execute @e[type=rot:finder,x=-2048,dx=-2047] ~ ~ ~ tp ~2048 ~ ~`,
             `execute @e[type=rot:finder,x=-1024,dx=-1023] ~ ~ ~ scoreboard players remove @s clx 1024`,
             `execute @e[type=rot:finder,x=-1024,dx=-1023] ~ ~ ~ tp ~1024 ~ ~`,
             `execute @e[type=rot:finder,x=-512,dx=-511] ~ ~ ~ scoreboard players remove @s clx 512`,
             `execute @e[type=rot:finder,x=-512,dx=-511] ~ ~ ~ tp ~512 ~ ~`,
             `execute @e[type=rot:finder,x=-256,dx=-255] ~ ~ ~ scoreboard players remove @s clx 256`,
             `execute @e[type=rot:finder,x=-256,dx=-255] ~ ~ ~ tp ~256 ~ ~`,
             `execute @e[type=rot:finder,x=-128,dx=-127] ~ ~ ~ scoreboard players remove @s clx 128`,
             `execute @e[type=rot:finder,x=-128,dx=-127] ~ ~ ~ tp ~128 ~ ~`,
             `execute @e[type=rot:finder,x=-64,dx=-63] ~ ~ ~ scoreboard players remove @s clx 64`,
             `execute @e[type=rot:finder,x=-64,dx=-63] ~ ~ ~ tp ~64 ~ ~`,
             `execute @e[type=rot:finder,x=-32,dx=-31] ~ ~ ~ scoreboard players remove @s clx 32`,
             `execute @e[type=rot:finder,x=-32,dx=-31] ~ ~ ~ tp ~32 ~ ~`,
             `execute @e[type=rot:finder,x=-16,dx=-15] ~ ~ ~ scoreboard players remove @s clx 16`,
             `execute @e[type=rot:finder,x=-16,dx=-15] ~ ~ ~ tp ~16 ~ ~`,
             `execute @e[type=rot:finder,x=-8,dx=-7] ~ ~ ~ scoreboard players remove @s clx 8`,
             `execute @e[type=rot:finder,x=-8,dx=-7] ~ ~ ~ tp ~8 ~ ~`,
             `execute @e[type=rot:finder,x=-4,dx=-3] ~ ~ ~ scoreboard players remove @s clx 4`,
             `execute @e[type=rot:finder,x=-4,dx=-3] ~ ~ ~ tp ~4 ~ ~`,
             `execute @e[type=rot:finder,x=-2,dx=-1] ~ ~ ~ scoreboard players remove @s clx 2`,
             `execute @e[type=rot:finder,x=-2,dx=-1] ~ ~ ~ tp ~2 ~ ~`,
             `execute @e[type=rot:finder,x=-1,dx=0] ~ ~ ~ scoreboard players remove @s clx 1`,
             `execute @e[type=rot:finder,x=-1,dx=0] ~ ~ ~ tp ~1 ~ ~`,
             `tp @e[type=rot:finder] @a[name="${fpc}"]`,
             `execute @e[type=rot:finder,y=4096,dy=16773120] ~ ~ ~ scoreboard players add @s cly 4096`,
             `execute @e[type=rot:finder,y=4096,dy=16773120] ~ ~ ~ tp ~ ~-4096 ~`,
             `execute @e[type=rot:finder,y=2048,dy=2047] ~ ~ ~ scoreboard players add @s cly 2048`,
             `execute @e[type=rot:finder,y=2048,dy=2047] ~ ~ ~ tp ~ ~-2048 ~`,
             `execute @e[type=rot:finder,y=1024,dy=1023] ~ ~ ~ scoreboard players add @s cly 1024`,
             `execute @e[type=rot:finder,y=1024,dy=1023] ~ ~ ~ tp ~ ~-1024 ~`,
             `execute @e[type=rot:finder,y=512,dy=511] ~ ~ ~ scoreboard players add @s cly 512`,
             `execute @e[type=rot:finder,y=512,dy=511] ~ ~ ~ tp ~ ~-512 ~`,
             `execute @e[type=rot:finder,y=256,dy=255] ~ ~ ~ scoreboard players add @s cly 256`,
             `execute @e[type=rot:finder,y=256,dy=255] ~ ~ ~ tp ~ ~-256 ~`,
             `execute @e[type=rot:finder,y=128,dy=127] ~ ~ ~ scoreboard players add @s cly 128`,
             `execute @e[type=rot:finder,y=128,dy=127] ~ ~ ~ tp ~ ~-128 ~`,
             `execute @e[type=rot:finder,y=64,dy=63] ~ ~ ~ scoreboard players add @s cly 64`,
             `execute @e[type=rot:finder,y=64,dy=63] ~ ~ ~ tp ~ ~-64 ~`,
             `execute @e[type=rot:finder,y=32,dy=31] ~ ~ ~ scoreboard players add @s cly 32`,
             `execute @e[type=rot:finder,y=32,dy=31] ~ ~ ~ tp ~ ~-32 ~`,
             `execute @e[type=rot:finder,y=16,dy=15] ~ ~ ~ scoreboard players add @s cly 16`,
             `execute @e[type=rot:finder,y=16,dy=15] ~ ~ ~ tp ~ ~-16 ~`,
             `execute @e[type=rot:finder,y=8,dy=7] ~ ~ ~ scoreboard players add @s cly 8`,
             `execute @e[type=rot:finder,y=8,dy=7] ~ ~ ~ tp ~ ~-8 ~`,
             `execute @e[type=rot:finder,y=4,dy=3] ~ ~ ~ scoreboard players add @s cly 4`,
             `execute @e[type=rot:finder,y=4,dy=3] ~ ~ ~ tp ~ ~-4 ~`,
             `execute @e[type=rot:finder,y=2,dy=1] ~ ~ ~ scoreboard players add @s cly 2`,
             `execute @e[type=rot:finder,y=2,dy=1] ~ ~ ~ tp ~ ~-2 ~`,
             `execute @e[type=rot:finder,y=1,dy=0] ~ ~ ~ scoreboard players add @s cly 1`,
             `execute @e[type=rot:finder,y=1,dy=0] ~ ~ ~ tp ~ ~-1 ~`,
             `execute @e[type=rot:finder,y=-4096,dy=-16773120] ~ ~ ~ scoreboard players remove @s cly 4096`,
             `execute @e[type=rot:finder,y=-4096,dy=-16773120] ~ ~ ~ tp ~ ~4096 ~`,
             `execute @e[type=rot:finder,y=-2048,dy=-2047] ~ ~ ~ scoreboard players remove @s cly 2048`,
             `execute @e[type=rot:finder,y=-2048,dy=-2047] ~ ~ ~ tp ~ ~2048 ~`,
             `execute @e[type=rot:finder,y=-1024,dy=-1023] ~ ~ ~ scoreboard players remove @s cly 1024`,
             `execute @e[type=rot:finder,y=-1024,dy=-1023] ~ ~ ~ tp ~ ~1024 ~`,
             `execute @e[type=rot:finder,y=-512,dy=-511] ~ ~ ~ scoreboard players remove @s cly 512`,
             `execute @e[type=rot:finder,y=-512,dy=-511] ~ ~ ~ tp ~ ~512 ~`,
             `execute @e[type=rot:finder,y=-256,dy=-255] ~ ~ ~ scoreboard players remove @s cly 256`,
             `execute @e[type=rot:finder,y=-256,dy=-255] ~ ~ ~ tp ~ ~256 ~`,
             `execute @e[type=rot:finder,y=-128,dy=-127] ~ ~ ~ scoreboard players remove @s cly 128`,
             `execute @e[type=rot:finder,y=-128,dy=-127] ~ ~ ~ tp ~ ~128 ~`,
             `execute @e[type=rot:finder,y=-64,dy=-63] ~ ~ ~ scoreboard players remove @s cly 64`,
             `execute @e[type=rot:finder,y=-64,dy=-63] ~ ~ ~ tp ~ ~64 ~`,
             `execute @e[type=rot:finder,y=-32,dy=-31] ~ ~ ~ scoreboard players remove @s cly 32`,
             `execute @e[type=rot:finder,y=-32,dy=-31] ~ ~ ~ tp ~ ~32 ~`,
             `execute @e[type=rot:finder,y=-16,dy=-15] ~ ~ ~ scoreboard players remove @s cly 16`,
             `execute @e[type=rot:finder,y=-16,dy=-15] ~ ~ ~ tp ~ ~16 ~`,
             `execute @e[type=rot:finder,y=-8,dy=-7] ~ ~ ~ scoreboard players remove @s cly 8`,
             `execute @e[type=rot:finder,y=-8,dy=-7] ~ ~ ~ tp ~ ~8 ~`,
             `execute @e[type=rot:finder,y=-4,dy=-3] ~ ~ ~ scoreboard players remove @s cly 4`,
             `execute @e[type=rot:finder,y=-4,dy=-3] ~ ~ ~ tp ~ ~4 ~`,
             `execute @e[type=rot:finder,y=-2,dy=-1] ~ ~ ~ scoreboard players remove @s cly 2`,
             `execute @e[type=rot:finder,y=-2,dy=-1] ~ ~ ~ tp ~ ~2 ~`,
             `execute @e[type=rot:finder,y=-1,dy=0] ~ ~ ~ scoreboard players remove @s cly 1`,
             `execute @e[type=rot:finder,y=-1,dy=0] ~ ~ ~ tp ~ ~1 ~`,
             `tp @e[type=rot:finder] @a[name="${fpc}"]`,
             `execute @e[type=rot:finder,z=16777216,dz=0] ~ ~ ~ scoreboard players set @s clz 16777216`,
             `execute @e[type=rot:finder,z=16777216,dz=0] ~ ~ ~ tp 16777216 ~ ~`,
             `execute @e[type=rot:finder,z=8388608,dz=8388607] ~ ~ ~ scoreboard players add @s clz 8388608`,
             `execute @e[type=rot:finder,z=8388608,dz=8388607] ~ ~ ~ tp ~ ~ ~-8388608`,
             `execute @e[type=rot:finder,z=4194304,dz=4194303] ~ ~ ~ scoreboard players add @s clz 4194304`,
             `execute @e[type=rot:finder,z=4194304,dz=4194303] ~ ~ ~ tp ~ ~ ~-4194304`,
             `execute @e[type=rot:finder,z=2097152,dz=2097151] ~ ~ ~ scoreboard players add @s clz 2097152`,
             `execute @e[type=rot:finder,z=2097152,dz=2097151] ~ ~ ~ tp ~ ~ ~-2097152`,
             `execute @e[type=rot:finder,z=1048576,dz=1048575] ~ ~ ~ scoreboard players add @s clz 1048576`,
             `execute @e[type=rot:finder,z=1048576,dz=1048575] ~ ~ ~ tp ~ ~ ~-1048576`,
             `execute @e[type=rot:finder,z=524288,dz=524287] ~ ~ ~ scoreboard players add @s clz 524288`,
             `execute @e[type=rot:finder,z=524288,dz=524287] ~ ~ ~ tp ~ ~ ~-524288`,
             `execute @e[type=rot:finder,z=262144,dz=262143] ~ ~ ~ scoreboard players add @s clz 262143`,
             `execute @e[type=rot:finder,z=262144,dz=262143] ~ ~ ~ tp ~ ~ ~-262143`,
             `execute @e[type=rot:finder,z=131072,dz=131071] ~ ~ ~ scoreboard players add @s clz 131072`,
             `execute @e[type=rot:finder,z=131072,dz=131071] ~ ~ ~ tp ~ ~ ~-131072`,
             `execute @e[type=rot:finder,z=65536,dz=65535] ~ ~ ~ scoreboard players add @s clz 65536`,
             `execute @e[type=rot:finder,z=65536,dz=65535] ~ ~ ~ tp ~ ~ ~-65536`,
             `execute @e[type=rot:finder,z=32768,dz=32767] ~ ~ ~ scoreboard players add @s clz 32768`,
             `execute @e[type=rot:finder,z=32768,dz=32767] ~ ~ ~ tp ~ ~ ~-32768`,
             `execute @e[type=rot:finder,z=16384,dz=16383] ~ ~ ~ scoreboard players add @s clz 16384`,
             `execute @e[type=rot:finder,z=16384,dz=16383] ~ ~ ~ tp ~ ~ ~-16384`,
             `execute @e[type=rot:finder,z=8192,dz=8191] ~ ~ ~ scoreboard players add @s clz 8192`,
             `execute @e[type=rot:finder,z=8192,dz=8191] ~ ~ ~ tp ~ ~ ~-8192`,
             `execute @e[type=rot:finder,z=4096,dz=4095] ~ ~ ~ scoreboard players add @s clz 4096`,
             `execute @e[type=rot:finder,z=4096,dz=4095] ~ ~ ~ tp ~ ~ ~-4096`,
             `execute @e[type=rot:finder,z=2048,dz=2047] ~ ~ ~ scoreboard players add @s clz 2048`,
             `execute @e[type=rot:finder,z=2048,dz=2047] ~ ~ ~ tp ~ ~ ~-2048`,
             `execute @e[type=rot:finder,z=1024,dz=1023] ~ ~ ~ scoreboard players add @s clz 1024`,
             `execute @e[type=rot:finder,z=1024,dz=1023] ~ ~ ~ tp ~ ~ ~-1024`,
             `execute @e[type=rot:finder,z=512,dz=511] ~ ~ ~ scoreboard players add @s clz 512`,
             `execute @e[type=rot:finder,z=512,dz=511] ~ ~ ~ tp ~ ~ ~-512`,
             `execute @e[type=rot:finder,z=256,dz=255] ~ ~ ~ scoreboard players add @s clz 256`,
             `execute @e[type=rot:finder,z=256,dz=255] ~ ~ ~ tp ~ ~ ~-256`,
             `execute @e[type=rot:finder,z=128,dz=127] ~ ~ ~ scoreboard players add @s clz 128`,
             `execute @e[type=rot:finder,z=128,dz=127] ~ ~ ~ tp ~ ~ ~-128`,
             `execute @e[type=rot:finder,z=64,dz=63] ~ ~ ~ scoreboard players add @s clz 64`,
             `execute @e[type=rot:finder,z=64,dz=63] ~ ~ ~ tp ~ ~ ~-64`,
             `execute @e[type=rot:finder,z=32,dz=31] ~ ~ ~ scoreboard players add @s clz 32`,
             `execute @e[type=rot:finder,z=32,dz=31] ~ ~ ~ tp ~ ~ ~-32`,
             `execute @e[type=rot:finder,z=16,dz=15] ~ ~ ~ scoreboard players add @s clz 16`,
             `execute @e[type=rot:finder,z=16,dz=15] ~ ~ ~ tp ~ ~ ~-16`,
             `execute @e[type=rot:finder,z=8,dz=7] ~ ~ ~ scoreboard players add @s clz 8`,
             `execute @e[type=rot:finder,z=8,dz=7] ~ ~ ~ tp ~ ~ ~-8`,
             `execute @e[type=rot:finder,z=4,dz=3] ~ ~ ~ scoreboard players add @s clz 4`,
             `execute @e[type=rot:finder,z=4,dz=3] ~ ~ ~ tp ~ ~ ~-4`,
             `execute @e[type=rot:finder,z=2,dz=1] ~ ~ ~ scoreboard players add @s clz 2`,
             `execute @e[type=rot:finder,z=2,dz=1] ~ ~ ~ tp ~ ~ ~-2`,
             `execute @e[type=rot:finder,z=1,dz=0] ~ ~ ~ scoreboard players add @s clz 1`,
             `execute @e[type=rot:finder,z=1,dz=0] ~ ~ ~ tp ~ ~ ~-1`,
             `execute @e[type=rot:finder,z=-16777216,dz=0] ~ ~ ~ scoreboard players set @s clz -16777216`,
             `execute @e[type=rot:finder,z=-16777216,dz=0] ~ ~ ~ tp -16777216 ~ ~`,
             `execute @e[type=rot:finder,z=-8388608,dz=-8388607] ~ ~ ~ scoreboard players remove @s clz 8388608`,
             `execute @e[type=rot:finder,z=-8388608,dz=-8388607] ~ ~ ~ tp ~ ~ ~8388608`,
             `execute @e[type=rot:finder,z=-4194304,dz=-4194303] ~ ~ ~ scoreboard players remove @s clz 4194304`,
             `execute @e[type=rot:finder,z=-4194304,dz=-4194303] ~ ~ ~ tp ~ ~ ~4194304`,
             `execute @e[type=rot:finder,z=-2097152,dz=-2097151] ~ ~ ~ scoreboard players remove @s clz 2097152`,
             `execute @e[type=rot:finder,z=-2097152,dz=-2097151] ~ ~ ~ tp ~ ~ ~2097152`,
             `execute @e[type=rot:finder,z=-1048576,dz=-1048575] ~ ~ ~ scoreboard players remove @s clz 1048576`,
             `execute @e[type=rot:finder,z=-1048576,dz=-1048575] ~ ~ ~ tp ~ ~ ~1048576`,
             `execute @e[type=rot:finder,z=-524288,dz=-524287] ~ ~ ~ scoreboard players remove @s clz 524288`,
             `execute @e[type=rot:finder,z=-524288,dz=-524287] ~ ~ ~ tp ~ ~ ~524288`,
             `execute @e[type=rot:finder,z=-262144,dz=-262143] ~ ~ ~ scoreboard players remove @s clz 262143`,
             `execute @e[type=rot:finder,z=-262144,dz=-262143] ~ ~ ~ tp ~ ~ ~262143`,
             `execute @e[type=rot:finder,z=-131072,dz=-131071] ~ ~ ~ scoreboard players remove @s clz 131072`,
             `execute @e[type=rot:finder,z=-131072,dz=-131071] ~ ~ ~ tp ~ ~ ~131072`,
             `execute @e[type=rot:finder,z=-65536,dz=-65535] ~ ~ ~ scoreboard players remove @s clz 65536`,
             `execute @e[type=rot:finder,z=-65536,dz=-65535] ~ ~ ~ tp ~ ~ ~65536`,
             `execute @e[type=rot:finder,z=-32768,dz=-32767] ~ ~ ~ scoreboard players remove @s clz 32768`,
             `execute @e[type=rot:finder,z=-32768,dz=-32767] ~ ~ ~ tp ~ ~ ~32768`,
             `execute @e[type=rot:finder,z=-16384,dz=-16383] ~ ~ ~ scoreboard players remove @s clz 16384`,
             `execute @e[type=rot:finder,z=-16384,dz=-16383] ~ ~ ~ tp ~ ~ ~16384`,
             `execute @e[type=rot:finder,z=-8192,dz=-8191] ~ ~ ~ scoreboard players remove @s clz 8192`,
             `execute @e[type=rot:finder,z=-8192,dz=-8191] ~ ~ ~ tp ~ ~ ~8192`,
             `execute @e[type=rot:finder,z=-4096,dz=-4095] ~ ~ ~ scoreboard players remove @s clz 4096`,
             `execute @e[type=rot:finder,z=-4096,dz=-4095] ~ ~ ~ tp ~ ~ ~4096`,
             `execute @e[type=rot:finder,z=-2048,dz=-2047] ~ ~ ~ scoreboard players remove @s clz 2048`,
             `execute @e[type=rot:finder,z=-2048,dz=-2047] ~ ~ ~ tp ~ ~ ~2048`,
             `execute @e[type=rot:finder,z=-1024,dz=-1023] ~ ~ ~ scoreboard players remove @s clz 1024`,
             `execute @e[type=rot:finder,z=-1024,dz=-1023] ~ ~ ~ tp ~ ~ ~1024`,
             `execute @e[type=rot:finder,z=-512,dz=-511] ~ ~ ~ scoreboard players remove @s clz 512`,
             `execute @e[type=rot:finder,z=-512,dz=-511] ~ ~ ~ tp ~ ~ ~512`,
             `execute @e[type=rot:finder,z=-256,dz=-255] ~ ~ ~ scoreboard players remove @s clz 256`,
             `execute @e[type=rot:finder,z=-256,dz=-255] ~ ~ ~ tp ~ ~ ~256`,
             `execute @e[type=rot:finder,z=-128,dz=-127] ~ ~ ~ scoreboard players remove @s clz 128`,
             `execute @e[type=rot:finder,z=-128,dz=-127] ~ ~ ~ tp ~ ~ ~128`,
             `execute @e[type=rot:finder,z=-64,dz=-63] ~ ~ ~ scoreboard players remove @s clz 64`,
             `execute @e[type=rot:finder,z=-64,dz=-63] ~ ~ ~ tp ~ ~ ~64`,
             `execute @e[type=rot:finder,z=-32,dz=-31] ~ ~ ~ scoreboard players remove @s clz 32`,
             `execute @e[type=rot:finder,z=-32,dz=-31] ~ ~ ~ tp ~ ~ ~32`,
             `execute @e[type=rot:finder,z=-16,dz=-15] ~ ~ ~ scoreboard players remove @s clz 16`,
             `execute @e[type=rot:finder,z=-16,dz=-15] ~ ~ ~ tp ~ ~ ~16`,
             `execute @e[type=rot:finder,z=-8,dz=-7] ~ ~ ~ scoreboard players remove @s clz 8`,
             `execute @e[type=rot:finder,z=-8,dz=-7] ~ ~ ~ tp ~ ~ ~8`,
             `execute @e[type=rot:finder,z=-4,dz=-3] ~ ~ ~ scoreboard players remove @s clz 4`,
             `execute @e[type=rot:finder,z=-4,dz=-3] ~ ~ ~ tp ~ ~ ~4`,
             `execute @e[type=rot:finder,z=-2,dz=-1] ~ ~ ~ scoreboard players remove @s clz 2`,
             `execute @e[type=rot:finder,z=-2,dz=-1] ~ ~ ~ tp ~ ~ ~2`,
             `execute @e[type=rot:finder,z=-1,dz=0] ~ ~ ~ scoreboard players remove @s clz 1`,
             `execute @e[type=rot:finder,z=-1,dz=0] ~ ~ ~ tp ~ ~ ~1`,
             `playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,
             `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0046\u0069\u006e\u0064\u0069\u006e\u0067 \u00a7\u0036\u00a7\u006c${fpc}\u0027\u0073\u00a7\u0072\u00a7\u0065 \u0063\u006f\u0072\u0064\u0073\u002e\u002e\u002e\n\u00a7\u0036\u00a7\u006c${fpc}\u0027\u0073\u00a7\u0072\u00a7\u0061 \u0063\u006f\u0072\u0064\u0073 \u0061\u0072\u0065 \u00a7\u0063${Server.entity.getScore('clx', '@e[type=rot:finder]')}\u00a7\u0061\u002c \u00a7\u0063${Server.entity.getScore('cly', '@e[type=rot:finder]')}\u00a7\u0061\u002c \u00a7\u0063${Server.entity.getScore('clz', '@e[type=rot:finder]')}\u00a7\u0072\u002e"}]}`,
             `kill @e[type=rot:finder]`
         ]);
        } else if (tellOptions.includes(args[0])) {
            if (!Server.player.find(args.slice(1).join(' ').toLowerCase())) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`, `tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0049 \u0063\u0061\u006e\u0027\u0074 \u0066\u0069\u006e\u0064 \u005c\u0022\u00a7\u0063\u00a7\u006c${args.slice(1).join(' ')}\u00a7\u0072\u00a7\u0065\u005c\u0022"}]}`]);
            if(args.slice(1).join(' ').toLowerCase()  == chatmsg.sender.name) return Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0049 \u0064\u006f\u006e\u0027\u0074 \u0072\u0065\u0061\u006c\u006c\u0079 \u006b\u006e\u006f\u0077 \u0077\u0068\u0079 \u0077\u006f\u0075\u006c\u0064 \u0079\u006f\u0075 \u006e\u0065\u0065\u0064 \u0074\u006f \u0066\u0069\u006e\u0064 \u0079\u006f\u0075\u0072 \u006f\u0077\u006e \u0063\u006f\u0072\u0064\u0073\u002e\u002e\u002e \u00a7\u0061\u0042\u0075\u0074\u002c \u0074\u0068\u0065\u0079 \u0061\u0072\u0065 \u00a7\u0063${Math.trunc(chatmsg.sender.location.x)}\u00a7\u0061\u002c \u00a7\u0063${Math.trunc(chatmsg.sender.location.y)}\u00a7\u0061\u002c \u00a7\u0063${Math.trunc(chatmsg.sender.location.z)}\u00a7\u0061\u002e"}]}`]);
            const tpc = args.slice(1).join(' ').toLowerCase();
            Server.runCommands([`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 3`,`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`playsound random.toast @a[name="${tpc}"] ~~~ 1 0.5`,`tellraw @a[name="${tpc}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0036\u00a7\u006c${chatmsg.sender.name} \u00a7\u0072\u00a7\u0061\u0068\u0061\u0073 \u0066\u006f\u0072\u0077\u0061\u0072\u0064\u0065\u0064 \u0074\u0068\u0065\u0069\u0072 \u0063\u006f\u0072\u0064\u0073 \u0074\u006f \u0079\u006f\u0075\u002e\u002e\u002e \u0054\u0068\u0065\u0079 \u0061\u0072\u0065 \u00a7\u0063${Math.trunc(chatmsg.sender.location.x)}\u00a7\u0061\u002c \u00a7\u0063${Math.trunc(chatmsg.sender.location.y)}\u00a7\u0061\u002c \u00a7\u0063${Math.trunc(chatmsg.sender.location.z)}\u00a7\u0061\u002e"}]}`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0061\u0049\u0027\u0076\u0065 \u0073\u0065\u006e\u0074 \u0079\u006f\u0075\u0072 \u0063\u006f\u0072\u0064\u0073 \u0074\u006f \u00a7\u0036\u00a7\u006c${tpc}"}]}`]);
        } else if (notesOptions.includes(args[0])) {
            Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0061\u0049\u0027\u0076\u0065 \u0073\u0061\u0076\u0065\u0064 \u0079\u006f\u0075\u0072 \u0063\u0075\u0072\u0072\u0065\u006e\u0074 \u0070\u006c\u0061\u0079\u0065\u0072\u0027\u0073 \u0063\u006f\u006f\u0072\u0064\u0069\u006e\u0061\u0074\u0065\u0073 \u0069\u006e \u0079\u006f\u0075\u0072 \u006e\u006f\u0074\u0065\u0073\u0021 \u0059\u006f\u0075 \u0063\u0061\u006e \u0074\u0079\u0070\u0065 \u005c\u0022\u00a7\u0037${Server.CP}\u006e\u006f\u0074\u0065\u0073 \u0072\u0065\u0061\u0064\u00a7\u0061\u005c\u0022 \u0069\u006e \u0063\u0068\u0061\u0074 \u0074\u006f \u0076\u0069\u0065\u0077 \u0074\u0068\u0065\u006d \u0077\u0068\u0065\u006e\u0065\u0076\u0065\u0072 \u0079\u006f\u0075 \u0077\u0061\u006e\u0074\u0021"}]}`]);
            if(args[0] == "add") {
                if(notes.has(`${chatmsg.sender.name}_notes`)) {
                    var new_value = notes.get(`${chatmsg.sender.name}_notes`)+'/n//'+args.join(' ').replace('add ','');
                    notes.set(`${chatmsg.sender.name}_notes`,new_value);
                } else {
                    notes.set(`${chatmsg.sender.name}_notes`,args.join(' ').replace('add ',''));
                }
            };
    } else return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error2}"}]}`]);
});