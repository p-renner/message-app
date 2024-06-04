import { MongoClient } from 'mongodb';

async function initDb() {
    const uri = 'mongodb://localhost:27017/';
    let client: MongoClient;

    try {
        console.log('Connecting to MongoDB...');
        client = await MongoClient.connect(uri);
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
