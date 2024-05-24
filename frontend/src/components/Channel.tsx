import Messages from '@/components/Messages';
import MessageForm from '@/components/MessageForm';
import Socket from '@/lib/socket';
import { useState } from 'react';

interface ChannelProps {
    userId: string;
}

function Channel({ userId }: ChannelProps) {
    const [messages, setMessages] = useState<SharedTypes.Message[]>([]);
    const [socket] = useState<Socket>(
        () => new Socket(import.meta.env.VITE_WSS_ADDR || 'wss://message-app.rennernet.com', setMessages),
    );

    function onSend(message: string) {
        const wsMessage: SharedTypes.WSMessage = { userId, message };
        socket.sendMessage(wsMessage);
    }

    return (
        <>
            <Messages messages={messages} />
            <MessageForm onSend={onSend} />
        </>
    );
}

export default Channel;
