const button = document.querySelector('.btn');
const btnIconArrow = document.querySelector('.bi-arrow-down-left-circle');
const btnIconArrowFill = document.querySelector('.bi-arrow-down-left-circle-fill');
const stat = document.querySelector('.answer');

const mouseDown = () => {
    btnIconArrow.classList.add('hide');
    btnIconArrowFill.classList.add('visible')
}

const mouseUp = () => {
    btnIconArrow.classList.remove('hide');
    btnIconArrowFill.classList.remove('visible')
}

button.addEventListener('mousedown', mouseDown);
button.addEventListener('mouseup', mouseUp);

let xhr = new XMLHttpRequest();

const error = () => {
    stat.textContent = 'Невозможно получить ваше местоположение';
  }

const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    let respons = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;
    request(respons);
}

const request = (link) => {
    xhr.open('GET', link);
    xhr.send();
}

xhr.onload = () => {
    if(xhr.status != 200){
        alert(`${xhr.status}: ${xhr.statusText}`);
        stat.textContent = `${xhr.status}: ${xhr.statusText}`;
    } else {
        let data = JSON.parse(xhr.response);
        stat.textContent = `Временная зона, в которой находится пользователь: ${data.timezone}; Местные дата и время: ${data.date_time_txt};`
    }
}

button.addEventListener('click', () => {
    stat.textContent = '';

    if(!navigator.geolocation){
        stat.textContent = 'Информация о местоположении недоступна';
    } else {
        stat.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});
