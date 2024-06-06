import request from 'supertest';
import app from './app';
import db, { getRepos } from './db.js';

describe('Test the root path', () => {
    test('should return 404', async () => {
        return request(app)
            .get('/')
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });
});

describe('Db', () => {
    beforeAll(() => {
        return db.connect('');
    });

    test('should connect to the database', () => {
        expect(db.getDb()).toBeTruthy();
    });

    test('should get the repositories', () => {
        expect(getRepos()).toBeTruthy();
    });

    afterAll(() => {
        return db.close();
    });
});
