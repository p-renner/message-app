import { Db, MongoClient } from 'mongodb';
import { Message } from './models/messages.models';
import { Channel } from './models/channels.models';
import dotenv from 'dotenv';

dotenv.config();

async function createIndexes(db: Db): Promise<void> {
    const channels = db.collection<Channel>('channels');
    await channels.createIndex({ name: 1 }, { unique: true });

    const messages = db.collection<Message>('messages');
    await messages.createIndex({ channelId: 1 });
}

let client: MongoClient | null;
let db: Db | null;

async function connect(): Promise<Db> {
    const { DB_PATH } = process.env;

    if (!DB_PATH) {
        throw new Error('DB_PATH environment variables must be set');
    }

    try {
        console.log('Connecting to MongoDB...');
        client = await MongoClient.connect(DB_PATH);
        db = client.db('messageapp');
        await createIndexes(db);
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

    return db;
}

async function close() {
    await client?.close();
    client = null;
    db = null;
}

export { connect, close };
