const godClient = require('./Structures/godClient.js');
const config = require('./Structures/config.json'); // options
const client = new godClient(config);

client.start();


//commented stuff go look at Commands\Developer\ExampleCommand.js


