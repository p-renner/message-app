import Messages from './Messages';
import MessageForm from './MessageForm';
import Socket from './socket';
import { useState } from 'react';

interface MessageComponentProps {
    userId: string;
    sendNotification: (notifications: string) => void;
}

function MessageComponent({ userId, sendNotification }: MessageComponentProps) {
    const [messages, setMessages] = useState<SharedTypes.Message[]>([]);
    const [socket] = useState<Socket>(() => new Socket(setMessages));

    function onSend(message: string) {
        if (!userId) {
            sendNotification('You must be logged in to send messages.');
            return;
        }

        try {
            socket.sendMessage(message, userId);
        } catch (error) {
            sendNotification((error as Error).message);
        }
    }

    return (
        <>
            <Messages messages={messages} />
            <MessageForm onSend={onSend} />
        </>
    );
}

export default MessageComponent;
