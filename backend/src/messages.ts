import { db } from './db.js';

await db
    .run(
        'CREATE TABLE IF NOT EXISTS messages (userId TEXT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)',
    )
    .catch((err) => {
        if (err) {
            console.error('Error creating table: ', err.message);
            process.exit(1);
        }
    });

export const getMessages = () =>
    db.all<SharedTypes.Message[]>('SELECT * FROM messages LIMIT 50').catch((err) => {
        if (err) {
            console.error(err.message);
        }
    });

export const insertMessage = (message: SharedTypes.Message) => {
    if (!message.userId || !message.message) {
        console.error('Invalid message:', message);
        return;
    }

    if (!message.timestamp) {
        message.timestamp = new Date().toISOString();
    }

    db.run('INSERT INTO messages VALUES (?, ?, ?)', [message.userId, message.message, message.timestamp]).catch(
        (err) => {
            if (err) {
                console.error(err.message);
            }
        },
    );
};
