import './index.css';
import UserForm from './UserForm';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Channel from './Channel';

function App() {
    const [userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);

    if (!userId) {
        return <UserForm setUserId={setUserId} />;
    }

    return (
        <div id="container" className="relative flex flex-col text-center p-4 h-dvh max-w-2xl mx-auto">
            <h1 className="text-2xl md:text-4xl">Message App</h1>

            <Channel userId={userId} />
        </div>
    );
}

export default App;
