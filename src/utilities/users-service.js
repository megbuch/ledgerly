import * as usersAPI from './users-api'

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export async function login(userData) {
    const token = await usersAPI.login(userData)
    localStorage.setItem('token', token)
    return getUser()
}

export function getToken() {
    const token = localStorage.getItem('token')
    if(!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
        return null
    }
    return token
}

export function getUser() {
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function logOut() {
    localStorage.removeItem('token')
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
}