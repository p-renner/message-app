import './index.css';
import UserForm from './UserForm';
import MessageForm from './MessageForm';
import Messages from './Messages';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Socket from './socket';
import Error from './Error';

function App() {
    const [userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);
    const [messages, setMessages] = useState<SharedTypes.Message[]>([]);
    const [errors, setErrors] = useState<Error[]>([]);
    const [socket] = useState<Socket>(() => new Socket(setMessages));

    useEffect(() => {
        errors.forEach((error) => {
            setTimeout(() => {
                setErrors((errors) => errors.filter((e) => e !== error));
            }, 3000);
        });
    }, [errors]);

    if (!userId) {
        return <UserForm setUserId={setUserId} />;
    }

    function sendMessage(message: string, userId: string) {
        try {
            socket.sendMessage(message, userId);
        } catch (error) {
            setErrors((errors) => [...errors, error as Error]);
        }
    }

    return (
        <div id="container" className="relative flex flex-col text-center p-4 text-white max-h-dvh">
            <h1 className="text-2xl md:text-4xl">Message App</h1>

            <Messages messages={messages} />
            <MessageForm sendMessage={(message) => sendMessage(message, userId)} />
            <Error errors={errors} />
        </div>
    );
}

export default App;
