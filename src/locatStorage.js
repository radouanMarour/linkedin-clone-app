export const setData = (data) => {
    localStorage.setItem('state', JSON.stringify(data));
}

export const getData = () => {
    return JSON.parse(localStorage.getItem('state')) || {
        user: null,
        error: null
    };
}
