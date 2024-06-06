import { Db, MongoClient } from 'mongodb';
import { Message } from './models/messages.models';
import { Channel } from './models/channels.models';

async function createIndexes(db: Db) {
    const channels = db.collection<Channel>('channels');
    await channels.createIndex({ name: 1 }, { unique: true });

    const messages = db.collection<Message>('messages');
    await messages.createIndex({ channelId: 1 });
}

async function initDb() {
    const uri = 'mongodb://localhost:27017/';
    let client: MongoClient;

    try {
        console.log('Connecting to MongoDB...');
        client = await MongoClient.connect(uri);
        createIndexes(client.db('messageapp'));
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('Could not connect to MongoDB');
        process.exit(1);
    }

    client.on('close', () => {
        console.error('Lost connection to MongoDB');
        process.exit(1);
    });

    client.on('timeout', () => {
        console.error('Connection to MongoDB timed out');
    });

    return client.db('messageapp');
}

export default initDb;
