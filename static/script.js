let header = document.createElement('header');
let goBack = document.createElement('a');
let goTop = document.createElement('span');

function sourceUrl() {
    const urlKey = 'source:url';
    const get = () => {
        return localStorage.getItem(urlKey);
    };
    const set = (url = '') => {
        localStorage.setItem(urlKey, url);
    };
    return {
        get,
        set,
    };
}

function scrollToTop() {
    window.document.body.scrollTo({ top: 0 });
}

function updateVisibilities() {
    if (window.document.body.scrollTop > 0) {
        header.style.display = goTop.style.display = 'inherit';
        goBack.style.display = 'none';
    } else {
        header.style.display = goTop.style.display = 'none';
        goBack.style.display = 'inherit';
    }
    if (!header.childElementCount) {
        header.style.display = 'none';
    }
}

function updateHeader(text = '') {
    header.childNodes.forEach(header.removeChild);
    if (text) {
        const span = document.createElement('span');
        span.innerText = text;
        header.appendChild(span);
    }
}

window.onload = () => {
    const homePath = '/';
    goBack.classList.add('go-back');
    goBack.classList.add('unselectable');
    goBack.innerHTML = '&#129044;'; // Leftwards Arrow
    goBack.href = homePath;
    if (window.location.pathname !== homePath) {
        document.body.appendChild(goBack);
    }
    goTop.classList.add('go-top');
    goTop.classList.add('unselectable');
    goTop.innerHTML = '&#129045;'; // Upwards Arrow
    goTop.onclick = scrollToTop;
    header.classList.add('unselectable');
    document.body.appendChild(goTop);
    document.body.appendChild(header);
    window.onscroll = updateVisibilities;
    updateVisibilities();
};