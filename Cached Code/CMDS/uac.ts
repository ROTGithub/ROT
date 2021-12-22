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
Server.command.register({
    cancelMessage: true,
    name: `toggle-anticbe`,
    usage: `toggle-anticbe`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/anticbe`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-antifly`,
    usage: `toggle-antifly`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/antifly`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-bottombedrock`,
    usage: `toggle-bottombedrock`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/bottombedrock`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-deatheffect`,
    usage: `toggle-deatheffect`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/deatheffect`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-enchanted-armor-disable`,
    usage: `toggle-enchanted-armor-disable`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/enchanted_armor_disable`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-fakestaffprotection`,
    usage: `toggle-fakestaffprotection`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/fakestaffprotection`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-hotbarmessage`,
    usage: `toggle-hotbarmessage`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/hotbarmessage`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-mining-detection`,
    usage: `toggle-mining-detection`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/mining_detection`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-noechest`,
    usage: `toggle-noechest`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/noechest`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-no-frostwalker`,
    usage: `toggle-no-frostwalker`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/nofrostwalker`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-opabuse`,
    usage: `toggle-opabuse`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/opabuse`]);
});
Server.command.register({
    cancelMessage: true,
    name: `toggle-worldborder`,
    usage: `toggle-worldborder`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function toggle/worldborder`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-10k`,
    usage: `worldborder-10k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/10k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-20k`,
    usage: `worldborder-20k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/20k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-30k`,
    usage: `worldborder-30k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/30k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-40k`,
    usage: `worldborder-40k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/40k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-50k`,
    usage: `worldborder-50k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/50k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-60k`,
    usage: `worldborder-60k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/60k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-70k`,
    usage: `worldborder-70k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/70k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-80k`,
    usage: `worldborder-80k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/80k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-90k`,
    usage: `worldborder-90k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/90k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `worldborder-100k`,
    usage: `worldborder-100k`
},(chatmsg)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~ ~ ~ function worldborder/100k-border`]);
});
Server.command.register({
    cancelMessage: true,
    name: `warn`,
    usage: `warn <Player Name>`,
    example: [
        'warn moisesgamingtv9'
    ]
},(chatmsg,args)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${args[0]}"] ~ ~ ~ function UAC/warn`]);
});
Server.command.register({
    cancelMessage: true,
    name: `warn-reset`,
    usage: `warn-reset <Player Name>`,
    example: [
        'warn-reset moisesgamingtv9'
    ]
},(chatmsg,args)=> {
    if (!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${args[0]}"] ~ ~ ~ function UAC/warnreset`]);
});