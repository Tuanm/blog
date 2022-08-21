async function load(id) {
    return (await fetch(`${window.location.origin}/@/data/${id}`)).json();
}

function processText(text) {
    const p = document.createElement('p');
    p.innerHTML = linkify(text);
    return p;
}

function processImage(url, title) {
    const img = document.createElement('img');
    img.src = url;
    img.title = title;
    return img;
}

function process(content = '') {
    const contentType = typeof content;
    if (contentType === 'object') {
        const { type, title, url } = content;
        if (type === 'image') return processImage(url, title);
    }
    return processText(content);
}

async function main() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    window.history.pushState({}, null, `${window.location.origin}/${id}`);
    let title = '';
    try {
        const data = await load(id) || {};
        title = data.title;
        document.getElementById('date').innerText = data.date;
        const container = document.getElementById('container');
        for (const content of data.contents || []) {
            container.appendChild(process(content));
        }
    } catch (err) {
        title = 'Whoops!';
    }
    document.getElementById('title').innerText = window.document.title = title;
    updateHeader(title);
}

main().catch(console.log);