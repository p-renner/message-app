import '@/index.css';
import UserForm from '@/components/UserForm';
import Cookies from 'js-cookie';
import { useState } from 'react';
import Channel from '@/components/Channel';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
    const [userId, setUserId] = useState<string | null>(Cookies.get('userId') || null);

    return (
        <ThemeProvider>
            <div id="container" className="relative flex flex-col text-center p-4 h-dvh max-w-2xl mx-auto">
                <h1 className="text-2xl md:text-4xl mb-4">Message App</h1>

                {userId ? <Channel userId={userId} /> : <UserForm setUserId={setUserId} />}
            </div>
        </ThemeProvider>
    );
}

export default App;
