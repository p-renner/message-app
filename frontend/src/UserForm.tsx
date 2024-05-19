import Cookies from 'js-cookie';

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
        name: { value: string };
    };

    Cookies.set('userId', formElements.name.value, { expires: 7 });
    window.location.reload();
}

function UserForm() {
    return (
        <div className="text-center space-y-8 p-4 text-white">
            <h1 className="text-2xl md:text-4xl">Enter your name</h1>

            <form id="form" className="flex justify-center space-x-4" onSubmit={handleSubmit}>
                <input className="border-2 border-black bg-gray-800" type="text" id="name" />
                <button id="send" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
}

export default UserForm;
