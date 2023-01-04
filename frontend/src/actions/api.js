import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

export const loadUserSuccess = (data) => ({
    type: 'LOAD_USER_SUCCESS',
    data
})

export const loadUserFailure = () => ({
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

export const addUser = (name, phone) => ({
    type: 'ADD_USER',
    name,
    phone
})
