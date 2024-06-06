import request from 'supertest';
import app from './app';

describe('Test the root path', () => {
    test('should return 404', async () => {
        return request(app)
            .get('/')
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });
});
