let header = document.createElement('header');
let footer = document.createElement('footer');

function scrollToTop() {
    window.document.body.scrollTo({ top: 0 });
}

function updateHeaderAndFooter() {
    if (window.document.body.scrollTop > 0) {
        header.style.display = footer.style.display = 'inherit';
    } else {
        header.style.display = footer.style.display = 'none';
    }
}

function updateHeader(text = '') {
    const span = document.createElement('span');
    span.innerText = text;
    header.childNodes.forEach(header.removeChild);
    header.appendChild(span);
}

window.onload = () => {
    footer.innerHTML = '&#129045;'; // Upwards Arrow
    footer.onclick = scrollToTop;
    document.body.appendChild(header);
    document.body.appendChild(footer);
    window.onscroll = updateHeaderAndFooter;
    updateHeaderAndFooter();
};