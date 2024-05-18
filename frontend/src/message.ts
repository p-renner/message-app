import Cookies from 'js-cookie';

export function sendMessage(input: HTMLInputElement, button: HTMLButtonElement, container: HTMLDivElement) {
    button.addEventListener('click', () => {
        if (!socket || socket.readyState !== 1) {
            addError(container, 'Not connected to server');
            return;
        }

        if (!input.value) {
            addError(container, 'Please enter a message');
            return;
        }

        socket.send(JSON.stringify({ userId: Cookies.get('userId'), message: input.value } as SharedTypes.Message));
        input.value = '';
    });
}

const socket = new WebSocket(import.meta.env.VITE_WSS_ADDR || 'wss://message-app.rennernet.com');

socket.addEventListener('message', (event) => {
    const container = document.querySelector<HTMLDivElement>('#messages')!;

    if (!container) {
        return;
    }

    container.innerHTML = formatMessage(JSON.parse(event.data) as SharedTypes.Message[]);
});

function formatMessage(messages: SharedTypes.Message[]) {
    return messages.map(({ userId, message }) => userId + ': ' + message).join('<br>');
}

function addError(container: HTMLDivElement, message: string) {
    const error = document.createElement('div');
    error.classList.add('text-red-500');
    error.textContent = message;

    container.appendChild(error);

    setTimeout(() => {
        container.removeChild(error);
    }, 3000);
}
