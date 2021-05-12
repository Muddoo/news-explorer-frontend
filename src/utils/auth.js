// const BASE_URL = 'https://register.nomoreparties.co'
// const BASE_URL = 'http://localhost:3001'
const BASE_URL = 'https://obscure-island-11341.herokuapp.com'

export const register = (password, email, name) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email, name })
    })
    .then(res => res.json())
    .then(res => res.data || Promise.reject(res))
};
export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then(res => res.json())
    .then(res => res.token || Promise.reject(res))
};
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(res => res.data || Promise.reject(res))
}