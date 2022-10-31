let user
if (typeof window !== 'undefined') {
  const userStorage = localStorage.getItem("user")
  if (userStorage) user = JSON.parse(userStorage)
}
const initialState = user 
    ? { 
        ...user,
        isLogged: true
    } 
    : {
        isLogged: false,
        username: '',
        email: '',
        bookmarks: []
    }

const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case 'LOGIN':
            localStorage.setItem('jtw', JSON.stringify(payload.accessToken))
            localStorage.setItem('user', JSON.stringify(payload))
            return {
                ...state,
                isLogged: true,
                username: payload.username,
                email: payload.email,
                bookmarks: payload.bookmarks
            }
        case 'LOGOUT':
            localStorage.removeItem('jtw')
            localStorage.removeItem('user')
            return {
                isLogged: false,
                username: ''
            }
        case 'ADD_BOOKMARK':
            let add = [...state.bookmarks]
            add.push(payload)
            localStorage.setItem('user', JSON.stringify({...state, bookmarks: add }))
            return {
                ...state,
                bookmarks: add
            }
        case 'REMOVE_BOOKMARK':
            let remove = [...state.bookmarks]
            remove.splice(remove.indexOf(payload), 1)
            localStorage.setItem('user', JSON.stringify({...state, bookmarks: remove }))
            return {
                ...state,
                bookmarks: remove
            }
        case 'UPDATE_USER':
            localStorage.setItem('user', JSON.stringify({...state, ...payload }))
            return {
                ...state,
                ...payload
              }
        default:
            return state
    }
}

export default userReducer