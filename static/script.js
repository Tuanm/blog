/**
 * The header component, visible only when the user
 * scrolls down, also containing the title of a post.
 */
let header = document.createElement('header');
/**
 * An component that allows user to go back to the home page.
 */
let goBack = document.createElement('a');
/**
 * This component is only visible when the user
 * scrolls down, allowing him to go to the top of the page.
 */
let goTop = document.createElement('span');

/**
 * Allows user to modify the website's data source.
 */
function sourceUrl() {
    const urlKey = 'source:url';
    /**
     * Returns the current data source.
     */
    const get = () => {
        return localStorage.getItem(urlKey);
    };
    /**
     * Updates new data source.
     * @param {String} url the URL of the new data source
     */
    const set = (url = '') => {
        localStorage.setItem(urlKey, url);
    };
    return {
        get,
        set,
    };
}

/**
 * Scrolls the document to the top.
 */
function scrollToTop() {
    window.document.body.scrollTo({ top: 0 });
}

/**
 * Updates the header and go-back component' visibilities
 * based on scroll state.
 */
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

/**
 * Updates the header.
 * @param {String} text the title of new header
 */
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