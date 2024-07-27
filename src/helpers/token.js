export const getToken = () => {
    const token = localStorage.getItem('jwt');

    return token;
}

export const setToken = (token) => {
    localStorage.setItem('jwt', token);
}