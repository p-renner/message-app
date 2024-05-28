import Messages from '@/components/Messages';
import MessageForm from '@/components/MessageForm';
import Socket from '@/lib/socket';
import { useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface ChannelProps {
    userId: string;
}

function Channel({ userId }: ChannelProps) {
    const [messages, setMessages] = useState<SharedTypes.Message[]>([]);

    const [socket] = useState<Socket>(() => new Socket(getWebSocketUrl(), setMessages));
    const [connected, setConnected] = useState(socket.isConnected());

    socket.onConnect(() => setConnected(true));
    socket.onDisconnect(() => setConnected(false));

    function onSend(message: string) {
        const wsMessage: SharedTypes.WSMessage = { userId, message };
        socket.sendMessage(wsMessage);
    }

    return (
        <>
            <ScrollArea
                className="flex-1 h-full px-4 py-2 my-4 border-2 bg-gray-100 border-gray-200 rounded-md dark:bg-gray-800 dark:border-gray-700 text-left"
                role="feed"
            >
                {connected ? <Messages messages={messages} /> : <p>Connecting...</p>}
            </ScrollArea>
            <MessageForm onSend={onSend} disabled={!connected} />
        </>
    );
}

export default Channel;

function getWebSocketUrl() {
    const baseUrl = import.meta.env.VITE_WSS_ADDR || 'wss://message-app.rennernet.com';
    const path = new URLSearchParams(window.location.search).get('channel') || 'default';
    if (!/^[a-zA-Z0-9_-]+$/.test(path)) {
        throw new Error('Invalid channel name');
    }

    return baseUrl + '/' + path;
}
