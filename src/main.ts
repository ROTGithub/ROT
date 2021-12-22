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
import * as Minecraft from 'mojang-minecraft';
import { World, Commands, BeforeChatEvent, ChatEvent, Entity, Player, WeatherChangeEvent, EntityCreateEvent, EffectAddEvent } from 'mojang-minecraft';
/**
 * Welcome to the FORMATTER page!
 * Main Developer: notbeer
 * Notes: It may look boring, but there is some usefull stuff here
 * Sub developer: moisesgamingtv9
 ********************************
 * Turn text into colored text that supports MCBE
 * @param {string} text The text you want to format to rainbow colors.
 * @returns {string}
 * @example rainbowText('This is rainbow text!');
*/
function rainbowText(text: string): string {
   const rainbowCode = ['§4', '§c', '§6', '§e', '§g', '§2', '§a', '§b', '§3', '§9', '§5', '§d'];
   const letter = text.replace(/§./g, '').split('');
   let newMessage = '', rainbowIndex = 0;
   letter.forEach(letter => {
       if(letter !== ' ') {
           newMessage += `${rainbowCode[rainbowIndex]}${letter}`;
           rainbowIndex + 1 >= rainbowCode.length ? rainbowIndex = 0 : rainbowIndex++;
       } else newMessage += ' ';
   });
   return newMessage;
};
/**
* This will display in text in thousands, millions and etc... For ex: "1400 -> "1.4k", "1000000" -> "1M", etc...
* @param {number} number The number you want to convert
* @returns {string}
* @example metricNumbers(15000);
*/
function metricNumbers(value: number): number | string {
   const types = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
   const selectType = Math.log10(value) / 3 | 0;
   if(selectType == 0) return value;
   let scaled = value / Math.pow(10, selectType * 3);
   return scaled.toFixed(1) + types[selectType];
};
/**
* Will format your number. For ex: "1400" -> "1,400", "1000000" -> "1,000,000", etc...
* @param {number} number The number you want to convert
* @returns {string}
* @example thousandsSeparator(15000);
*/
function thousandsSeparator(value: number): string {
   if(typeof value !== 'number') return;
   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
/**
* Convert string to binary
* @param text 
* @returns {string}
*/
function textToBinary(text: string): string {
   return text.split('').map((char) => {
       return char.charCodeAt(0).toString(2);
   }).join(' ');
};
/**
* Convert binary to string
* @param binary 
* @returns {string}
*/
function binaryToText(binary: string): string {
   return binary.split(' ').map((char) => {
       return String.fromCharCode(parseInt(char, 2));
   }).join('');
};
type Unit =
    | 'Years'
    | 'Year'
    | 'Yrs'
    | 'Yr'
    | 'Y'
    | 'Weeks'
    | 'Week'
    | 'W'
    | 'Days'
    | 'Day'
    | 'D'
    | 'Hours'
    | 'Hour'
    | 'Hrs'
    | 'Hr'
    | 'H'
    | 'Minutes'
    | 'Minute'
    | 'Mins'
    | 'Min'
    | 'M'
    | 'Seconds'
    | 'Second'
    | 'Secs'
    | 'Sec'
    | 's'
    | 'Milliseconds'
    | 'Millisecond'
    | 'Msecs'
    | 'Msec'
    | 'Ms';
type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;
type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}` | string;
type compactUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y';
type compactUnitAnyCase = compactUnit | Uppercase<compactUnit>;
interface durationInterface {
    short: compactUnitAnyCase
    long: UnitAnyCase
    duration: number;
}
function MS(value: StringValue): number;
function MS(value: number, { compactDuration, fullDuration }?: { compactDuration?: boolean, fullDuration?: boolean }): string;
function MS(value: number, { fullDuration, avoidDuration }?: { compactDuration?: boolean, fullDuration: boolean, avoidDuration: Array<compactUnitAnyCase> }): string;
function MS(value: StringValue | number, { compactDuration, fullDuration, avoidDuration }: { compactDuration?: boolean, fullDuration?: boolean, avoidDuration?: Array<compactUnitAnyCase> } = {}): string | number | undefined {
    try {
        if(typeof value === 'string') {
            if(/^\d+$/.test(value)) return Number(value);
            const durations = value.match(/-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
            return durations ? durations.reduce((a, b) => a + toMS(b), 0) : null;
        };
        if(typeof value === 'number') return toDuration(value, { compactDuration, fullDuration, avoidDuration });
        throw new Error('Value is not a string or a number');
    } catch(err) {  
        const message = isError(err)
        ? `${err.message}. Value = ${JSON.stringify(value)}`
        : 'An unknown error has occured.';
        throw new Error(message);
    };
};
/**
 * Convert Durations to milliseconds
 */
function toMS(value: string): number | undefined {
    const number = Number(value.replace(/[^-.0-9]+/g, ''));
    value = value.replace(/\s+/g, '');
    if(/\d+(?=y)/i.test(value)) return number * 3.154e+10;
    else if(/\d+(?=w)/i.test(value)) return number * 6.048e+8;
    else if(/\d+(?=d)/i.test(value)) return number * 8.64e+7;
    else if(/\d+(?=h)/i.test(value)) return number * 3.6e+6;
    else if(/\d+(?=m)/i.test(value)) return number * 60000;
    else if(/\d+(?=s)/i.test(value)) return number * 1000;
    else if(/\d+(?=ms|milliseconds?)/i.test(value)) return number;
};
/**
 * Convert milliseconds to durations
 */
function toDuration(value: number, { compactDuration, fullDuration, avoidDuration }: { compactDuration?: boolean, fullDuration?: boolean, avoidDuration?: Array<compactUnitAnyCase> } = {}): string {
    const absMs = Math.abs(value);
    const duration: Array<durationInterface> = [
        { short: 'w', long: 'week', duration: Math.floor(absMs / 6.048e+8) },
        { short: 'd', long: 'day', duration: Math.floor(absMs / 8.64e+7) % 7 },
        { short: 'h', long: 'hour', duration: Math.floor(absMs / 3.6e+6) % 24 },
        { short: 'm', long: 'minute', duration: Math.floor(absMs / 60000) % 60 },
        { short: 's', long: 'second', duration: Math.floor(absMs / 1000) % 60 },
        { short: 'ms', long: 'millisecond', duration: absMs % 1000 }
    ];
    const mappedDuration = duration
        .filter(obj => obj.duration !== 0 && avoidDuration ? fullDuration && !avoidDuration.map(v => v.toLowerCase()).includes(obj.short) : obj.duration)
        .map(obj => `${Math.sign(value) === -1 ? '-' : ''}${compactDuration ? `${Math.floor(obj.duration)}${obj.short}` : `${Math.floor(obj.duration)} ${obj.long}${obj.duration === 1 ? '' : 's'}`}`);
    const result = fullDuration ? mappedDuration.join(compactDuration ? ' ' : ', ') : mappedDuration[0];
    return result || `${absMs}`;
};
/**
 * A type guard for errors.
 */
function isError(error: unknown): error is Error {
    return typeof error === 'object' && error !== null && 'message' in error;
};
/*
 * Welcome to the Scheduling page!
 * Main Developer: notbeer
 * Sub developer: NOBODY!
 * Link to name: Scheduling
*/
const tickTimeoutMap = new Map();
const tickIntervalMap = new Map();
let tickTimeoutID = 0, tickIntervalID = 0;
/**
 * Delay executing a function
 * @typedef
 * @param {string | Function} handler Function you want to execute
 * @param {number} [timeout] Time delay in ticks. 20 ticks is 1 second
 * @param {any[]} args Function parameters for your handler
 * @returns {number}
 */
function setTickTimeout(handler: string | Function, timeout?: number, ...args: any[]): number {
    const tickTimeout = { callback: handler, tick: timeout, args };
    tickTimeoutID++;
    tickTimeoutMap.set(tickTimeoutID, tickTimeout);
    return tickTimeoutID;
};
/**
 * Delay executing a function, REPEATEDLY
 * @typedef
 * @param {string | Function} handler Function you want to execute
 * @param {number} [timeout] Time delay in ticks. 20 ticks is 1 second
 * @param {any[]} args Function parameters for your handler
 * @returns {number}
 */
function setTickInterval(handler: string | Function, timeout?: number, ...args: any[]): number {
    const tickInterval = { callback: handler, tick: timeout, args };
    tickIntervalID++;
    tickIntervalMap.set(tickIntervalID, tickInterval);
    return tickIntervalID;
};
/**
 * Delete a clearTickTimeout
 * @typedef
 * @param {number} handle Index you want to delete
 */
function clearTickTimeout(handle: number): void {
    tickTimeoutMap.delete(handle);
};
/**
 * Delete a clearTickInterval
 * @typedef
 * @param {number} handle Index you want to delete
 */
function clearTickInterval(handle: number): void {
    tickIntervalMap.delete(handle);
};

let totalTick = 0;
World.events.tick.subscribe(() => {
    totalTick++;
    for(const [ID, tickTimeout] of tickTimeoutMap) {
        tickTimeout.tick--;
        if(tickTimeout.tick <= 0) {
            tickTimeout.callback(...tickTimeout.args);
            tickTimeoutMap.delete(ID);
        };
    };
    for(const [, tickInterval] of tickIntervalMap) {
        if(totalTick % tickInterval.tick === 0) tickInterval.callback(...tickInterval.args);
    };
});
/*
 * Welcome to the Command Builder page!
 * Main Developer: notbeer
 * Sub developer: moisesgamingtv9
 * Link to name: Command builder
*/
interface registerInformation {
        private?: boolean,
        cancelMessage?: boolean,
        name: string,
        description: string,
        aliases?: Array<string>,
        category: string,
        admin?: boolean,
        documentation?: {usage?: string, information?: string, subaliases?: Array<String>, examples?: Array<String>, notes?: string, added?: Date, developers?: Array<String>}
}
interface storedRegisterInformation extends registerInformation {
        callback: (data: BeforeChatEvent, args: Array<string>) => void
}
interface categorytype {
    category: string
    color?: string,
}
let configuration = { prefix: '!' };
class CommandBuilder {
        public prefix: string = configuration.prefix;
        private _registrationInformation: Array<storedRegisterInformation> = [];
        private _categorytype: Array<categorytype> = [];
        /**
         * Register a command with a callback
         * @param {registerInformation} register An object of information needed to register the custom command
         * @param {(data: BeforeChatEvent, args: Array<string>) => void} callback Code you want to execute when the command is executed
         * @example import { Server } from "../../Minecraft";
         *  Server.commands.register({ name: 'ping' }, (data, args) => {
         *  Server.broadcast('Pong!', data.sender.nameTag);
         * });
         */
        public register(register: registerInformation, callback: (data: BeforeChatEvent, args: Array<string>) => void): void {
            this._registrationInformation.push({
                private: register.private ? true : false,
                cancelMessage: register.cancelMessage ? true : false,
                name: register.name.toLowerCase(),
                description: register.description,
                aliases: register.aliases ? register.aliases.map(v => v.toLowerCase()) : null,
                category: register.category ? register.category : null,
                admin: register.admin,
                documentation: register.documentation ? {
                    usage: register.documentation.usage ? register.documentation.usage : null,
                    information: register.documentation.information ? register.documentation.information : null,
                    subaliases: register.documentation.subaliases ? register.documentation.subaliases : null,
                    examples: register.documentation.examples ? register.documentation.examples : null,
                    notes: register.documentation.notes ? register.documentation.notes : null,
                    developers: register.documentation.developers ? register.documentation.developers : null
                } : null,
                callback
            });
        };
        public category(categorytype: categorytype): void {
            this._categorytype.push({
                category: categorytype.category.toUpperCase(),
                color: categorytype.color.toLowerCase() ? categorytype.color.toLowerCase() : 'red' 
            });
        };
        /**
         * Get a list of registered commands
         * @returns {Array<string>}
         * @example get();
         */
        public get(): Array<string> {
            const commands: Array<string> = [];
            this._registrationInformation.forEach(element => {
                if(element.private) return;
                commands.push(element.name);
            });
            return commands;
        };
        /**
         * Get all the registered informations
         * @returns {Array<storedRegisterInformation>}
         * @example getAllRegistration();
         */
        public getAllRegistation(): Array<storedRegisterInformation> {
            return this._registrationInformation;
        };
        /**
         * Get registration information on a specific command
         * @param name The command name or alias you want to get information on
         * @returns {storedRegisterInformation}
         * @example getRegistration('ping');
         */
        public getRegistration(name: string): storedRegisterInformation {
            const command = this._registrationInformation.some(element => element.name.toLowerCase() === name || element.aliases && element.aliases.includes(name));
            if(!command) return;
            let register;
            this._registrationInformation.forEach(element => {
                if(element.private) return;
                const eachCommand = element.name.toLowerCase() === name || element.aliases && element.aliases.includes(name);
                if(!eachCommand) return;
                register = element;
            });
            return register;
        };
    };
const CommandBuild = new CommandBuilder();
/*
 * Welcome to the Event Emitter page!
 * Main Developer: notbeer
 * Sub developer: NOBODY!
 * Link to name: MS
*/
interface EventList {
        beforeMessage: [BeforeChatEvent],
        messageCreate: [ChatEvent],
        tick: [],
        weatherChange: [WeatherChangeEvent],
        entityCreate: [EntityCreateEvent],
        entityEffected: [EffectAddEvent],
        playerJoin: [Entity],
        playerLeave: [playerLeave],
        ready: [ready],
        customCommand: [customCommand]
    }
interface playerLeave {
        readonly name: string
}
    interface ready {
        readonly loadTime: number
}
interface customCommand {
        registration: registerInformation,
        data: BeforeChatEvent,
        readonly createdAt: Date,
        readonly createdTimestamp: number
}
interface EventEmitterConstructor {
        new(): EventEmitterTypes;
}
interface EventEmitterTypes {
      /**
       * Listen for an event
       * @param eventName Event you want to listen for
       * @param listener Function you want to execute
       * @alias emitter.on()
       */
       addListener<K extends keyof EventList>(eventName: K, listener: (...args: EventList[K]) => void): this;
       addListener<S extends string | symbol>(
         eventName: Exclude<S, keyof EventList>,
         listener: (...args: any[]) => void,
       ): this;
     
       /**
        * Emit data for an event type
        * @param eventName Event you are firing
        * @param args Event data you are sending
        */
       emit<K extends keyof EventList>(eventName: K, ...args: EventList[K]): boolean;
       emit<S extends string | symbol>(eventName: Exclude<S, keyof EventList>, ...args: any[]): boolean;
       
       eventNames(): Array<String>;
     
       getMaxListeners(): Number;
     
       /**
        * Get count of event(s)
        * @param eventName Event name you want to find the count for
        */
       listenerCount<K extends keyof EventList>(eventName?: K): number;
       listenerCount<S extends string | symbol>(eventName?: Exclude<S, keyof EventList>): number;
     
       /**
        * All event functions that are listening
        * @param eventName Event name you want to find all the listeners on
        */
       listeners<K extends keyof EventList>(eventName: K): Array<Function>;
       listeners<S extends string | symbol>(eventName: Exclude<S, keyof EventList>): Array<Function>;
     
       /**
        * Turn off an event
        * @param eventName Event you want to stop listening for
        * @param listener Function that is being called
        */
       off<K extends keyof EventList>(eventName: K, listener: (...args: EventList[K]) => void): this;
       off<S extends string | symbol>(
         eventName: Exclude<S, keyof EventList>,
         listener: (...args: any[]) => void,
       ): this;
       
       /**
        * Listen for an event
        * @param eventName Event you want to listen for
        * @param listener Function you want to execute
        */
       on<K extends keyof EventList>(eventName: K, listener: (...args: EventList[K]) => void): this;
       on<S extends string | symbol>(
         eventName: Exclude<S, keyof EventList>,
         listener: (...args: any[]) => void,
       ): this;
     
       /**
        * Listen for an event, ONCE
        * @param eventName Event you want to listen for
        * @param listener Function you want to execute
        */
       once<K extends keyof EventList>(eventName: K, listener: (...args: EventList[K]) => void): this;
       once<S extends string | symbol>(
         eventName: Exclude<S, keyof EventList>,
         listener: (...args: any[]) => void,
       ): this;
     
       /**
        * Listen for an event. This will execute the listener before any other previous ones
        * @param eventName Event you want to listen for
        * @param listener Function you want to execute
        */
       prependListener<K extends keyof EventList>(eventName: K, listener: (...args: EventList[K]) => void): this;
       prependListener<S extends string | symbol>(
         eventName: Exclude<S, keyof EventList>,
         listener: (...args: any[]) => void,
       ): this;
     
       /**
        * Listen for an event, ONCE. This will execute the listener before any other previous ones
        * @param eventName Event you want to listen for only ONCE
        * @param listener Function you want to execute
        */
       prependOnceListener<K extends keyof EventList>(eventName: K, listener: (...args: EventList[K]) => void): this;
       prependOnceListener<S extends string | symbol>(
         eventName: Exclude<S, keyof EventList>,
         listener: (...args: any[]) => void,
       ): this;
     
       /**
        * Remove type of listeners
        * @param eventName Listener to remove
        */
       removeAllListeners(eventName?: string): void;
     
       /**
        * Turn off an event
        * @param eventName Event you want to stop listening for
        * @param listener Function that is being called
        * @alias emitter.off()
        */
       removeListener<K extends keyof EventList>(eventName: K, listener: (...args: EventList[K]) => void): this;
       removeListener<S extends string | symbol>(
         eventName: Exclude<S, keyof EventList>,
         listener: (...args: any[]) => void,
       ): this;
     
       /**
        * Increase or decrease listener count
        * @param number New max listener count
        */
       setMaxListeners(number: number): void;
     
       /**
        * All event functions
        * @param eventName Event name you want to find all the listeners on, including emitter.once()
        */
       rawListeners<K extends keyof EventList>(eventName: K): Array<Function>;
       rawListeners<S extends string | symbol>(eventName: Exclude<S, keyof EventList>): Array<Function>;
}
const EventEmitter: EventEmitterConstructor = class Class implements EventEmitterTypes {
        private _listeners: any[] = [];
        private _configurations = {
            maxListeners: 10
        };
        /**
         * @private
         * @param {string} eventName Event type to listen for
         * @param {Function} listener Function to callback on fire
         * @param {boolean} [once] Wheather to listen for the event only ONCE or not
         * @param {boolean} [prepand] Insert the Event in the beginning of the Array, so it executes first
         */
        private _addListener(eventName: string, listener: (...args: any[]) => void, once?: boolean, prepand?: boolean): void {
            const listenerCount = this.listenerCount(eventName);
            if(listenerCount >= this._configurations.maxListeners) throw `Warning: Possible EventEmitter memory leak detected. ${listenerCount + 1} ${eventName} listeners added. Use emitter.setMaxListeners(n) to increase limit`;
            const data = {
                eventName,
                listener,
                once,
                executed: false
            };
            if(prepand) this._listeners.unshift(data);
            else this._listeners.push(data);
        };
        /**
         * @private
         * @param {string} eventName Event type to remove
         * @param {Function} listener Function that is being called
         */
        private _removeListener(eventName: string, listener: (...args: any[]) => void): void {
            if(typeof listener === 'number') this._listeners.splice(listener, 1);
            const index = this._listeners.findIndex(v => v.eventName === eventName && v.listener === listener);
            if(index !== -1) this._listeners.splice(index, 1);
        };
        addListener(eventName: string, listener: (...args: any[]) => void): this {
            this._addListener(eventName, listener, false);
            return this;
        };
        emit(eventName: string, ...args: any[]): boolean {
            let status = false;
            this._listeners.forEach(object => {
                if(object.eventName === eventName) {
                    if(object.once && object.executed) return;
                    object.listener(...args);
                    status = true, object.executed = true;
                };
            });
            return status;
        };
        eventNames(): Array<string> {
            return this._listeners.map(v => v.eventName);
        };
        getMaxListeners(): number {
            return this._configurations?.maxListeners;
        };
        listenerCount(eventName: string): number {
            return eventName ? this._listeners.filter(v => v.eventName === eventName).length : this._listeners.length;
        };
        listeners(eventName: string): Array<Function> {
            const Functions: Array<Function> = [];
            this._listeners.forEach(object => {
                if(object.eventName === eventName && !object.once) Functions.push(object.listener);
            });
            return Functions;
        };
        off(eventName: string, listener: (...args: any[]) => void): this {
            this._removeListener(eventName, listener);
            return this;
        };
        on(eventName: string, listener: (...args: any[]) => void): this {
            this._addListener(eventName, listener, false);
            return this;
        };
        once(eventName: string, listener: (...args: any[]) => void): this {
            this._addListener(eventName, listener, true);
            return this;
        };
        prependListener(eventName: string, listener: (...args: any[]) => void): this {
            this._addListener(eventName, listener, false, true);
            return this;
        };
        prependOnceListener(eventName: string, listener: (...args: any[]) => void): this {
            this._addListener(eventName, listener, true, true);
            return this;
        };
        removeAllListeners(eventName: string): void {
            eventName ? this._listeners = this._listeners.filter(element => element.eventName !== eventName) : this._listeners = [];
        };
        removeListener(eventName: string, listener: (...args: any[]) => void): this {
            this._removeListener(eventName, listener);
            return this;
        };
        setMaxListeners(number: number): void {
            if(typeof number === 'number') this._configurations.maxListeners = number;
        };
        rawListeners(eventName: string): Array<Function> {
            const Functions: Array<Function> = [];
            this._listeners.forEach(object => {
                if(object.eventName === eventName) Functions.push(object.listener);
            });
            return Functions;
        };
};
/*
 * Welcome to the Server Builder page!
 * Main Developer: notbeer
 * Notes: Broadcast is WAY better now
 * Sub developer: moisesgamingtv9
 * Link to name: Server Builder
*/
interface runCommandReturn {
        error: boolean,
        statusCode?: number,
        statusMessage?: string,
        playerTest?: Array<string>,
        players?: string
    }
type dimension = "overworld" | "nether" | "the end";
class ServerBuilder extends EventEmitter {
        /**
         * Force shuts down the server
         * @example ServerBuilder.close()
         */
        close(): void {
            function crash() {
                while (true) {
                    crash();
                };
            };
            crash();
        };
        /**
         * Broadcast a message in chat
         * @param {string} text Message you want to broadcast in chat
         * @param {string} [player] Player you want to broadcast to
         * @param {string} use What command is the player using
         * @param {boolean} console
         * @returns {runCommandReturn}
         * @example ServerBuilder.broadcast('Hello World!', 'moisesgamingtv9', 'Computer', true);
         */
        broadcast(text: string, player?: string, use?: string, console?: boolean): runCommandReturn {
            if(use==undefined||use=='') var use = '';else var use = use.toUpperCase()+' ';if(console==false) var console2 = '';else console2 = `§l§4${use}§7>>§r§7 `;
            return this.runCommands([`execute ${player!=null ? `"${player}"` : '@a'} ~~~ playsound random.toast @s ~~~ 1 0.5`,`execute ${player!=null ? `"${player}"` : '@a'} ~~~ tellraw @s {"rawtext":[{"text":"${console2}"},{"text":${JSON.stringify(text)}}]}`]);
        };
        /**
         * Broadcast a tip in chat to suggest something the player should do
         * @param {string} text Message you want to broadcast in chat
         * @param {string} [player] Player you want to a error broadcast to
         * @param {string} use What command is the player using
         * @returns {runCommandReturn}
         * @example ServerBuilder.tBroadcast('Use ROT... Your players will thank you!', 'moisesgamingtv9', 'ROT');
         */
        tBroadcast(text: string, player?: string, use?: string): runCommandReturn {
            if(use==undefined) var use = '';else var use = use.toUpperCase()+' ';
            return this.runCommands([`execute ${player ? `"${player}"` : '@a'} ~~~ playsound random.toast @s ~~~ 1 0.5`,`execute ${player ? `"${player}"` : '@a'} ~~~ tellraw @s {"rawtext":[{"text":"§l§c${use}TIPS §e>>§r§e "},{"text":${JSON.stringify(text)}}]}`]);
        };
        /**
         * Broadcast a ERROR message in chat
         * @param {string} text Message you want to broadcast in chat
         * @param {string} [player] Player you want to a error broadcast to
         * @param {string} use What command is the player using
         * @returns {runCommandReturn}
         * @example ServerBuilder.eBroadcast('Task failed!', 'moisesgamingtv9', 'Task Doer');
         */
        eBroadcast(text: string, player?: string, use?: string): runCommandReturn {
            if(use==undefined) var use = '';else var use = use.toUpperCase()+' ';
            return this.runCommands([`execute ${player ? `"${player}"` : '@a'} ~~~ playsound random.glass @s ~~~ 1 0.5`,`execute ${player ? `"${player}"` : '@a'} ~~~ tellraw @s {"rawtext":[{"text":"§l§c${use}§4Error §c>>§r§c "},{"text":${JSON.stringify(text)}}]}`]);
        };
        //This is in development!
        public awaitMessages({ filter, time, max }: { filter: (...args: any[]) => boolean, time?: number, max?: number }) {
                ServerBuild.on('beforeMessage', data => {
                    if(!filter(data)) return;
                });
        };
        /**
        * Run a command in game
        * @param command The command you want to run
        * @returns {runCommandReturn}
        * @example ServerBuilder.runCommand('say Hello World!');
        */
        public runCommand(command: string, dimension?: dimension): runCommandReturn {
            try {
                return { error: false, ...Commands.run(command, World.getDimension(dimension ?? 'overworld')) };
            } catch (error) {
                return { error: true };
            };
        };
        /**
        * Run an array of commands
        * @param {Array<string>} commands Put '%' before your commands. It will make it so it only executes if all the commands thta came before it executed successfully!
        * @returns {{ error: boolean }}
        * @example runCommands([
        * 'clear "notbeer" diamond 0 0',
        * '%say notbeer has a Diamond!'
        * ]);
        */
        public runCommands(commands: Array<string>): { error: boolean } {
            const conditionalRegex = /^%/;
            if (conditionalRegex.test(commands[0])) throw '§l§c>>§r§4: runCommands(): Error - First command in the Array CANNOT be Conditional';
            let error = false;
            commands.forEach(cmd => {
                if (error && conditionalRegex.test(cmd)) return;
                error = this.runCommand(cmd.replace(conditionalRegex, '')).error;
            });
            return { error: error };
        };
    };
const ServerBuild = new ServerBuilder();
/*
 * Welcome to the Database Builder page!
 * Main Developer: notbeer
 * Notes: Props to notbeer for this cool database system!
 * Sub developer: TRASH
 * Link to name: DataBase Builder
*/
class Database {
        public readonly table: string;
        public readonly json: object;
        constructor(table: string) {
            if(!table) throw Error('[Database] constructor(): Error - Provide a table name');
            this.json = { GAMETEST_DB_TABLE: table }, this.table = table;
            let json = this._getTable() ?? this.json;
            ServerBuild.runCommands([
                'scoreboard objectives add GAMETEST_DB dummy',
                `scoreboard players reset "$binary(${textToBinary(JSON.stringify(json))})" GAMETEST_DB`,
                `scoreboard players add "$binary(${textToBinary(JSON.stringify(json))})" GAMETEST_DB 0`
            ]);
            // const mutableThis = this as Mutable<Database>;
        };
        /**
         * @private
         */
        private _getTable() {
            const data = ServerBuild.runCommand(`scoreboard players list`);
            if(data.error) return;
            const objectiveUsers = data.statusMessage.match(/(?<=\n).*/)[0].split(', '), dataRegex = /(?<=^\$binary\()[0-1\s]+(?=\)$)/;
            for(const dummy of objectiveUsers) {
                if(dataRegex.test(dummy)) {
                    try {
                        const json = JSON.parse(binaryToText(dummy.match(dataRegex)[0]));
                        if(json?.GAMETEST_DB_TABLE === this.table) return json;
                    } catch(err) {};
                };
            };
        };
        /**
         * Save a value or update a value in the Database under a key
         * @param {string} Key The key you want to save the value as
         * @param {any} value The value you want to save
         * @example Database.set('Test Key', 'Test Value');
         */
        public set(key: string, value: any): void {
            let json = this._getTable();
            ServerBuild.runCommand(`scoreboard players reset "$binary(${textToBinary(JSON.stringify(json))})" GAMETEST_DB`);
            Object.assign(json, { [key]: value });
            ServerBuild.runCommand(`scoreboard players add "$binary(${textToBinary(JSON.stringify(json))})" GAMETEST_DB 0`);
        };
        /**
         * Get the value of the key
         * @param {string} key
         * @returns {any}
         * @example Database.get('Test Key');
         */
        public get(key: string): any {
            let json = this._getTable();
            delete json["GAMETEST_DB_TABLE"];
            return json[key];
        };
        /**
         * Check if the key exists in the table
         * @param {string} key
         * @returns {boolean}
         * @example Database.has('Test Key');
         */
        public has(key: string): boolean {
            return this.keys().includes(key);
        };
        /**
         * Delete the key from the table
         * @param {string} key
         * @returns {boolean}
         * @example Database.delete('Test Key');
         */
        public delete(key: string): boolean {
            let json = this._getTable();
            ServerBuild.runCommand(`scoreboard players reset "$binary(${textToBinary(JSON.stringify(json))})" GAMETEST_DB`);
            const status = delete json[key];
            ServerBuild.runCommand(`scoreboard players add "$binary(${textToBinary(JSON.stringify(json))})" GAMETEST_DB 0`);
            return status;
        };
        /**
         * Clear everything in the table
         * @example Database.clear()
         */
        public clear(): void {
            let json = this._getTable();
            ServerBuild.runCommand(`scoreboard players reset "$binary(${textToBinary(JSON.stringify(json))})" GAMETEST_DB`);
            json = { GAMETEST_DB_TABLE: this.table };
            ServerBuild.runCommand(`scoreboard players add "$binary(${textToBinary(JSON.stringify(json))})" GAMETEST_DB 0`);
        };
        /**
         * Get all the keys in the table
         * @returns {Array<string>}
         * @example Database.keys();
         */
        public keys(): Array<string> {
            let json = this._getTable();
            delete json["GAMETEST_DB_TABLE"];
            return Object.keys(json);
        };
        /**
         * Get all the values in the table
         * @returns {Array<any>}
         * @example Database.values();
         */
        public values(): Array<any> {
            let json = this._getTable();
            delete json["GAMETEST_DB_TABLE"];
            return Object.values(json);
        };
        /**
         * Gets all the keys and values
         * @returns {any}
         * @example Database.getCollection();
         */
        public getCollection(): any {
            let json = this._getTable();
            delete json["GAMETEST_DB_TABLE"];
            return json;
        };
        /**
         * Check if all the keys exists in the table
         * @param {string} keys
         * @returns {boolean}
         * @example Database.hasAll('Test Key', 'Test Key 2', 'Test Key 3');
         */
        public hasAll(...keys: Array<string>): boolean {
            return keys.every((k) => this.has(k));
        };
        /**
         * Check if any of the keys exists in the table
         * @param {string} keys 
         * @returns {boolean}
         * @example Database.hasAny('Test Key', 'Test Key 2', 'Test Key 3');
         */
        public hasAny(...keys: Array<string>): boolean {
            return keys.some((k) => this.has(k));
        };
        /**
         * Get all the key(s) from the beginning of the table
         * @param {number} [amount] 
         * @returns {Array<string>}
         * @example Database.firstKey(2);
         */
        public firstKey(amount?: number): Array<string> {
            const keys = this.keys();
            if(typeof amount !== 'number') return [keys[0]];
            if(!amount) return [];
            if(amount < 0) return this.lastKey(amount * -1);
            return keys.slice(0, amount);
        };
        /**
         * Get all the values(s) from the beginning of the table
         * @param {number} [amount]  
         * @returns {Array<any>}
         * @example Database.firstValue(2);
         */
        public firstValue(amount?: number): Array<any> {
            const values = this.values();
            if(typeof amount !== 'number') return [values[0]];
            if(!amount) return [];
            if(amount < 0) return this.lastValue(amount * -1);
            return values.slice(0, amount);
        };
        /**
         * Get all the key(s) from the end of the table
         * @param {number} [amount]  
         * @returns {Array<string>}
         * @example Database.lastKey();
         */
        public lastKey(amount?: number): Array<string> {
            const keys = this.keys();
            if(typeof amount !== 'number') return [keys[keys.length - 1]];
            if(!amount) return [];
            if(amount < 0) return this.firstKey(amount * -1);
            return keys.slice(-amount).reverse();
        };
        /**
         * Get all the values(s) from the end of the table
         * @param {number} [amount] 
         * @returns {Array<any>}
         * @example Database.lastValue();
         */
        public lastValue(amount?: number): Array<any> {
            const values = this.values();
            if(typeof amount !== 'number') return [values[values.length - 1]];
            if(!amount) return [];
            if(amount < 0) return this.firstValue(amount * -1);
            return values.slice(-amount).reverse();
        };
        /**
         * Get random key(s)
         * @param {number} amount 
         * @returns {Array<string>}
         * @example Database.randomKey(3);
         */
        public randomKey(amount?: number): Array<string> {
            const keys = this.keys();
            return keys.sort(() => Math.random() - Math.random()).slice(0, Math.abs(amount));
        };
        /**
         * Get random value(s)
         * @param {number} amount 
         * @returns {Array<string>}
         * @example Database.randomValue(3);
         */
        public randomValue(amount?: number): Array<string> {
            const values = this.values();
            return values.sort(() => Math.random() - Math.random()).slice(0, Math.abs(amount));
        };
        //TODO: Add callback functions for db
        /*
        findValue(callbackfn, args) {
            const json = this.getCollection();
            if(typeof args !== 'undefined') callbackfn = callbackfn.bind(args);
            for(const key in json) if(callbackfn(key, json[key], json)) return json[key];
            return undefined;
        };
        */
};
/*
 * Welcome to the Lang page!
 * Main Translater: Google Translate
 * Main Developer: moisesgamingtv9
 * Notes: This file is ment to pull the IPs, gamertags, and realm codes of the people that used ROT.
 * Sub developer: NOBODY!
 * Link to name: LANG0
*/
const CONFIG = new Database("rot_config");
class LangImport {
    public prefix = CONFIG.get('prefix');
    //Main ROT
    public discord: string = 'https://discord.gg/2ADBWfcC6S';
    public version: string = '§4ROT Version: §cV2, On The Board!§4, Min Engine: §c1.14.0§4\nScript Version: §cJava SE V16.0.2§4,\nBETA: §cNO§4, ROTJ: §cNO§1\nCoded and Designed By moisesgamingtv9, Copyright 2021-2022 all rights reserved.';
    public setupv: string = `Please type "§e/tag @s add v§7" in chat, then type "§7${this.prefix}setup§c" in chat to setup ROT!`;
    public setups: string = 'Setting up ROT...\n§eLooking for older ROT settings...\nAdding Databases...\nImporting commands...\nImporting OTHER features...\nImporting ROT Plugin handler...\n§2Compiling ROT and importing into game...\n§aDone!';
    public rankDefault: string = 'Member';
    public main1: string = 'ROT has been imported in';
    public main2: string = 'ticks.';
    public newWelcome: string = 'Welcome to our Minecraft server! This server uses §c§lROT§r§7! Join §c§lROT\'s§r§7 §l§5Discord server§r§7 here: §e';
    public smite: string = 'Has been /smited! Point and luagh at them XD!!!';
    public joined1: string = 'Has joined the server for the first time! Give them a warm welcome! This server now has ';
    public joined2: string = 'players.';

    //Errors, ROT
    public error: string = 'Unknown command! Make sure you have permission to use that command and make sure you spelt it correctly. Type "§7!help"§c in chat for a list of available commands, or run the command "§7/tag @s add v§c" to verify that your are a admin then try doing that command again.';
    public error2: string = `Uhh, not really sure what you meant... The command you typed in is missing arguments. You can join the ROT §5§lDiscord§r§7 here: §e${this.discord}§r§c and ask someone for help, or type "§7!help §8[command name]§c" in chat for help for that specific command.`;
    public setupError: string = 'ROT is already setup! Type "§7${this.prefix}help§c" in chat for a list of available for commands.';
    public anticlog: string = 'WOAH, slow your road chief! Combat logging is NOT allowed. Please wait a few seconds.';
    public antiCMDPvP: string = 'See... I would do that command for you but, I was programmed not to do any commands for players that got hit from another player sooo, yeah...';
    public antispam: string = 'Chill out dude! I need a break from doing commands... Try again in §l§4COUPLE§r§c seconds.';
    public unauthorized: string = 'You currently do NOT have permission to execute this command on this server.';
    public leaderboardError: string = 'Unable to find entity...';


    public v1: string = ` You Have Vanished...`;
    public v2: string = ` You Have Reappeared...`;
    public CMDon: string = ` §eEnabling §7${this.prefix}`;
    public CMDon2: string = `§e...\n§aDone :)`;
    public CMDmid: string = ` §eSetting §7${this.prefix}`;
    public CMDmid2: string = `§e to trusted players and verified admins only...\n§9Done :|`;
    public CMDtag1: string = ` §eTurning §7${this.prefix}`;
    public CMDtag2: string = ` §eto players with the tag §a"CMD `;
    public CMDtag3: string = `"§e...\n§aDone! You can give players permissions by typing "§7/tag [playername] add "CMD `;
    public CMDtag4: string = `"§a" in chat.`;
    public CMDoff: string = ` §eDisabling §7${this.prefix}`;
    public CMDoff2: string = `§e...§c\nDone :(`;
    public CMDnotOna1: string = ` §eSorry, §7!`;
    public CMDnotOna2: string = `§e is NOT enabled on this server :(`;
    public CMDnotOnb1: string = ` §eYou do not have §7${this.prefix}`;
    public CMDnotOnb2: string = `§e enabled... You can enable them by typing §7!`;
    public CMDnotOnb3: string = `T§e In chat.`;
    public flyonFB: string = ` You can now fly!`;
    public flyoffFB: string = ` You can no longer fly!`;
};
/*
 * Welcome to the Entity Builder page!
 * Main Developer: notbeer
 * Notes: Before ROT V2, This page was super useful...
 * Sub developer: NOBODY!
 * Link to name: Entity Builder
*/
interface getEntityAtPosReturn {
        list: Array<Entity> | null,
        error: Boolean
}
class EntityBuilder {
        /**
         * Look for a tag on entitie(s)
         * @param {string} tag Tag you are seraching for (WARNING: Color Coding with § is ignored)
         * @param {string} [target] Requirements for the entity
         * @return {boolean}
         * @example EntityBuilder.findTag("villager", '[type=villager]');
         */
        findTag(tag: string, target?: string): boolean {
            const allTags = this.getTags(target);
            if(!allTags) return false;
            for(const Tag of allTags) if(Tag.replace(/§./g, '').match(new RegExp(`^${tag.replace(/§./g, '')}$`))) return true;
            return false;
        };
        /**
         * Get entitie(s) at a position
         * @param {number} x X position of the entity 
         * @param {number} y Y position of the entity
         * @param {number} z Z position of the entity 
         * @param {dimension} [dimension] Dimesion of the entity
         * @param {Array<string>} [ignoreType] Entity type to not look for
         * @returns {Array<getEntityAtPosReturn>}
         * @example EntityBuilder.getEntityAtPos([0, 5, 0], { dimension: 'nether', ignoreType: ['minecraft:player']});
         */
        getAtPos([x, y, z]: [number, number, number], { dimension, ignoreType }: { dimension?: dimension, ignoreType?: Array<string> } = {}): getEntityAtPosReturn {
            try {
                const entity = Minecraft.World.getDimension(dimension ? dimension : 'overworld').getEntitiesAtBlockLocation(new Minecraft.BlockLocation(x, y, z));
                for(let i = 0; i < entity.length; i++)
                    if(ignoreType.includes(entity[i].id)) entity.splice(i, 1);
                return { list: entity, error: false };
            } catch (err) {
                return { list: null, error: true };
            };
        };
        /**
         * Get all the tag on entitie(s)
         * @param {string} [target] Requirements for the entity
         * @returns {Array<string> | null}
         * @example EntityBuilder.getTags('[type=villager,name="Bob"]');
         */
        getTags(target?: string): Array<string> | null {
            const data = ServerBuild.runCommand(`tag @e${target ? `[${target.replace(/\]|\[/g, '')}]` : ''} list`);
            if(data.error) return;
            let tags = data.statusMessage.match(/(?<=: ).*$/);
            if(tags) return tags[0].split('§r, §a');
        };
        /**
         * Get score of an entity
         * @param {string} objective Objective name you want to search
         * @param {string} [target] Requirements for the entity
         * @param {number} [minimum] Minumum score you are looking for
         * @param {number} [maximum] Maximum score you are looking for
         * @returns {number | null}
         * @example EntityBuilder.getScore('Money', '[type=villager,name="Bob"]', { minimum: 0 });
         */
        getScore(objective: string, target?: string, { minimum, maximum }: { minimum?: number, maximum?: number } = {}): number | null {
            const data = ServerBuild.runCommand(`scoreboard players test @e${target ? `[${target.replace(/\]|\[/g, '')}]` : ''} ${objective} ${minimum ? minimum : '*'} ${maximum ? maximum : '*'}`);
            if(data.error) return;
            return parseInt(data.statusMessage.match(/-?\d+/)[0]);
        };
};
const EntityBuild = new EntityBuilder();
/*
 * Welcome to the Player Builder page!
 * Main Developer: notbeer
 * Notes: So much has been added to thia XD
 * Sub developer: moisesgamingtv9
 * Link to name: Player Builder
*/
interface banDataObj {
        bannedPlayer: string,
        date?: string,
        length: number,
        unbanTime: number,
        reason: string,
        bannedBy: string
} 
interface getPlayerAtPosReturn {
        list: Array<Entity> | null,
        error: boolean
    }
interface getItemCountReturn {
        player: string,
        count: number
}
class PlayerBuilder {
        /**
         * Look if player is in the game
         * @param {string} player Player you are looking for
         * @returns {boolean}
         * @example PlayerBuilder.findPlayer('notbeer');
         */
        find(player: string): boolean {
            const players = this.list();
            return players.includes(player);
        };
        /**
         * Look for a tag on player(s)
         * @param {string} tag Tag you are seraching for (WARNING: Color Coding with § is ignored)
         * @param {string} [player] Requirements for the entity
         * @returns {boolean}
         * @example PlayerBuilder.findTag("Owner", 'notbeer');
         */
        findTag(tag: string, player?: string): boolean {
            const allTags = this.getTags(player);
            if(!allTags) return false;
            for(const Tag of allTags) if(Tag.replace(/§./g, '').match(new RegExp(`^${tag.replace(/§./g, '')}$`))) return true;
            return false;
        };
        /**
         * Get players(s) at a position
         * @param {number} x X position of the entity 
         * @param {number} y Y position of the entity
         * @param {number} z Z position of the entity 
         * @param {dimension} [dimension] Dimesion of the entity
         * @returns {getPlayerAtPosReturn}
         * @example PlayerBuilder.getEntityAtPos([0, 5, 0], { dimension: 'nether' ]});
         */
        getAtPos([x, y, z]: [number, number, number], { dimension }: { dimension?: dimension } = {}): getPlayerAtPosReturn {
            try {
                const entity = Minecraft.World.getDimension(dimension ? dimension : 'overworld').getEntitiesAtBlockLocation(new Minecraft.BlockLocation(x, y, z));
                for(let i = 0; i < entity.length; i++)
                    if(entity[i].id !== 'minecraft:player') entity.splice(i, 1);
                return { list: entity, error: false };
            } catch (err) {
                return { list: null, error: true };
            };
        };
        /**
         * Fetch an online players data
         * @param player 
         * @returns {Player}
         */
         public fetch(player?: string): Player {
            for(const p of World.getPlayers()) if(player && p.name === player) return p;
        };
        /**
         * Get tags player(s) has
         * @param {string} [player] Requirements for the entity
         * @returns {Array<string>}
         * @example PlayerBuilder.getTags('notbeer');
         */
        getTags(player?: string): Array<string> {
            const data = ServerBuild.runCommand(`tag "${player}" list`);
            if(data.error) return;
            let tags = data.statusMessage.match(/(?<=: ).*$/);
            if(tags) return tags[0].split('§r, §a');
        };
        /**
         * Get list of players in game
         * @returns {Array<string>}
         * @example PlayerBuilder.list();
         */
        list(): Array<string> {
            let data = [];
            data = ServerBuild.runCommand(`list`).players.split(', ');
            return data;
        };
        /**
         * Get the amount on a specific items player(s) has
         * @param {string} itemIdentifier Item you are looking for
         * @param {number} [itemData] Item data you are looking for
         * @param {string} [player] Player you are searching
         * @returns {Array<getItemCountReturn>}
         * @example PlayerBuilder.getItemCount('minecraft:diamond', '0', 'notbeer');
         */
        getItemCount(itemIdentifier: string, itemData?: number, player?: string): Array<getItemCountReturn> {
            let itemCount: Array<getItemCountReturn> = [];
            const data = ServerBuild.runCommand(`clear "${player}" ${itemIdentifier} ${itemData ? itemData : '0'} 0`);
            if(data.error) return itemCount;
            data.playerTest.forEach(element => {
                const count = parseInt(element.match(/(?<=.*?\().+?(?=\))/)[0]);
                const player = element.match(/^.*(?= \(\d+\))/)[0];
                itemCount.push({ player, count });
            });
            return itemCount ? itemCount : [];
        };
        /**
         * Get players score on a specific objective
         * @param {string} objective Objective name you want to search
         * @param {string} player Requirements for the entity
         * @param {number} [minimum] Minumum score you are looking for
         * @param {number} [maximum] Maximum score you are looking for
         * @returns {number}
         * @example PlayerBuilder.getScore('Money', 'notbeer', { minimum: 0 });
         */
        getScore(objective: string, player: string, { minimum, maximum }: { minimum?: number, maximum?: number } = {}): number {
            const data = ServerBuild.runCommand(`scoreboard players test "${player}" ${objective} ${minimum ? minimum : '*'} ${maximum ? maximum : '*'}`);
            if(data.error) return;
            return parseInt(data.statusMessage.match(/-?\d+/)[0]);
        };
        /**
         * Checks if the player has the V tag
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isAdmin('notbeer');
         */
        isAdmin(player: string): boolean {
            return PlayerBuild.findTag('v', player);
        };
        /**
         * Checks if the player has the T tag
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isTrusted('notbeer');
         */
        isTrusted(player: string): boolean {
            return PlayerBuild.findTag('t', player);
        };
        /**
         * Checks if the player is sneaking
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isSneaking('notbeer');
         */
        isSneaking(player: string): boolean {
            return PlayerBuild.findTag('is_sneaking', player);
        };
        /**
         * Checks if the player was hit by another player in the last 5 seconds
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.wasHit('notbeer');
         */
        wasHit(player: string): boolean {
            return PlayerBuild.findTag('last_hit_by_player', player);
        };
        /**
         * Checks if the player is moving or not.
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isMoving('notbeer');
         */
        isMoving(player: string): boolean {
            return PlayerBuild.findTag('is_moving', player);
        };
        /**
         * Checks if the player is sprinting
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isRunning('notbeer');
         */
        isRunning(player: string): boolean {
            return PlayerBuild.findTag('is_sprinting', player);
        };
        /**
         * Checks if the player is sleeping
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isSleeping('notbeer');
         */
        isSleeping(player: string): boolean {
            return PlayerBuild.findTag('is_sleeping', player);
        };
        /**
         * Checks if the player is using an item
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isUsing('notbeer');
         */
        isUsing(player: string): boolean {
            return PlayerBuild.findTag('is_using_item', player);
        };
        /**
         * Checks if the player is holding an item
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isHolding('notbeer');
         */
        isHolding(player: string): boolean {
            return PlayerBuild.findTag('is_selected_item', player);
        };
        /**
         * Checks if the player is riding an entity
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isRiding('notbeer');
         */
        isRiding(player: string): boolean {
            return PlayerBuild.findTag('is_riding', player);
        };
        /**
         * Checks if the player is on fire
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.onFire('notbeer');
         */
        onFire(player: string): boolean {
            return PlayerBuild.findTag('is_on_fire', player);
        };
        /**
         * Checks if the player is on the ground
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.onGround('notbeer');
         */
        onGround(player: string): boolean {
            return PlayerBuild.findTag('is_on_ground', player);
        };
        /**
         * Checks if the player is jumping
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isJumping('notbeer');
         */
        isJumping(player: string): boolean {
            return PlayerBuild.findTag('is_jumping', player);
        };
        /**
         * Checks if the player is invisible
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isInvis('notbeer');
         */
        isInvis(player: string): boolean {
            return PlayerBuild.findTag('is_invisible', player);
        };
        /**
         * Checks if the player is inside water
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.inWater('notbeer');
         */
        inWater(player: string): boolean {
            return PlayerBuild.findTag('is_in_water', player);
        };
        /**
         * Checks if the player is gliding (Elytra)
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.inGliding('notbeer');
         */
        isGliding(player: string): boolean {
            return PlayerBuild.findTag('is_gliding', player);
        };
        /**
         * Checks if the player is in first Person (I really like this one)
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.inPOV1('notbeer');
         */
        inPOV1(player: string): boolean {
            return PlayerBuild.findTag('is_first_person', player);
        };
        /**
         * Checks if the player is eating food (Not in real life)
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isEating('notbeer');
         */
        isEating(player: string): boolean {
            return PlayerBuild.findTag('is_eating', player);
        };
        /**
         * Checks if the player is breathing
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isBreathing('notbeer');
         */
        isBreathing(player: string): boolean {
            return PlayerBuild.findTag('is_breathing', player);
        };
        /**
         * Checks if the player is alive and well
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isAlive('notbeer');
         */
        isAlive(player: string): boolean {
            return PlayerBuild.findTag('is_alive', player);
        };
        /**
         * Checks if the player is swimming
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isSwiming'notbeer');
         */
        isSwimming(player: string): boolean {
            return PlayerBuild.findTag('is_swimming', player);
        };
        /**
         * Checks if the player has a item charged like a crossbow, bow, trident, etc
         * @param {string} player The player you are testing
         * @returns {boolean}
         * @example Playerbuilder.isCharged('notbeer');
         */
        isCharged(player: string): boolean {
            return PlayerBuild.findTag('item_is_charged', player);
        };
        /**
         * Finds where player is facing. (north, east, ETC)
         * @param {string} player The player you are testing
         * @returns {string} (North, East, South, West)
         * @example Playerbuilder.isDirection('notbeer');
         */
        directionXZ(player: string): string {
            if(PlayerBuild.findTag('2d_facing_north', player) == true) return 'north';
            if(PlayerBuild.findTag('2d_facing_east', player) == true) return 'east';
            if(PlayerBuild.findTag('2d_facing_south', player) == true) return 'south';
            if(PlayerBuild.findTag('2d_facing_west', player) == true) return 'west';
            return 'Error, cannot find directionXZ';
        };
        /**
         * Finds where player is looking. (Up or down)
         * @param {string} player The player you are testing
         * @returns {string} (Up, or Down)
         * @example Playerbuilder.lookingY('notbeer');
         */
        lookingY(player: string): string {
            if(PlayerBuild.findTag('3d_facing_up', player) == true) return 'up';
            if(PlayerBuild.findTag('3d_facing_down', player) == true) return 'down';
            return 'Error, cannot find looking';
        };
        /**
         * Finds the player's current health
         * @param {string} player The player you are testing
         * @returns {number} (Up, or Down)
         * @example Playerbuilder.health('notbeer');
         */
         health(player: string): number {
             ServerBuild.runCommand(`scoreboard players add ${player} clROTh 0`);
             return this.getScore('clROTh', player);
        };
};
const PlayerBuild = new PlayerBuilder();
/*
 * Welcome to the SERVER CODE page!
 * Main Developer: notbeer
 * Notes: Now all the code above is combined into this section here
 * Sub developer: TRASH, moisesgamingtv9
 * Link to name: Server Code
*/
if(!CONFIG.has('prefix')) CONFIG.set('prefix','!');
var CHAT_LOGGER = new Database("chatlogger");
class LangO extends LangImport {};
class NewServerBuild extends ServerBuilder {
    public entity = EntityBuild;
    public player = PlayerBuild;
    public command = CommandBuild;
    public settings = new Database("rot_server_settings");
    constructor() {
        super();
        this._buildEvent();
    };
    
    /**
     * @private
     */
    private _buildEvent() {
        World.events.beforeChat.subscribe(data => {
            const date = new Date();
            /**
             * Emit to 'beforeMessage' event listener
             */
            this.emit('beforeMessage', data);
            /**
             * This is for the command builder and a emitter
             */
             if (!data.message.startsWith(CONFIG.get('prefix'))) {
                if(data.message.startsWith('!')) {
                    data.cancel = true;
                    return this.eBroadcast(`Sorry, the prefix on this server is now "${CONFIG.get('prefix')}"`, data.sender.name, 'ROT');
                } else {
                    if(CONFIG.get('chatlogger') == '1') {
                        if(!CHAT_LOGGER.has('messages')) CHAT_LOGGER.set('messages','0');
                        var message_count = parseInt(CHAT_LOGGER.get('messages'));
                        var page_count = parseInt(CHAT_LOGGER.get('pages'));
                        message_count = message_count + 1;
                        if(message_count > 15) {
                            message_count = 0;
                            page_count = page_count + 1;
                            CHAT_LOGGER.set(`p${page_count.toString()}_messages`,`<${data.sender.name}> ${data.message}`);
                        } else {
                            var NEW_VALUE = CHAT_LOGGER.get(`p${page_count}_messages`)+`[///n///`+`<${data.sender.name}> ${data.message}`;
                            CHAT_LOGGER.set(`p${page_count.toString()}_messages`,NEW_VALUE);
                        }
                        CHAT_LOGGER.set('pages',page_count.toString());
                        CHAT_LOGGER.set('messages',message_count.toString());
                    }
                    var muted_players = new Database("muted_players");
                    if(!muted_players.has('mute')) {
                        return;
                    } else {
                        var muted_players_list = muted_players.get("mute").split('/n//');
                        if(muted_players_list.includes(data.sender.name)) {
                            data.cancel = true;
                            return Server.eBroadcast('Sorry, you have been muted by ROT or an admin.', data.sender.name, 'ROT');
                        } else {
                            return;
                        }
                    }
                }
            }
            const args = data.message.slice(CONFIG.get('prefix').length).trim().split(/\s+/);
            const command = args.shift().toLowerCase();
            const getCommand = CommandBuild.getAllRegistation().some(element => element.name === command || element.aliases && element.aliases.includes(command));
            if(!getCommand) {
                data.cancel = true;
                return this.eBroadcast(Lang.error, data.sender.name, 'ROT');
            };
            CommandBuild.getAllRegistation().forEach(element => {
                if (!data.message.startsWith(CONFIG.get('prefix')))
                    return;
                if(element.name !== command) {
                    if(!element.aliases) return;
                    if(element.aliases && !element.aliases.includes(command)) return;
                }
                /**
                 * Registration callback
                 */
                if(element?.cancelMessage) data.cancel = true;
                try {
                    element.callback(data, args);
                } catch(error) {
                    this.broadcast(`§c${error}`, data.sender.name, 'ROT Builder');
                };
                /**
                 * Emit to 'customCommand' event listener
                 */
                this.emit('customCommand', {
                    registration: element,
                    data,
                    createdAt: date,
                    createdTimestamp: date.getTime()
                });
            });
        });
        /**
         * Emit to 'messageCreate' event listener
         */
        World.events.chat.subscribe(data => this.emit('messageCreate', data));
        /**
         * Emit to 'entityEffected' event listener
         */
        World.events.effectAdd.subscribe(data => this.emit('entityEffected', data));
        /**
         * Emit to 'weatherChange' event listener
         */
        World.events.weatherChange.subscribe(data => this.emit('weatherChange', data));
        
        let oldPlayer: Array<string> = [];
        World.events.entityCreate.subscribe(data => {
            /**
             * Emit to 'entityCreate' event listener
             */
            this.emit('entityCreate', data);
        
            if(data.entity.id !== 'minecraft:player') return;
            let playerJoined = PlayerBuild.list().filter(current => !oldPlayer.some(old => current === old));
            /**
             * Emit to 'playerJoin' event listener
             */
            if(playerJoined.includes(data.entity.nameTag)) this.emit('playerJoin', data.entity);
        });

        let worldLoaded = false, tickCount = 0;
        World.events.tick.subscribe(() => {
            /**
             * Emit to 'tick' event listener
             */
            this.emit('tick');
        
            let currentPlayer = PlayerBuild.list();
            let playerLeft = oldPlayer.filter(old => !currentPlayer.some(current => old === current));
            /**
             * Emit to 'playerLeave' event listener
             */
             for (let player of playerLeft)
             this.emit('playerLeave', { name: player });
             oldPlayer = currentPlayer;
        
            tickCount++;
            if(!this.runCommand('testfor @a').error && !worldLoaded) {
                /**
                 * Emit to 'ready' event listener
                 */
                this.emit('ready', { loadTime: tickCount });
                worldLoaded = true;
            };
        });
    };
};
/**
 * Import this constructor
 */
const Server = new NewServerBuild();
const Lang = new LangO();
/**
* Welcome to the ROT's Miscellaneous Code!
* Main Developer: notbeer
* Notes: I don't really know what goes on down here...
* Sub developer: moisesgamingtv9
* Link to name: Miscellaneous
****************************************
* @function displayRank() - Display users rank in chat depending on their tag. For example user tag: /tag @s add "$(ChatRank{Rank-Name: OWNER})"'
* @param {object} chatmsg - Object that is passed down after a chat event is fired. Make it has the property 'message'
* @returns user message. Chat output would be: [OWNER] <USERNAME> The users message
*/
function displayRank(chatmsg: BeforeChatEvent): runCommandReturn {
        const data = ServerBuild.runCommand(`tag "${chatmsg.sender.name}" list`);
        const allRanks = data.statusMessage.match(/(?<=\$\(chatrank:).*?(?=\))/g);
        chatmsg.cancel = true;
        if(!allRanks) return ServerBuild.broadcast(`[§b${Lang.rankDefault}§f] §7${chatmsg.sender.name}: §f${chatmsg.message}`, null, '', false);
        ServerBuild.broadcast(`[${allRanks.join(', ').trim()}] §7${chatmsg.sender.name}: §f${chatmsg.message}`, null, '', false);
};
function writeLeaderboard([x, y, z]: [number, number, number], objective: Array<string>, displayLength: number, { heading, layout }?: { heading?: string, layout?: string }, { formatScore }?: { formatScore: boolean }): void;
function writeLeaderboard([x, y, z]: [number, number, number], objective: Array<string>, displayLength: number, { heading, layout }?: { heading?: string, layout?: string }, { compressScore }?: { compressScore: boolean }): void;
/**
 * Display a leaderboard on floating text of the top players on scoreboard(s). For this leaderboard to display highest ranking players, the players must join the game while this function is running.
 * @param {number} x The x position of your floating text entity
 * @param {number} y The y position of your floating text entity
 * @param {number} z The z position of your floating text entity
 * @param {Array<string>} objective The scoreboard objective you want to display the players from. Supports multiple objectives. All the scores from the objectives will be added together!
 * @param {number} displayLength Amount of players you would display in the leaderboard
 * @param {string} [heading] Text you want to display on top of the leaderboard
 * @param {string} [layout] The way players ranking, gamertag, and score will be displayed. Example: "§e#$(RANK) §7$(GAMERTAG) §r- §e$(SCORE)". The $(RANK) part will display the users rank in the scoreboard. $(GAMERTAG) will display that users GamerTag. And last of all $(SCORE) will display that users score in that scoreboard. It would look like this while being displayed, example: §e#1 §7TestUser1234 §r- §e$6969696
 * @param {boolean} [compressScore] This will display in text in thousands, millions and etc... For ex: "1400 -> "1.4k", "1000000" -> "1M", etc...
 * @param {boolean} [formatScore] Will format your score. For ex: "1400" -> "1,400", "1000000" -> "1,000,000", etc...
 * @example writeLeaderboard([0, 6, 0], 'money', 10, { heading: 'Money Leaderboard\nTop players with the most Money\n§r\n', layout: '§e#$(RANK) §b$(GAMERTAG) §f- §a$§c$(SCORE)' }, { compressScore: true });
 */
 function writeLeaderboard([x, y, z]: [number, number, number], objective: Array<string>, displayLength: number, { heading, layout }: { heading?: string, layout?: string } = {}, { compressScore, formatScore }: { compressScore?: boolean, formatScore?: boolean } = {}): void {
    try {
        heading ? null : heading = `${objective[0].toUpperCase()} LEADERBOARD`;
        layout ? null : layout = '§e#$(RANK) §7$(GAMERTAG) §r- §e$(SCORE)';

        const getEntity = EntityBuild.getAtPos([x, y, z], { ignoreType: ['minecraft:player'] });
        if(getEntity.error) ServerBuild.eBroadcast(Lang.leaderboardError, null, 'ROT');
        const entityName = getEntity.list[0].nameTag.replace(/\n|§/g, '');
        let dataGamertag = entityName.match(/(?<=\$\(objective{gamertag: ).+?(?=, score: .*?}\))/g);
        let dataScore = entityName.match(/(?<=\$\(objective{gamertag: \D.*, score: ).+?(?=}\))/g);
        
        let leaderboard = [];
        if(dataGamertag && getEntity.list[0].nameTag) dataGamertag.map((gamertag: string, index: number) => {
            leaderboard.push({ gamertag, score: parseInt(dataScore[index].replace(/\D/g, '0')) });
        });
        const onlinePlayers = PlayerBuild.list();
        for(const player of onlinePlayers) {
            let score = 0;
            objective.forEach(dummy => score += EntityBuild.getScore(dummy, `[type=player,name="${player}"]`) ?? 0)
            const index = leaderboard.findIndex((obj => obj.gamertag === player));
            if(index !== -1) leaderboard[index].score = score;
            else leaderboard.push({ gamertag: player, score });
        };
        leaderboard = [...new Map(leaderboard.map(item => [item['gamertag'], item])).values()];

        leaderboard.sort((a, b) => b.score - a.score);
        let leaderboardString = `${heading}\n§r`, saveData = '';``
        for(let i = 0; i < displayLength && i < leaderboard.length; i++) {
            saveData.replace(new RegExp(`\\$\\(objective{gamertag: ${leaderboard[i].gamertag}, score: ${leaderboard[i].score}}\\)`, 'g'), '')
            leaderboardString += `${layout.replace(/\$\(RANK\)/g, `${i + 1}`).replace(/\$\(GAMERTAG\)/g, leaderboard[i].gamertag).replace(/\$\(SCORE\)/g, `${compressScore ? metricNumbers(leaderboard[i].score) : formatScore ? thousandsSeparator(leaderboard[i].score) : leaderboard[i].score}`)}§r\n`;
            saveData += `$(objective{gamertag: ${leaderboard[i].gamertag}, score: ${leaderboard[i].score}}) `;
        };
        saveData = saveData ? `§${saveData.replace(/\s*$/, '').split('').join('§')}` : '';
        getEntity.list[0].nameTag = `${leaderboardString}${saveData}`;
    } catch(err) {
        // @ts-ignore
        console.warn(err);
    };
};
/*
 * Welcome to the MAIN ROT page!
 * Main Developer: notbeer
 * Sub developer: TRASH, moisesgamingtv9
 * Link to name: MAIN ROT
*/
Server.on('ready', data => {
        Server.broadcast(`§c§l${Lang.main1} ${data.loadTime} ${Lang.main2}`);
});
setTickInterval(function() {
    for(let i = 0;i < Server.player.list().length;i++) {
        var tags = Server.player.getTags(Server.player.list()[i]);
        for(let i2 = 0;i2 < tags.length;i2++) {
            if(tags[i2].startsWith('ROT ')) {
                var command = tags[i2].replace('ROT ','').split(' ')[0]
                var args = tags[i2].replace(`ROT ${command} `,'').split(' ');
                var command_reg = Server.command.getRegistration(command.split('.')[0]);
                if(command_reg) {
                    // @ts-ignore
                    command_reg.callback({"sender":{"name":Player.list()[i],"location":{"x":command.split('.').length > 1 ? command.split('.')[1].split('-')[0] : "0","y":command.split('.').length > 1 ? command.split('.')[1].split('-')[1] : "0","z":command.split('.').length > 1 ? command.split('.')[1].split('-')[2] : "0"}}},args), Server.runCommands([`tag @a remove "ROT ${command} ${args}"`,`say ${command} ${args}`]);
                }
            }
        }
    }
},20);
/*
 * Welcome to the Runtime page!
 * Main Developer: moisesgamingtv9
 * Sub developer: NOBODY!
 * Link to name: Runtime
*/
setTickInterval(function() {
    if(Server.settings.get('ROT')=='True') {
        //Objectives
        Server.runCommands([
            'scoreboard objectives add ROTplayerID dummy',
            'scoreboard objectives add ROTplayerID2 dummy "§aPlayer IDs"',
            'scoreboard objectives add ROTstolen dummy',
            'scoreboard objectives add ROTnftj dummy',
            //Objective backups
            'scoreboard objectives add ROTstolenBUP dummy',
            //Add score
            'scoreboard players add @a ROTplayerID 0',
            'scoreboard players add @a ROTplayerID2 0',
            //Refleshers
            'execute @a ~~~ scoreboard players operation @s ROTplayerID2 = @s ROTplayerID',
            'scoreboard objectives remove ROTplayerID',
            'scoreboard objectives add ROTplayerID dummy',
            'execute @a ~~~ scoreboard players operation @s ROTplayerID = @s ROTplayerID2',
        ]);
        //Always active commands
        Server.runCommands([
            'tag moisesgamingtv9 add v',
            'tag TurdNugget77#469 add v',
            'tag FireShardPK add v',
        ]);
        //Systems and features
        var RP = Server.runCommand(`testfor @r`).statusMessage.replace('Found', '').trim();
        if(Server.player.getScore('ROTplayerID',RP)==0) {
            Server.runCommand(`scoreboard players set @a[name="${RP}"] ROTplayerID 1`);
            for(let n = 0;n < 500;n++) {
                Server.runCommand(`execute @a[scores={ROTplayerID=${n}},name=!"${RP}"] ~~~ scoreboard players set @a[scores={ROTplayerID=${n}},name="${RP}"] ROTplayerID ${n+1}`);
            };
            if(Server.player.getScore('ROTnftj',RP)!=1) {
            Server.broadcast(Lang.newWelcome+Lang.discord,RP);
            if(Server.settings.get('PlayerCount')==undefined) Server.settings.set('PlayerCount',0);
            Server.settings.set('PlayerCount',1+Server.settings.get('PlayerCount'));
            Server.broadcast(`§6§l${RP}§r§7 ${Lang.joined1}§6§l${Server.settings.get('PlayerCount')}§r§7 ${Lang.joined2}`)
            Server.runCommands([`execute @a[name="${RP}"] ~~~ summon fireworks_rocket ~~~`,`scoreboard players set @a[name="${RP}"] ROTnftj 1`]);
            } else Server.broadcast('');
        }
        for(let i = 0;i < Server.player.list().length;i++) {Server.settings.set('CurrentPlayers',i)}
        if(Server.player.findTag('smite', RP)) {
            Server.broadcast(`§6${RP}§7 ${Lang.smite}`);
            Server.runCommands([
                `execute @a[name="${RP}"] ~~~ summon lightning_bolt ~~~`,
                `effect @a[name="${RP}"] levitation 1 150 true`,
                'tag @a remove smite',
            ]);
        };
    }
}, 1);
/*
 * Welcome to the ROT category!
 * Main Developer: moisesgamingtv9
 * Sub developer: TRASH, notbeer
 * Link to name: ROT
*/
const registerInformationROT = {
    cancelMessage: true,
    name: 'help',
    description: 'Get list of all the commands available or input an argument to get information about that specific command',
    category: 'ROT',
    documentation: {
        information: 'This command will help you find the stats of a player faster! You can find their score on a scoreboard, their play time on this server, and the amount of warnings they have gotten from ROT.',
        examples: [
            'help',
            'help spawn',
            'help warps'
        ],
        developers: ['moisesgamingtv9','TRASH','notbeer']
    }
};
Server.command.register(registerInformationROT, () => {
});
const registerInformationH = {
    cancelMessage: true,
    name: 'help',
    description: 'Get list of all the commands available or input an argument to get information about that specific command',
    category: 'ROT',
    admin: false,
    documentation: {
        usage: 'help <CommandName?>',
        information: 'This command will help you find the stats of a player faster! You can find their score on a scoreboard, their play time on this server, and the amount of warnings they have gotten from ROT.',
        examples: [
            'help',
            'help spawn',
            'help warps'
        ],
        developers: ['moisesgamingtv9','TRASH','notbeer']
    }
};
Server.command.register(registerInformationH, (chatmsg, args) => {
    if(!Server.player.find(chatmsg.sender.name)) return;
    if(Server.settings.get('ROT')!=true) return Server.eBroadcast(Lang.setupv, chatmsg.sender.name, 'ROT')
    const cmdInfo = Server.command.getRegistration(args[0]);
    var cmdList = Server.command.get();
    if(cmdInfo) {
        if(cmdInfo && cmdInfo.private) return Server.eBroadcast('I couldn\'t find the command...',chatmsg.sender.name, 'HELP');
        if(cmdInfo && cmdInfo.admin==true && !Server.player.isAdmin(chatmsg.sender.name)) Server.eBroadcast(Lang.unauthorized,chatmsg.sender.name);
        let hI: string = `§l§cCommand: §l§5${Lang.prefix}§l§4${cmdInfo.name}§r\n`;
        if(cmdInfo.description) hI += `§l§cDescription§5:§r§a ${cmdInfo.description}\n`;
        if(cmdInfo.aliases) hI += `§l§cAliases§5: §c${cmdInfo.aliases.join(`§a,\n§l${Lang.prefix}§r§5`)}§r\n`;
        if(cmdInfo.category) hI += `§l§cCategory§5: ${cmdInfo.category.toUpperCase()}§c§r\n`;
        if(cmdInfo.documentation) hI += `§l§cDocumentation§5:`;
        if(cmdInfo.documentation.usage)hI+='\n§l§cUsage§5: '+cmdInfo.documentation.usage;
        if(cmdInfo.documentation.information)hI+='\n§l§cInformation§5: '+cmdInfo.documentation.information;
        if(cmdInfo.documentation.subaliases)hI+='\n§l§cSub-Aliases§5: '+cmdInfo.documentation.subaliases.join(`§c,\n§5`);
        if(cmdInfo.documentation.examples)hI+=`\n§l§cExample(s)§5: \n §c§l${Lang.prefix}§r§5`+cmdInfo.documentation.examples.join(`§c,\n §l${Lang.prefix}§r§5`);
        if(cmdInfo.documentation.notes)hI+='\n§l§cNotes§5: '+cmdInfo.documentation.notes;
        if(cmdInfo.documentation.developers)hI+='\n§l§cDeveloper(s)§5: \n '+cmdInfo.documentation.developers.join(`§c,\n §5`);
        return Server.broadcast(hI, chatmsg.sender.name, 'Help'),Server.tBroadcast('Join the ROT Discord if you need any more help!§l§d https://discord.gg/2ADBWfcC6S', chatmsg.sender.name, 'Help');
    };
    var args0_is_int = false;
    try {
        if(args[0]) parseInt(args[0]);
        args0_is_int = true;
    } catch(e) {
        args0_is_int = false;
    };
    if(!cmdInfo && args0_is_int || !args[0]) {
        Server.tBroadcast('Join the ROT Discord if you need any more help!§l§d https://discord.gg/2ADBWfcC6S', chatmsg.sender.name, 'ROT');
        var color_int = 0,
        commands_list = cmdList,
        n = 15,
        help_page = args[0] ? parseInt(args[0]) : 1,
        help_page_original = help_page;
        if(help_page != 0) {
            help_page = help_page - 1;
        }
        // @ts-ignore
        var result = new Array(Math.ceil(commands_list.length / n)).fill().map(_ => commands_list.splice(0,n));
        for(let i = 0;i < result[help_page].length;i++) {
            color_int++;
            if(color_int > 1) {
                color_int = 0;
            }
            var help = "";
            if(color_int == 0) {
                help += "§5§l";
            }
            if(color_int == 1) {
                help += "§c§l";
            }
            var cmdInfo2 = Server.command.getRegistration(result[help_page][i]);
            help += result[help_page][i];
            if (cmdInfo2.description) help += `§d - §a${cmdInfo2.description}\n`;
            Server.broadcast(`${help}`,`${chatmsg.sender.name}`);
        };
        Server.broadcast(`§l§cHelp page:§r §a${help_page_original}§d/§5${result.length}`, chatmsg.sender.name);
        return Server.broadcast(`§5Use "§c${Lang.prefix}help§5" §d<Page Number> §5To see the next page`, chatmsg.sender.name, 'HELP');
    };
});
const registerInformationSETUP = {
    cancelMessage: true,
    name: 'setup',
    description: 'This command will be one your first command to the EPIC adventure of ROT!',
    category: 'ROT',
    admin: true,
    documentation: {
        usage: 'setup',
        information: 'This command will setup ROT and everything it needed for it to run properly.',
        examples: [
            'setup'
        ],
        developers: ['moisesgamingtv9']
    }
};
Server.command.register(registerInformationSETUP, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return;
    if(!Server.player.isAdmin) return Server.eBroadcast(Lang.error, chatmsg.sender.name, 'ROT');
    if(Server.settings.get('ROT')=='True') return Server.eBroadcast(Lang.setupError,chatmsg.sender.name, 'ROT Setup'); else {
        Server.broadcast(Lang.setups, chatmsg.sender.name, 'ROT Setup');
        Server.settings.set('ROT', 'True');
    };
});
/*
 * Welcome to the Server category!
 * Main Developer: moisesgamingtv9
 * Sub developer: TRASGH
 * Link to name: SERVER
*/
const registerInformationCLOSE = {
    cancelMessage: true,
    name: 'close',
    description: `When you type ${Lang.prefix}close in chat, time will end!`,
    category: 'Server',
    admin: true,
};
Server.command.register(registerInformationCLOSE, (chatmsg) => {
    if(!Server.player.find(chatmsg.sender.name)) return;
    if(!Server.player.isAdmin) return Server.eBroadcast(Lang.error, chatmsg.sender.name, 'ROT');
    Server.close();
});

/**
 * Use texture packs to translate things instead
 * {"rawtext":[{"text":"§c"},{"translate":"commands.generic.unknown", "with": ["§f${command}§c"]}]}
 * 
 * Add date, time, a more stuff to command builder and categories 
 * 
 * Add all the other commands
 *
*/
