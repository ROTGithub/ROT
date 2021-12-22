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
import { Server, Lang, Database, MS } from "../../../Minecraft.js";
export const db = new Database('ROT_bannedPlayers');
const findPlayerRegex = /(?<=^")([^"]+)(?=")/;
const timeFormatRegex = /^\d+\.?\d*\s?((years*?|yrs*?)|(weeks*?)|(days*?)|(hours*?|hrs*?)|(minutes*?|mins*?)|(seconds*?|secs*?)|(milliseconds*?|msecs*?|ms)|[smhdwy])(?!\S)(?=\s?)/;
const registerInformation = {
    cancelMessage: true,
    name: 'ban',
    description: 'Simple ban command...',
    usage: '"<player>" [ban length] [reason]',
    example: [
        'ban "notbeer" 30 minutes Using foul language',
        'ban "notbeer" 10 hours Bullying player',
        'ban "notbeer" 1 day Spamming chat',
        'ban "notbeer" 4 weeks Hacking'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    if(!args.join(' ').match(findPlayerRegex)) return Server.broadcast(`${Lang.MSC} §cType the player name in quotations for the first argument`, chatmsg.sender.name);
    const player = args.join(' ').match(findPlayerRegex)[0];
    const foundPlayer = Server.player.find(player);
    if(!foundPlayer) return Server.broadcast(`${Lang.MSC} §cCouldn't find player §f"§a${player}§f" §conline`, chatmsg.sender.name);
    if(foundPlayer && player === chatmsg.sender.name) return Server.broadcast(`${Lang.MSC} §cYou cannot ban yourself`, chatmsg.sender.name);
    if(Server.player.findTag('v', player)) return Server.broadcast(`${Lang.MSC} §cYou may not ban a staff member!`, chatmsg.sender.name);
    if(db.has(player)) return Server.broadcast(`${Lang.MSC} §cPlayer §f"§a${player}§f" §cis already banned...`, chatmsg.sender.name);
    let restArgs = args.join(' ').match(new RegExp(`(?<=^"${player}"\\s).+`));
    if(!restArgs || !restArgs[0].match(timeFormatRegex)) return Server.broadcast(`§c${restArgs ? 'Invalid' : 'Missing'} ban length argument`, chatmsg.sender.name);
    const time = MS(restArgs[0].match(timeFormatRegex)[0]);
    const reason = restArgs[0].replace(timeFormatRegex, '').replace(/^\s/, '');
    const today = new Date();
    const banData = {
        bannedPlayer: player,
        date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        length: time,
        unbanTime: today.getTime() + time,
        reason: reason,
        bannedBy: chatmsg.sender.name
    };
    db.set(player, banData);
});
const registerInformationUN = {
    cancelMessage: true,
    name: 'unban',
    description: 'Unban an banned player',
    usage: '"<player>"'
};
Server.command.register(registerInformationUN, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    if(!args.join(' ').match(findPlayerRegex)) return Server.broadcast(`${Lang.MSC} §cError: Type the player name in quotations for the first argument`, chatmsg.sender.name);
    const player = args.join(' ').match(/(?<=^")([^"]+)(?=")/)[0];
    if(player === chatmsg.sender.name) return Server.broadcast(`${Lang.MSC} §cError: You are not even banned...`, chatmsg.sender.name);
    if(!db.has(player)) return Server.broadcast(`${Lang.MSC} §cError: No player with the name §f"§a${player}§f" §cis banned`, chatmsg.sender.name);
    db.delete(player);
    return Server.broadcast(`${Lang.MSC} §a${player} §rhas been unbanned`, chatmsg.sender.name);
});
Server.on('tick', () => {
    const currentTime = new Date().getTime();
    const bannedPlayers = db.getCollection();
    if(!bannedPlayers) return;
    for(let key in bannedPlayers) {
        if(bannedPlayers.hasOwnProperty(key) && bannedPlayers[key]?.bannedPlayer) {
            if(bannedPlayers[key]?.unbanTime < currentTime) db.delete(key);
            else Server.runCommand(`kick "${bannedPlayers[key]?.bannedPlayer}" §r\n§cYou have been banned for §a${MS(bannedPlayers[key]?.length)}§c from this server at §b${bannedPlayers[key]?.date}${bannedPlayers[key]?.reason ? `\n§7Reason: §r${bannedPlayers[key]?.reason}`: ''}`);
        };
    };
});