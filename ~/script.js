async function load(id) {
    return (await fetch(`${window.location.origin}/~/@/${id}`)).json();
}

function process(text = '') {
    const p = document.createElement('p');
    p.innerText = text;
    return p;
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