import { useState } from 'react';

function MessageForm({ sendMessage }: { sendMessage: (message: string) => void }) {
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
