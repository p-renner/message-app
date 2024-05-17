import Cookies from 'js-cookie';

const socket = new WebSocket(import.meta.env.VITE_WSS_ADDR || 'wss://message-app.rennernet.com');
const userId = Cookies.get('userId');

socket.addEventListener('open', () => {
    socket.send('get');
});

socket.addEventListener('message', (event) => {
    const container = document.querySelector<HTMLDivElement>('#messages')!;

    if (!container) {
        return;
    }

    container.innerHTML = formatMessage(JSON.parse(event.data));
});

export function sendMessage(input: HTMLInputElement, button: HTMLButtonElement) {
    button.addEventListener('click', () => {
        if (!input.value) {
            return;
        }

        socket.send(JSON.stringify({ userId, message: input.value }));
        input.value = '';
    });
}

function formatMessage(messages: { userId: string; message: string }[]) {
    return messages.map(({ userId, message }) => userId + ': ' + message).join('<br>');
}
