import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

const loadUserSuccess = (users) => ({
    type: 'LOAD_USER_SUCCESS',
    users
})

const loadUserFailure = () => ({
    type: 'LOAD_USER_FAILURE'
})

export const loadUser = () => {
    return async (dispatch) => {
        try {
            const { data } = await request.get('/phonebooks');
            dispatch(loadUserSuccess(data.data.rows))
        } catch (err) {
            dispatch(loadUserFailure(err))
        }
    }
}

export const addUserSuccess = (user) => ({
    type: 'ADD_USER_SUCCESS',
    user
})

export const addUserFailure = () => ({
    type: 'ADD_USER_FAILURE'
})

export const addUserRedux = (name, phone) => ({
    type: 'ADD_USER',
    name,
    phone
})

export const addUser = (name, phone) => {
    return async (dispatch) => {
        dispatch(addUserRedux(name, phone))
        try {
            const { data } = await request.post('/phonebooks', { name, phone });
            dispatch(addUserSuccess(data.data.rows))
        } catch (err) {
            dispatch(addUserFailure(err))
        }
    }
}