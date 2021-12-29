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
var CMDname = "killtext"
const registerInformation = {
    cancelMessage: true,
    name: `${CMDname}`,
    description: `This will kill any floating text 1 block away from your player.`,
    usage: `${CMDname} [text]`,
    example: [
        `${CMDname} kill @a`
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return null;
    if(!Server.player.findTag('v', chatmsg.sender.name)) return Server.runCommands([`playsound random.glass @a[name="${chatmsg.sender.name}"]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.error}"}]}`]);
    Server.runCommands([`playsound random.toast @a[name="${chatmsg.sender.name}"] ~~~ 1 0.5`,`execute @a[name="${chatmsg.sender.name}"] ~~~ kill @e[type=rabbit,r=1]`,`tellraw @a[name="${chatmsg.sender.name}"] {"rawtext":[{"text":"${Lang.MSC} \u00a7\u0065\u0043\u006c\u0065\u0061\u0072\u0069\u006e\u0067 \u0066\u006c\u006f\u0061\u0074\u0069\u006e\u0067 \u0074\u0065\u0078\u0074 \u0031 \u0062\u006c\u006f\u0063\u006b \u006e\u0065\u0061\u0072 \u0079\u006f\u0075\u0072 \u0070\u006c\u0061\u0079\u0065\u0072\u0027\u0073 \u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e \u0069\u0066 \u0061\u006e\u0079\u002e\u002e\u002e\n\u00a7\u0061\u0044\u006f\u006e\u0065!"}]}`]);
});