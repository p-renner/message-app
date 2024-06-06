import db, { getRepos } from './db.js';

describe('MongoDb', () => {
    beforeAll(async () => {
        console.log('Connecting to the database');
        await db.connect('mongodb');
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

describe('Sqlite', () => {
    process.env.DB_TYPE = 'sqlite';
    process.env.DB_PATH = ':memory:';

    beforeAll(async () => {
        console.log('Connecting to the database');
        await db.connect(process.env.DB_TYPE);
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
