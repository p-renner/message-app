import Cookies from 'js-cookie';
import Socket from './socket';
import { useState } from 'react';

function sendMessage(message: string) {
    if (!Socket || Socket.readyState !== 1) {
        // addError(container, 'Not connected to server');
        return;
    }

    if (!message || message === '') {
        // addError(container, 'Please enter a message');
        return;
    }

    Socket.send(JSON.stringify({ userId: Cookies.get('userId'), message } as SharedTypes.Message));
}

function MessageForm() {
    const [message, setMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    return (
        <form id="form" className="flex justify-center space-x-4" onSubmit={handleSubmit}>
            <input className="border-2 border-black bg-gray-800" type="text" value={message} onChange={handleChange} />
            <button id="send" type="submit">
                Send
            </button>
        </form>
    );
}

export default MessageForm;
