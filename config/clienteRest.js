async function consulta(method, body, url, headers = {}) {
    const config =
        {
            method,
            body:JSON.stringify(body),
            headers: {
                ...headers,
                'content-Type': 'application/json',
                'x-sicu': 'ffffffffffffffffffffffffffffffff',
                'x-id-interaccion': 'E7B66B18-E8FF-480B-BA3B-860F84E72354',
                'x-token-usuario': 'E7B66B18',
            }

        }
    return await fetch(url, config);

}

module.exports = {
    consulta
};
