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
const CMDTname: string = `pwarp`;
const registerInformation = {
    cancelMessage: true,
    name: 'pwarp',
    description: 'Use this command to list, set, warp to, or remove your personal warps',
    usage: 'pwarp <list | set | remove | warp> [pwarp name]',
    example: [
        'pwarp list',
        'pwarp set <pwarp name>',
        'pwarp remove <pwarp name>',
        'pwarp warp <warp name>'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname, '0');};
    if(Server.settings.get(CMDTname) == 0) return Server.eBroadcast(`${Lang.CMDnotOna1}${CMDname}${Lang.CMDnotOna2}`, `@a[name="${chatmsg.sender.name}",tag=!v]`), Server.eBroadcast(`${Lang.CMDnotOnb1}${CMDname}${Lang.CMDnotOnb2}${CMDname}${Lang.CMDnotOnb3}`, `@a[name="${chatmsg.sender.name}",tag=v]`);
    if(Server.player.getScore('clcmd', chatmsg.sender.name, { minimum: 1, maximum: 3 })) return Server.eBroadcast(Lang.antispam, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == 2 && !Server.player.findTag('t', chatmsg.sender.name)) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);
    let tags = Server.player.getTags(chatmsg.sender.name);if(Server.settings.get(CMDTname) == 3){if(!tags.includes(`CMD ${CMDname}`)){if(!tags.includes('v')) return Server.eBroadcast(Lang.noT, chatmsg.sender.name);};};
    Server.runCommand(`scoreboard players set @a[name="${chatmsg.sender.name}",m=!c] clcmd 3`);
    if(Server.player.findTag('last_hit_by_player', chatmsg.sender.name)) return Server.eBroadcast(Lang.anticlog, chatmsg.sender.name);
    const data = Server.runCommand(`tag "${chatmsg.sender.name}" list`);
    const coordFormat = /(?<=[x-zX-Z]: )(-\d+|\d+)/g;
    const pwarpName = args.slice(1).join(' ').toLowerCase();
    const pwarpRegex = new RegExp(`\\$\\(ROT{pwarp-Name: ${pwarpName}, X: (-\\d+|\\d+), Y: (-\\d+|\\d+), Z: (-\\d+|\\d+)(.*)}\\)`);
    const findpwarpNames = /(?<=\$\(ROT{pwarp-Name: ).+?(?=, X: (-\d+|\d+), Y: (-\d+|\d+), Z: (-\d+|\d+)}\))/g;
    const findXYZ = `${data.statusMessage.match(pwarpRegex)}`.match(coordFormat);
    let listOptions = ['list', 'all'];let setOptions = ['set', 'add'];let removeOptions = ['remove', 'unadd'];let warpOptions = ['warp', 'tp'];
    if(!args.length || listOptions.includes(args[0])) {
        const allpwarps = data.statusMessage.match(findpwarpNames);
        return Server.broadcast(`${allpwarps ? `${Lang.MSC} §bYou have total of §e${allpwarps.length} §bwarps.\nHere are the list of your personal warps: \n§a${allpwarps.join('§r,\n §a')}` : `${Lang.MSC} §cIt seems like you haven\'t set any warps, yet-`}`, chatmsg.sender.name), Server.runCommand(`playsound random.glass @a[name="${chatmsg.sender.name}"]`);
    } else if(setOptions.includes(args[0])) {
        if(!args[1]) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cPlease type a UNIQUE warp name to set!"}]}`]);
        if(pwarpName.match(coordFormat)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cYou may not indentify your warp name in a coordinate format!"}]}`]);
        if(data.statusMessage.match(pwarpRegex)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cYou already have a warp set with that name!"}]}`]);
        Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`tag "${chatmsg.sender.name}" add "$(ROT{pwarp-Name: ${pwarpName}, X: ${Math.trunc(chatmsg.sender.location.x)}, Y: ${Math.trunc(chatmsg.sender.location.y)}, Z: ${Math.trunc(chatmsg.sender.location.z)}})"`]);
        return Server.broadcast(`${Lang.MSC} §bYou have set a warp with the name §a${pwarpName} §bat§r: §a${Math.trunc(chatmsg.sender.location.x)}§r, §a${Math.trunc(chatmsg.sender.location.y)}§r, §a${Math.trunc(chatmsg.sender.location.z)}`, chatmsg.sender.name);
    } else if(removeOptions.includes(args[0])) {
        if(!args[1]) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cPlease type a warp name to remove!"}]}`]);
        if(!data.statusMessage.match(pwarpRegex)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cYou don't have a warp with that name!"}]}`]);
        else {
            Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`tag "${chatmsg.sender.name}" remove "$(ROT{pwarp-Name: ${pwarpName}, X: ${findXYZ[0]}, Y: ${findXYZ[1]}, Z: ${findXYZ[2]}})"`]);
            return Server.broadcast(`${Lang.MSC} §bSuccessfully removed warp with the name §a${pwarpName} §bat §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}`, chatmsg.sender.name);
        };
    } else if(warpOptions.includes(args[0])) {
        if(!args[1]) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cPlease type a warp name to warp to!"}]}`]);
        if(!data.statusMessage.match(pwarpRegex)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} §cYou don't have a warp with that name!"}]}`]);
        Server.runCommand(`execute "${chatmsg.sender.name}" ~~~ tp @s ${findXYZ[0]} ${findXYZ[1]} ${findXYZ[2]}`);
        return Server.broadcast(`${Lang.MSC} §bYou have been teleported to §a${findXYZ[0]}§r, §a${findXYZ[1]}§r, §a${findXYZ[2]}`, chatmsg.sender.name);
    } else return Server.eBroadcast(Lang.error2, chatmsg.sender.name);
});
const registerInformationT = {
    cancelMessage: true,
    name: `${CMDname}T`,
    description: `Turns ${Server.CP}${CMDname} off, and on, so people can create person warps and teleport themself to it whenever they want.`,
    usage: `${CMDname}T`,
    example: [
        `${CMDname}T`
    ]
};
Server.command.register(registerInformationT, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    if(Server.settings.get(CMDTname) == undefined) {Server.settings.set(CMDTname,'0');};
    if(Server.settings.get(CMDTname) == 0) return Server.broadcast(`${Lang.CMDon}${CMDname}${Lang.CMDon2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'1');
    if(Server.settings.get(CMDTname) == 1) return Server.broadcast(`${Lang.CMDmid}${CMDname}${Lang.CMDmid2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'2');
    if(Server.settings.get(CMDTname) == 2) return Server.broadcast(`${Lang.CMDtag1}${CMDname}${Lang.CMDtag2}${CMDname}${Lang.CMDtag3}${CMDname}${Lang.CMDtag4}`, chatmsg.sender.name), Server.settings.set(CMDTname,'3');
    if(Server.settings.get(CMDTname) == 3) return Server.broadcast(`${Lang.CMDoff}${CMDname}${Lang.CMDoff2}`, chatmsg.sender.name), Server.settings.set(CMDTname,'0');
});