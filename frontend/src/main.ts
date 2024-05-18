import './index.css';
import { sendMessage } from './message.ts';
import Cookies from 'js-cookie';

if (!Cookies.get('userId')) {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div class="text-center space-y-8 p-4 text-white">
      <h1 class="text-2xl md:text-4xl">Enter your name</h1>

      <input class="border-2 border-black bg-gray-800" type="text" id="name" />
      <button id="send" type="button">Send</button>
    </div>
  `;

    const nameInput = document.querySelector<HTMLInputElement>('#name')!;
    const sendButton = document.querySelector<HTMLButtonElement>('#send')!;

    sendButton.addEventListener('click', () => {
        Cookies.set('userId', nameInput.value);
        window.location.reload();
    });

    nameInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendButton.click();
        }
    });
} else {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="container" class="text-center p-4 text-white">
    <h1 class="text-2xl md:text-4xl">Message App</h1>

    <div id="messages" class="border-2 h-[80vh] w-full max-w-2xl mx-auto flex flex-col-reverse bg-gray-800 text-left px-4 py-2 my-4"></div>

    <input class="border-2 border-black bg-gray-800" type="text" id="message" />
    <button id="send" type="button">Send</button>
  </div>
`;
    sendMessage(
        document.querySelector<HTMLInputElement>('#message')!,
        document.querySelector<HTMLButtonElement>('#send')!,
        document.querySelector<HTMLDivElement>('#container')!,
    );

    document.querySelector<HTMLButtonElement>('#message')!.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.querySelector<HTMLButtonElement>('#send')!.click();
        }
    });
}
