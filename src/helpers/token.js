export const getToken = () => {
    const token = localStorage.getItem('jwt');

    return token;
}

export const setToken = (token) => {
    localStorage.setItem('jwt', token);
}

export const getId = () => {
    const id = localStorage.getItem('user-id');

    return id;
}
