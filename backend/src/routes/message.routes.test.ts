import request from 'supertest';
import app from '../app';
import db from '../db';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Test the message routes for sqlite', () => {
    beforeAll(async () => {
        process.env.DB_PATH = ':memory:';
        await db.connect();
    });

    afterAll(() => {
        db.close();
    });

    testAll();
});

describe('Test the channel routes for mongodb', () => {
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

function testAll() {
    test('GET /api/messages/test', async () => {
        const response = await request(app).get('/api/messages/test');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
}
