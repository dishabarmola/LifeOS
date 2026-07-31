const BASE_URL = 'http://localhost:5000';

/**
 * Thin wrapper around fetch that automatically attaches the stored JWT
 * as an Authorization header for every request.
 */
const getToken = () => localStorage.getItem('lifeos_token');

async function request(method, path, body = null) {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        // Every protected route needs this header.
        // The protect middleware on the backend reads it and decodes the userId.
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${BASE_URL}${path}`, options);

    // Parse JSON regardless of status so callers get the error message too
    const data = await res.json();

    if (!res.ok) {
        const err = new Error(data.message || `Request failed with status ${res.status}`);
        err.status = res.status;
        err.data = data;
        throw err;
    }

    return data;
}

const api = {
    get:    (path)         => request('GET',    path),
    post:   (path, body)   => request('POST',   path, body),
    put:    (path, body)   => request('PUT',    path, body),
    patch:  (path, body)   => request('PATCH',  path, body),
    delete: (path)         => request('DELETE', path),
};

export default api;
