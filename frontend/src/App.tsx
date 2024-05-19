import './index.css';
import UserForm from './UserForm';
import MessageForm from './MessageForm';
import Messages from './Messages';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Socket from './socket';

function App() {
    if (!Cookies.get('userId')) {
        return <UserForm />;
    }

    const [messages, setMessages] = useState<SharedTypes.Message[]>([]);

    Socket.addEventListener('message', (event) => {
        setMessages(JSON.parse(event.data) as SharedTypes.Message[]);
    });

    return (
        <div id="container" className="text-center p-4 text-white">
            <h1 className="text-2xl md:text-4xl">Message App</h1>

            <Messages messages={messages} />
            <MessageForm />
        </div>
    );
}

export default App;
