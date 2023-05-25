const buttonCh = document.querySelector('.btn');
const geolocation = document.querySelector('.btn__geolocation')
const chat = document.querySelector('.location__input');
const userMessages = document.querySelector('.user-messages');
const textChat = document.querySelector('.location__chat')
const url = "wss://echo-ws-service.herokuapp.com";

let websocket = new WebSocket(url);

function sendChat (message, position = 'flex-end'){

    let locMessage = `<p class='location__message' style='align-self:${position}'>${message}</p>`;
    textChat.innerHTML += locMessage;

}

websocket.onopen = function (evt) {
	console.log("CONNECTED");
};
websocket.onmessage = function (evt) {
    sendChat(`Server: ${evt.data}`, 'flex-start')
};
websocket.onerror = function (evt) {
	sendChat(`Server: ${evt.data}`, 'flex-start');
};

const success = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    sendChat(`<a href="${link}" class="location__message"> Ваша гео-локация </a>`);
}

const error = () => {
    let error = `Не могу определить место положения`;
    sendChat(error);
}

buttonCh.addEventListener('click', () => {
    if(chat.value !== ''){
        message = chat.value;
        websocket.send(message);
        sendChat(message);
        chat.value = '';
    }
});

geolocation.addEventListener('click', () => {
    if(!navigator.geolocation){
        console.log(`Нет ответа от браузера`)
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }
})