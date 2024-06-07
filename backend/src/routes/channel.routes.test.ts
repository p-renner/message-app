import request from 'supertest';
import app from '../app';
import db from '../db';

describe('Test the channel routes for sqlite', () => {
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
