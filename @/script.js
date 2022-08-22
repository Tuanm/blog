function converter() {
    const instance = new showdown.Converter();
    instance.setOption('customizedHeaderId', true);
    instance.setOption('parseImgDimensions', true);
    instance.setOption('simplifiedAutoLink', true);
    instance.setOption('tables', true);
    instance.setOption('tasklists', true);
    instance.setOption('openLinksInNewWindow', true);
    return instance;
}

async function load(id) {
    const url = sourceUrl().get() || `${window.location.origin}/@/data`;
    return (await fetch(`${url}/${id}`, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })).text();
}

function process(text = '') {
    const result = {};
    const pattern = /^<!\-{2}\n*(([A-Za-z\-]+:\s?.*\n*)*)\-{2}>\n*([\S\s]*)$/;
    const matches = text.match(pattern) || [];
    result.contents = converter().makeHtml(matches[3] || '');
    const metaDataPattern = /([A-Za-z\-]+):\s?(.*)/g;
    for (const match of (matches[1] || '').matchAll(metaDataPattern)) {
        result[match[1]] = match[2];
    }
    return result;
}

async function main() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    window.history.pushState({}, null, `${window.location.origin}/${id}`);
    if (!id) throw new Error('Not found!');
    const { title, author, date, contents } = process(await load(id) || '');
    window.document.title = title;
    document.getElementById('title').innerText = title;
    document.getElementById('author').innerText = author;
    document.getElementById('date').innerText = date;
    document.getElementById('contents').innerHTML = contents;
    updateHeader(window.document.title);
}

function handleError(err = {
    message: '',
}) {
    console.log('Whoops!', err.message);
    window.document.title = 'Whoops!';
    document.getElementById('error').innerText = 'Something went wrong.';
    updateHeader(window.document.title);
}

main().catch(handleError);