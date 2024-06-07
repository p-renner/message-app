import request from 'supertest';
import app from '../app';
import db from '../db';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('Test the channel routes for sqlite', () => {
    beforeAll(async () => {
        process.env.DB_PATH = ':memory:';
        await db.connect();
    });

    afterAll(() => {
        db.close();
    });

    test('should return 200', async () => {
        return request(app)
            .get('/api/channels')
            .then((response) => {
                expect(response.status).toBe(200);
            });
    });

    test('should return 404', async () => {
        return request(app)
            .get('/api/channels/1')
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });

    test('should return 201', async () => {
        return request(app)
            .post('/api/channels')
            .send({ name: 'Test' })
            .then((response) => {
                expect(response.status).toBe(201);
            });
    });
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

    test('should return 200', async () => {
        return request(app)
            .get('/api/channels')
            .then((response) => {
                expect(response.status).toBe(200);
            });
    });

    test('should return 404', async () => {
        return request(app)
            .get('/api/channels/1')
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });

    test('should return 201', async () => {
        return request(app)
            .post('/api/channels')
            .send({ name: 'Test' })
            .then((response) => {
                expect(response.status).toBe(201);
            });
    });
});
