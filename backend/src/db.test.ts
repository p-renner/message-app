import db from './db.js';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('MongoDb', () => {
    let mongod: MongoMemoryServer;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        process.env.DB_PATH = mongod.getUri();

        await db.connect('mongodb');
    });

    afterAll(async () => {
        console.log('Closing the database');
        await db.close();
        await mongod.stop();
    });

    testAll();
});

describe('Sqlite', () => {
    beforeAll(async () => {
        console.log('Connecting to the database');
        process.env.DB_PATH = ':memory:';
        await db.connect();
    });

    afterAll(async () => {
        console.log('Closing the database');
        await db.close();
    });

    testAll();
});

describe('No db', () => {
    test('should throw an error when getting the repositories', async () => {
        expect(db.getMessagesRepo()).rejects.toThrow('Database not connected');
    });

    test('should throw an error when getting the repositories', async () => {
        expect(db.getMessagesRepo()).rejects.toThrow('Database not connected');
    });

    it('should throw an error when getting the database', () => {
        expect(db.getDb).toThrow();
    });
});

function testAll() {
    it('should connect to the database', () => {
        expect(db.getDb).toBeTruthy();
    });

    it('should get the message repo', () => {
        return expect(db.getMessagesRepo()).resolves.toMatchObject({
            get: expect.any(Function),
            insert: expect.any(Function),
        });
    });

    it('should get the channels repo', () => {
        return expect(db.getChannelsRepo()).resolves.toMatchObject({
            get: expect.any(Function),
            insert: expect.any(Function),
        });
    });
}
