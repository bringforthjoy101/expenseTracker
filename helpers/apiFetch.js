const fetch = require('node-fetch');

async function apiFetch (req, res, url) {
    
    const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {
            cookie: req.headers.cookie,
        }
    });
    
    return response.json();
}

module.exports = apiFetch;