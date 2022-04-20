const { or } = require('mathjs');
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js');
const Event = require('./Event.js')
const Jimp = require('jimp');

module.exports = class Util {
    constructor(client) {
        this.client = client;
    };

    isClass(input) {
        return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
    };

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`;
    };   

    removeDuplicates(arr) {
		return [...new Set(arr)];
    };

    capitalise(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
    };

    async unloadCommands() {
        return glob(`${this.directory}Commands/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete require.cache[require.resolve(commandFile)];
            };
        });
    };

    async loadCommands() {
        return glob(`${this.directory}Commands/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete require.cache[require.resolve(commandFile)];
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class!`);
                const command = new File(this.client, name.toLowerCase());
                if (!(command instanceof Command)) throw new TypeError(`Command ${name} doesn't belong in the Commands directory.`);
                this.client.commands.set(command.name, command);

                if (command.aliases.length > 0) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command.name);
                    };
                }
            };
        });
    };

    async loadEvents() {
        return glob(`${this.directory}Events/**/*.js`).then(events => {
            for (const eventFile of events) {
                const { name } = path.parse(eventFile);
                const File = require(eventFile);
                if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
                const event = new File(this.client, name.toLowerCase());
                if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in the Events directory.`);
                this.client.events.set(event.name, event);
                event.emitter[event.type](name, (...args) => event.run(...args));
            };
        });
    };
};