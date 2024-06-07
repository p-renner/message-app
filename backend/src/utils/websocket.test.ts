import db from '../db';
import { insertData, getMessagesString } from './websocket';

describe('Test websocket utils on sqlite', () => {
    process.env.DB_PATH = ':memory:';

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(() => {
        db.close();
    });

    test('should be empty', async () => {
        const channel = { name: 'test' };
        const messages = await getMessagesString(channel);

        expect(JSON.parse(messages)).toEqual([]);
    });

    test('should return id', async () => {
        const message = Buffer.from('{"message":"Test","userId":"Test"}');
        const channel = { name: 'test' };
        const messageObj = await insertData(message, channel);
        expect(messageObj.id).toBeDefined();

        const messages = await getMessagesString(channel).then((messages) => JSON.parse(messages));
        expect(messages.length).toBe(1);
        expect(messages[0].id).toBe(messageObj.id);
        expect(messages[0].message).toBe('Test');
        expect(messages[0].userId).toBe('Test');
    });

    test('should not throw error on same message', async () => {
        const message = Buffer.from('{"message":"Test","userId":"Test"}');
        const channel = { name: 'test' };

        await expect(insertData(message, channel)).resolves.not.toThrow();
    });

    test('should not throw error on additional fields', async () => {
        const message = Buffer.from('{"message":"Test","userId":"Test","test":"Test"}');
        const channel = { name: 'test' };

        await expect(insertData(message, channel)).resolves.not.toThrow();
    });

    test('should throw error', async () => {
        const message = Buffer.from('{"message":"Test"}');
        const channel = { name: 'test' };

        await expect(insertData(message, channel)).rejects.toThrow('Missing fields');
    });

    test('should throw error', async () => {
        const message = Buffer.from('{"userId":"Test"}');
        const channel = { name: 'test' };

        await expect(insertData(message, channel)).rejects.toThrow('Missing fields');
    });

    test('should throw error', async () => {
        const message = Buffer.from('Test');
        const channel = { name: 'test' };

        await expect(insertData(message, channel)).rejects.toThrow();
    });
});

describe('Test websocket utils on mongodb', () => {
    beforeAll(async () => {
        await db.connect('mongodb');
    });

    afterAll(() => {
        db.close();
    });

    test('should return id', async () => {
        const message = Buffer.from('{"message":"Test","userId":"Test"}');
        const channel = { name: 'test' };
        const messageObj = await insertData(message, channel);
        expect(messageObj.id).toBeDefined();

        const messages = await getMessagesString(channel).then((messages) => JSON.parse(messages));
        expect(messages.length).toBeGreaterThan(0);

        const lastMessage = messages[messages.length - 1];
        expect(lastMessage.id).toBe(messageObj.id);
        expect(lastMessage.message).toBe('Test');
        expect(lastMessage.userId).toBe('Test');
    });

    test('same message should not throw error', async () => {
        const message = Buffer.from('{"message":"Test","userId":"Test"}');
        const channel = { name: 'test' };

        await expect(insertData(message, channel)).resolves.not.toThrow();
    });
});
