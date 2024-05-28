import { IMessagesRepository } from './repositories/IMessagesRepository.js';
import { MessagesSqliteRepository } from './repositories/messagesSqlite.js';
import db from './sqlite.js';

function getMessagesRepository(): IMessagesRepository {
    const dbType = process.env['DB_TYPE'];

    if (dbType === 'mongodb') {
        // TODO: Implement MongoDB repository
        console.error('MongoDB not implemented yet');
        process.exit(1);
    }

    return new MessagesSqliteRepository(db);
}

export default getMessagesRepository();
