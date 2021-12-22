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
import { Server, Lang, Database, setTickInterval } from '../../../Minecraft.js';
import { writeLeaderboard } from '../../../build/miscellaneous/leaderboard.js';
var CMDname = "sw"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `This command will help you make skywars! This took FOREVER`,
    usage: `${CMDname}`,
    example: [
        `${CMDname} create <name>`,
        `${CMDname} set [pos(1-2)|spawn|chest|midchest|lobby|setspec|setmega|setlead|item|midchest|playarea|team] <name>`,
        `${CMDname} list [spawn|chest|midchest|item|lead] <name>`,
        `${CMDname} remove [spawn|chest|midchest|mega|lead|item] <name>`,
        `${CMDname} list`,
        `${CMDname} start <name>`,
        `${CMDname} stop <name>`,
        `${CMDname} delete <name>`,
    ]
};
const swm = new Database('SkywarsMaps');
const swc = new Database('SkywarsCords');
const swl = new Database('SkywarsLoot');
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.eBroadcast(`${Lang.error}`, chatmsg.sender.name);
    let create = ['create','make','add'];let set = ['set','put','force'];let list = [''];let remove = [''];let start = [''];let stop = [''];let yeet = [''];
    if(!args.length || create.includes(args[0])) {
        if(swm.get('maps') == undefined) {swm.set('maps', ' ');};
        if(swm.get('maps').includes(args[1])) return Server.eBroadcast(`${Lang.MSC} iOpTicX you i dot. There is already a skywars map with the name ${args[1]}.`, chatmsg.sender.name);
        swm.set('maps', `${swm.get('maps')} ${args[1]}`);
        swm.set(`${args[1]}1x`,null);swm.set(`${args[1]}1y`,null);swm.set(`${args[1]}1z`,null);
        swm.set(`${args[1]}2x`,null);swm.set(`${args[1]}2y`,null);swm.set(`${args[1]}2z`,null);
        swm.set(`${args[1]}s`,0);swm.set(`${args[1]}c`,0);swm.set(`${args[1]}t`,0);
        swm.set(`${args[1]}l`,0);swm.set(`${args[1]}spec`,0);swm.set(`${args[1]}pa`,0);
        Server.broadcast(`${Lang.MSC} A map has been made with the name "§a${args[1]}§7"!`, chatmsg.sender.name);
        return Server.runCommands([`scoreboard objectives add sw${args[1]}w dummy`,`scoreboard objectives add sw${args[1]}l dummy`,`scoreboard objectives add sw${args[1]}k dummy`,`scoreboard objectives add sw${args[1]}d dummy`,`scoreboard objectives add sw${args[1]}kd dummy`]);
    } else if(set.includes(args[0])) {
        //!sw set0 pos1 Home2
        //Actually have it clone instead
        if(args[2] == '' || args[2] == undefined) return Server.eBroadcast(`${Lang.MSC} You forgot something in the command. You can do !help SW for more info.`, chatmsg.sender.name);
        if(!swm.get('maps').includes(args[2])) return Server.eBroadcast(`${Lang.MSC} There is not a map with tha name "${args[2]}".`, chatmsg.sender.name);
        let pos = ['pos','border','position'];let pos1 = ['pos1','border1','position1'];let pos2 = ['pos2','border2','position2'];let lobby = ['pre-game','pregame','hub','lobby','main'];let chest = ['chest','noob','loot'];let midchest = ['midchest','midc','middlechest','midloot','middleloot'];let spawn = ['spawn','player','playerspawn','dropper'];let spec = ['spec','dead','watch','watcher','watchers','spectator','spectators'];let mega = ['mega','big','megachest','bigchest'];let leader = ['lead','leader','leaderboard','top','top-player','top-players'];
        if(pos.includes(args[1])) {
            return Server.eBroadcast(`${Lang.MSC} You need to put a number to tell me which side you want to set. For example "§a!sw set pos1 ${args[2]}§7".`, chatmsg.sender.name);
        } else if(pos1.includes(args[1])) {
            Server.broadcast(`${Lang.MSC} Setting the pos1 for §a${args[2]}§7 to §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7.`, chatmsg.sender.name);
            return swm.set(`${args[2]}1x`, Math.trunc(chatmsg.sender.location.x)),swm.set(`${args[2]}1y`, Math.trunc(chatmsg.sender.location.y)),swm.set(`${args[2]}1z`, Math.trunc(chatmsg.sender.location.z));
        } else if(pos2.includes(args[1])) {
            Server.broadcast(`${Lang.MSC} Setting the pos2 for §a${args[2]}§7 to §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7.`, chatmsg.sender.name);
            return swm.set(`${args[2]}2x`, Math.trunc(chatmsg.sender.location.x)),swm.set(`${args[2]}2y`, Math.trunc(chatmsg.sender.location.y)),swm.set(`${args[2]}2z`, Math.trunc(chatmsg.sender.location.z));
        } else if(lobby.includes(args[1])) {
            Server.broadcast(`${Lang.MSC} Setting the lobby for §a${args[2]}§7 to §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7.`, chatmsg.sender.name);
            return swc.set(`${args[2]}lx`, Math.trunc(chatmsg.sender.location.x)),swc.set(`${args[2]}ly`, Math.trunc(chatmsg.sender.location.y)),swc.set(`${args[2]}lz`, Math.trunc(chatmsg.sender.location.z)),swm.set(`${args[2]}l`,1);
        } else if(chest.includes(args[1])) {
            if(swm.get(`${args[2]}s`)+1 == 39-Infinity) return Server.eBroadcast(`${Lang.MSC} Sorry, you can only add up to §438§7 chest in a map to prevent any database errors. Hopefully moises will fix this in the future.`);
            Server.broadcast(`${Lang.MSC} Adding a chest in §a${args[2]}§7 at the location §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7 facing §a${Server.player.directionXZ(chatmsg.sender.name)}§7.`, chatmsg.sender.name);
            return swm.set(`${args[2]}c`,swm.get(`${args[2]}c`)+1),swc.set(`${args[2]}cx${swm.get(`${args[2]}c`)}`, Math.trunc(chatmsg.sender.location.x)),swc.set(`${args[2]}cy${swm.get(`${args[2]}c`)}`, Math.trunc(chatmsg.sender.location.y)),swc.set(`${args[2]}cz${swm.get(`${args[2]}c`)}`, Math.trunc(chatmsg.sender.location.y)),swc.set(`${args[2]}cf${swm.get(`${args[2]}c`)}`,Server.player.directionXZ(chatmsg.sender.name));
        } else if(midchest.includes(args[1])) {
            if(swm.get(`${args[2]}s`)+1 == 16-Infinity) return Server.eBroadcast(`${Lang.MSC} Sorry, you can only add up to §415§7 mid chest in a map to prevent any database errors. Hopefully moises will fix this in the future.`);
            Server.broadcast(`${Lang.MSC} Adding a middle chest in §a${args[2]}§7 at the location §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7 facing §a${Server.player.directionXZ(chatmsg.sender.name)}§7.`, chatmsg.sender.name);
            return swm.set(`${args[2]}m`,swm.get(`${args[2]}m`)+1),swc.set(`${args[2]}mx${swm.get(`${args[2]}m`)}`, Math.trunc(chatmsg.sender.location.x)),swc.set(`${args[2]}my${swm.get(`${args[2]}m`)}`, Math.trunc(chatmsg.sender.location.y)),swc.set(`${args[2]}mz${swm.get(`${args[2]}m`)}`, Math.trunc(chatmsg.sender.location.y)),swc.set(`${args[2]}mf${swm.get(`${args[2]}m`)}`,Server.player.directionXZ(chatmsg.sender.name));
        } else if(spawn.includes(args[1])) {
            if(swm.get(`${args[2]}s`)+1 == 12-Infinity) return Server.eBroadcast(`${Lang.MSC} Sorry, you can only add up to §411§7 spawns becasue this is a realm.`);
            Server.broadcast(`${Lang.MSC} Adding a player dropdown spawn ${swm.get(`${args[2]}s`)+1} for §a${args[2]}§7 to §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7.`, chatmsg.sender.name);
            return swm.set(`${args[2]}s`,swm.get(`${args[2]}s`)+1),swc.set(`${args[2]}sx${swm.get(`${args[2]}s`)}`, Math.trunc(chatmsg.sender.location.x)),swc.set(`${args[2]}sy${swm.get(`${args[2]}s`)}`, Math.trunc(chatmsg.sender.location.y)),swc.set(`${args[2]}sz${swm.get(`${args[2]}s`)}`, Math.trunc(chatmsg.sender.location.z));
        } else if(spec.includes(args[1])) {
            Server.broadcast(`${Lang.MSC} Setting the spectator spawn area for §a${args[2]}§7 to §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7.`, chatmsg.sender.name);
            return swc.set(`${args[2]}spx`, Math.trunc(chatmsg.sender.location.x)),swc.set(`${args[2]}spy`, Math.trunc(chatmsg.sender.location.y)),swc.set(`${args[2]}spz`, Math.trunc(chatmsg.sender.location.z)),swm.set(`${args[2]}sp`,1);
        } else if(mega.includes(args[1])) {
            Server.broadcast(`${Lang.MSC} Setting the MEGA chest for §a${args[2]}§7 to §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7.`, chatmsg.sender.name);
            return swc.set(`${args[2]}mx`, Math.trunc(chatmsg.sender.location.x)),swc.set(`${args[2]}my`, Math.trunc(chatmsg.sender.location.y)),swc.set(`${args[2]}mz`, Math.trunc(chatmsg.sender.location.z));
        } else if(leader.includes(args[1])) {
            let leaderk = ['-kills','-kill','-k'];let leaderd = ['-deaths','-death','-d'];let leaderw = ['-win','-wins','w','ws','victory'];let leaderl = ['-l','-ls','-losses','-loss','-lose'];let leaderkd = ['-kd','-killdeath','-killdeaths','-k/d'];var m = args[2];
            if(leaderk.includes(args[1])) {var d = 'k'} else if(leaderd.includes(args[1])) {var d = 'd'} else if(leaderw.includes(args[1])) {var d = 'w'} else if(leaderl.includes(args[1])) {var d = 'l'} else if(leaderkd.includes(args[1])) {var d = 'kd'} else return Server.eBroadcast(`${Lang.MSC} You need to add a - and a map you want to display. For example "§a!sw set leader-kills EpicPvPMapForSkywars§7", or "§a!sw set leader-deaths all§7". Yes, you can use all to display the all time stats.`);
            if(args[2].toLowerCase() == 'all') {var m = '';var d = '';} else if(!swm.get('maps').includes(args[2])) return Server.eBroadcast(`${Lang.MSC} ${args[2]} is not a map you have setup.`);
            Server.broadcast(`${Lang.MSC} Creating a leaderboard for §a${args[2]}§7 at §a${Math.trunc(chatmsg.sender.location.x)}§7, §a${Math.trunc(chatmsg.sender.location.y)}§7, §a${Math.trunc(chatmsg.sender.location.z)}§7.`, chatmsg.sender.name);
            writeLeaderboard([Math.trunc(chatmsg.sender.location.x), Math.trunc(chatmsg.sender.location.y), Math.trunc(chatmsg.sender.location.z)], [`money`], 10, { heading: 'Money Leaderboard\nTop players with the most stuff\n§r\n', layout: '§e#$(RANK) §b$(GAMERTAG) §f- §a$§c$(SCORE)' }, { compressScore: true })
            return writeLeaderboard([Math.trunc(chatmsg.sender.location.x), Math.trunc(chatmsg.sender.location.y), Math.trunc(chatmsg.sender.location.z)], [`sw${m}${d}`], 10, { heading: 'Money Leaderboard\nTop players with the most stuff\n§r\n', layout: '§e#$(RANK) §b$(GAMERTAG) §f- §a$§c$(SCORE)' }, { compressScore: true })
        }
    } else if(list.includes(args[0])) {

    } else if(remove.includes(args[0])) {

    } else if(start.includes(args[0])) {

    } else if(stop.includes(args[0])) {

    } else if(yeet.includes(args[0])) {

    } else return Server.eBroadcast(Lang.error2, chatmsg.sender.name);
});
setTickInterval(function() {
    for(let i = 0;i < Server.player.list().length;i++) {
        var tags = Server.player.getTags(Server.player.list()[i]);
        for(let i2 = 0;i2 < tags.length;i2++) {
            if(tags[i2].startsWith('SK ')) {

            }
        }
    }
}, 1)