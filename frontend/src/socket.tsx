const socket = new WebSocket(import.meta.env.VITE_WSS_ADDR || 'wss://message-app.rennernet.com');

export default socket;
