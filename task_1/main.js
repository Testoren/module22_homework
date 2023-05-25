const iconFill = () => {
    const btnIconArrow = document.querySelector('.bi-arrow-down-left-circle');
    const btnIconArrowFill = document.querySelector('.bi-arrow-down-left-circle-fill');

    if(btnIconArrow.classList.contains('hide')){
        btnIconArrow.classList.remove('hide');
        btnIconArrowFill.classList.remove('visible')
    } else {
        btnIconArrow.classList.add('hide');
        btnIconArrowFill.classList.add('visible')
    }
}

const button = document.querySelector('.btn');

button.addEventListener('click', iconFill);