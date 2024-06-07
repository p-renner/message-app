import request from 'supertest';
import WebSocket from 'ws';
import app from './app';
import db from './db';
import { Message } from './models/messages.models';

describe('Test the root path', () => {
    test('should return 404', async () => {
        return request(app)
            .get('/')
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });
});

describe('Test the websocket path', () => {
    let port = 8080;
    let server: any;

    beforeAll((done) => {
        process.env.DB_PATH = ':memory:';
        server = app.listen(port);
        db.connect('').then(() => {
            done();
        });
    });

    afterAll((done) => {
        db.close().then(() => {
            done();
        });
        server.close();
    });

    test('should return 404', async () => {
        return request(app)
            .get('/ws')
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });

    test('should return 404', async () => {
        return request(app)
            .get('/ws/test')
            .then((response) => {
                expect(response.status).toBe(404);
            });
    });

    test('should return message array', (done) => {
        const ws = new WebSocket(`ws://localhost:${port}/ws/test`);

        ws.on('open', () => {
            ws.send('{"message":"Test","userId":"Test"}');
        });

        ws.on('message', (data) => {
            const messages = JSON.parse(data.toString()) as Message[];
            expect(messages[0]!.id).toBeTruthy();
            expect(messages[0]!.message).toBe('Test');
            expect(messages[0]!.userId).toBe('Test');
            expect(messages[0]!.timestamp).toBeTruthy();
            expect(messages[0]!.channelName).toBe('test');
            ws.close();
        });

        ws.on('close', () => {
            done();
        });

        ws.on('error', (err) => {
            done(err);
        });
    });
});
