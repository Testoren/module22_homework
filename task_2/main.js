const button = document.querySelector('.btn');


const btnIconArrow = document.querySelector('.bi-arrow-down-left-circle');
const btnIconArrowFill = document.querySelector('.bi-arrow-down-left-circle-fill');

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

const stat = document.querySelector('.answer');

const error = () => {
    stat.textContent = 'Невозможно получить ваше местоположение';
  }

const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    stat.textContent = `Широта: ${latitude}°, Долгота: ${longitude}°`;
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
