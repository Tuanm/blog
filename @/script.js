/**
 * Returns a Markdown-to-HTML converter
 * with some pre-configurations.
 */
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

/**
 * Gets a randomized markdown document.
 */
async function randomize() {
    const url = 'https://jaspervdj.be/lorem-markdownum/markdown.txt';
    return (await fetch(url)).text();
}

/**
 * Retrieves raw contents of a post from the data source.
 * @param {any} id the post's id.
 */
async function load(id) {
    if (!id || id === 404) return '';
    const url = sourceUrl().get() || `${window.location.origin}/data`;
    return (await fetch(`${url}/${id}`, {
        headers: {
            'Content-Type': 'text/plain',
        },
    })).text();
}

/**
 * Retrieves the metadata and contents of a post from its raw contents.
 * @param {String} text the raw contents
 */
function process(text = '') {
    const result = {};
    const pattern = /^<!\-{2}\n*(([A-Za-z\-]+:\s?.*\n*)*)\-{2}>\n*([\S\s]*)$/;
    const matches = text.match(pattern) || [];
    const contents = converter().makeHtml(matches[3] || '');
    if (!contents) return;
    const metaDataPattern = /([A-Za-z\-]+):\s?(.*)/g;
    for (const match of (matches[1] || '').matchAll(metaDataPattern)) {
        result[match[1]] = match[2];
    }
    return {
        ...result,
        contents,
    };
}

/**
 * This function will be called when the page has been loaded.
 */
async function main() {
    const { id } = Object.fromEntries(new URLSearchParams(window.location.search));
    const processNotFound = async () => {
        return {
            ...process('<!--\ntitle: 404\nauthor: 404\ndate: 2018/02/31 28:69\n-->\n'
                + await randomize()),
            path: '404',
        };
    };
    const { title, author, date, contents, path } = process(await load(id)) || await processNotFound();
    window.document.title = title;
    window.history.pushState({}, null, `/${path || id}`);
    document.getElementById('title').innerText = title;
    document.getElementById('author').innerText = author;
    document.getElementById('date').innerText = date;
    document.getElementById('contents').innerHTML = contents;
    updateHeader(window.document.title);
}

/**
 * Shows some information of an occured error.
 * @param {Error} err the error
 */
function handleError(err = {
    message: '',
}) {
    console.log('Whoops!', err);
    window.document.title = 'Whoops!';
    updateHeader(window.document.title);
}

main().catch(handleError);