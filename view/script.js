async function load(id) {
    return (await fetch(`${window.location.origin}/data/${id}.json`)).json();
}

function process(text = '') {
    const p = document.createElement('p');
    p.innerText = text;
    return p;
}

async function main() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    window.history.pushState({}, null, `${window.location.origin}/${id}`);
    try {
        const {
            title,
            date,
            contents,
        } = await load(id);
        document.getElementById('title').innerText = title;
        document.getElementById('date').innerText = date;
        const container = document.getElementById('container');
        for (const content of contents || []) {
            container.appendChild(process(content));
        }
        window.document.title = title;
        updateHeader(title);
    } catch (err) {
        document.getElementById('error').innerText = 'Whoops! Something went wrong!';
        throw err;
    }
}

main().catch((err) => {
    console.log(`Whoops! Message: ${err?.message}`);
});