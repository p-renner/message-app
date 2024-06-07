import app from './app.js';
import db from './db.js';
const port = 8000;

await db.connect(process.env.DB_TYPE);

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function gracefulShutdown() {
    console.log('Received kill signal, shutting down gracefully');
    db.close().then(() => {
        console.log('Closed out database connections');
        server.close(() => {
            console.log('Closed out remaining connections');
            process.exit(0);
        });
    });
}

process.on('SIGTERM', () => {
    gracefulShutdown();
});

process.on('SIGINT', () => {
    gracefulShutdown();
});
