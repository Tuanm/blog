let header = document.createElement('header');
let goBack = document.createElement('a');
let goTop = document.createElement('span');

function scrollToTop() {
    window.document.body.scrollTo({ top: 0 });
}

function updateVisibilities() {
    if (window.document.body.scrollTop > 0) {
        header.style.display = goTop.style.display = 'inherit';
    } else {
        header.style.display = goTop.style.display = 'none';
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
    goBack.className = 'go-back';
    goBack.innerHTML = '&#129044;'; // Leftwards Arrow
    goBack.href = '/';
    goTop.className = 'go-top';
    goTop.innerHTML = '&#129045;'; // Upwards Arrow
    goTop.onclick = scrollToTop;
    document.body.appendChild(goBack);
    document.body.appendChild(goTop);
    document.body.appendChild(header);
    window.onscroll = updateVisibilities;
    updateVisibilities();
};