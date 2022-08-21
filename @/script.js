async function load(id) {
    return (await fetch(`${window.location.origin}/@/data/${id}`)).text();
}

function processMarkdown(text = '') {
    const result = {};
    const pattern = /^\-{3}\n*(([A-Za-z\-]+:\s?.*\n*)*)\-{3}\n*([\S\s]*)$/;
    const matches = text.match(pattern) || [];
    result.contents = new showdown.Converter().makeHtml(matches[3] || '');
    const metaDataPattern = /([A-Za-z\-]+):\s?(.*)/g;
    for (const match of (matches[1] || '').matchAll(metaDataPattern)) {
        result[match[1]] = match[2];
    }
    return result;
}

async function main() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    window.history.pushState({}, null, `${window.location.origin}/${id}`);
    try {
        const { title, author, date, contents } = processMarkdown(await load(id) || '');
        window.document.title = title;
        document.getElementById('title').innerText = title;
        document.getElementById('author').innerText = author;
        document.getElementById('date').innerText = date;
        document.getElementById('contents').innerHTML = contents;
    } catch (err) {
        window.document.title = 'Whoops!';
        document.getElementById('error') = 'Something went wrong.';
    }
    updateHeader(window.document.title);
}

main().catch(console.log);