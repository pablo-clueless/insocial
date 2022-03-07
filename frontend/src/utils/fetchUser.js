export const fetchUser = () => {
    const userData = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

    return userData
}