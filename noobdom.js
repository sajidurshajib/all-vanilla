let title = 'Vanilla Profile';
// gituhub username
let username = 'sajidurshajib';
// color
let maroon = '#b32f2f';
let lightMaroon = '#c44';
let black = '#333';
let grey = '#808080';
let white = '#fff';

window.onload = async function () {
    document.title = title;

    let data = {};
    await apiFetch(username).then((me) => (data = me));

    console.log(data);

    bodyStyle({
        margin: '0',
        background: maroon,
        fontFamily:
            'Bangla675, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji',
    });

    createNode('#root', 'div', '', ['wrapper'], {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '100px 0 0 0',
    });

    createNode('.wrapper', 'div', '', ['profilePic'], {
        width: '200px',
        height: '200px',
        background: `url(${data.avatar_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '200px',
        border: `4px solid ${lightMaroon}`,
    });

    createNode('.wrapper', 'h1', data.name, ['hello', 'world'], { color: white, margin: '20px 0 0 0' });
    createNode('.wrapper', 'a', `github.com/${data.login}`, ['username'], {
        color: white,
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '16px',
        margin: '10px 0 0 0',
    });
    hrefAdded('.username', `https://github.com/${data.login}`);

    createNode('.wrapper', 'p', data.bio, ['bio'], {
        border: `1px solid ${lightMaroon}`,
        padding: '15px',
        color: white,
        minWidth: '100px',
        maxWidth: '400px',
        borderRadius: '2px',
        textAlign: 'center',
    });

    createNode('.wrapper', 'div', '', ['myLink'], {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '20px',
    });

    createNode('.myLink', 'a', `all repositories: ${data.public_repos}`, ['repo'], {
        color: white,
        background: lightMaroon,
        borderRadius: '50px',
        padding: '5px 15px',
        textDecoration: 'none',
    });
    hrefAdded('.repo', `https://github.com/${data.login}`);

    createNode('.myLink', 'a', `twitter.com/${data.twitter_username}`, ['twitter'], {
        color: white,
        background: lightMaroon,
        borderRadius: '50px',
        padding: '5px 15px',
        textDecoration: 'none',
    });
    hrefAdded('.twitter', `https://twitter.com/${data.twitter_username}`);
};

// API Fetch Function

async function apiFetch(username) {
    let userFetch = await fetch(`https://api.github.com/users/${username}`);

    if (userFetch.ok) {
        let userJson = await userFetch.json();
        return userJson;
    }
}

// Body Style

function bodyStyle(styles = {}) {
    Object.assign(document.querySelector('body').style, styles);
}

// Create Node Function

function createNode(parent = '#root', node, text = '', classNames = [], styles = {}) {
    const elm = document.createElement(node);

    if (text.length !== 0) {
        const txt = document.createTextNode(text);
        elm.appendChild(txt);
    }

    document.querySelector(parent).appendChild(elm);

    if (classNames.length !== 0) {
        elm.classList.add(...classNames);
        Object.assign(document.querySelector(`.${classNames[0]}`).style, styles);
    }
}

// Create href

function hrefAdded(select, hrf) {
    document.querySelector(select).href = hrf;
    document.querySelector(select).target = '_blank';
}
