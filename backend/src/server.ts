import cors from 'cors';
import channelRouter from './routes/channel.routes.js';
import wsRouter, { wsInstance } from './routes/ws.routes.js';

const app = wsInstance.app;
const port: number = 8000;

app.use(cors());
app.use('/api/channels', channelRouter);
app.use('/ws', wsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
