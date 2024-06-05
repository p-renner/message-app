import * as dotenv from 'dotenv';
import { Db } from 'mongodb';
import { Database } from 'sqlite';
import { default as initMongoDb } from './mongodb.js';
import { default as initSqliteDb } from './sqlite.js';

dotenv.config();
const dbType = process.env.DB_TYPE;

async function initDb(dbType: string | undefined): Promise<Db | Database> {
    if (dbType === 'mongodb') {
        return initMongoDb();
    }

    return initSqliteDb();
}

export const db = await initDb(dbType);
