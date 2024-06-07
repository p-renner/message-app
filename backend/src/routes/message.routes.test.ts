import request from 'supertest';
import app from '../app';
import db from '../db';

describe('Test the message routes for sqlite', () => {
    beforeAll((done) => {
        process.env.DB_PATH = ':memory:';
        db.connect().then(() => {
            done();
        });
    });

    afterAll((done) => {
        db.close().then(() => {
            done();
        });
    });

    testAll();
});

describe('Test the channel routes for mongodb', () => {
    beforeAll((done) => {
        db.connect('mongodb').then(() => {
            done();
        });
    });

    afterAll((done) => {
        db.close().then(() => {
            done();
        });
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
