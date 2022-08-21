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
    const homePath = '/';
    goBack.className = 'go-back';
    goBack.innerHTML = '&#129044;'; // Leftwards Arrow
    goBack.href = homePath;
    if (window.location.pathname !== homePath) {
        document.body.appendChild(goBack);
    }
    goTop.className = 'go-top';
    goTop.innerHTML = '&#129045;'; // Upwards Arrow
    goTop.onclick = scrollToTop;
    document.body.appendChild(goTop);
    document.body.appendChild(header);
    window.onscroll = updateVisibilities;
    updateVisibilities();
};

function linkify(inputText) {
    let replacedText, replacePattern1, replacePattern2, replacePattern3;

    // URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    // Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}