import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const db = await open({ driver: sqlite3.Database, filename: 'db/chat.db' });
