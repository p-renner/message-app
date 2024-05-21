import Cookies from 'js-cookie';
import { useState } from 'react';

function UserForm({ setUserId }: { setUserId: (userId: string) => void }) {
    const [name, setName] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        Cookies.set('userId', name, { expires: 7 });
        setUserId(name);
    }

    return (
        <div className="text-center space-y-8 p-4 text-white">
            <h1 className="text-2xl md:text-4xl">Enter your name</h1>

            <form id="form" className="flex justify-center space-x-4" onSubmit={handleSubmit}>
                <input className="border-2 border-black bg-gray-800" type="text" onChange={handleChange} />
                <button id="send" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
}

export default UserForm;
