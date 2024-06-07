import db, { getRepos } from './db.js';
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

    it('should connect to the database', () => {
        expect(db.getDb()).toBeTruthy();
    });

    it('should get the repositories', () => {
        return expect(getRepos()).resolves.toMatchObject({
            messages: expect.any(Object),
            channels: expect.any(Object),
        });
    });
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

    it('should connect to the database', () => {
        expect(db.getDb()).toBeTruthy();
    });

    it('should get the repositories', () => {
        return expect(getRepos()).resolves.toMatchObject({
            messages: expect.any(Object),
            channels: expect.any(Object),
        });
    });
});

describe('No db', () => {
    test('should throw an error when getting the repositories', async () => {
        expect(getRepos).rejects.toThrow('Database not connected');
    });

    it('should throw an error when getting the database', () => {
        expect(db.getDb).toThrow('Database not connected');
    });
});
