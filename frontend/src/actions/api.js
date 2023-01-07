import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

const loadUserSuccess = (users, page, totalPage) => ({
    type: 'LOAD_USER_SUCCESS',
    users,
    page,
    totalPage
})

const loadUserFailure = () => ({
    type: 'LOAD_USER_FAILURE'
})

export const loadUser = () => {
    return async (dispatch) => {
        try {
            const { data } = await request.get('/phonebooks');
            dispatch(loadUserSuccess(data.data.rows, data.data.page, data.data.totalPage))
        } catch (err) {
            dispatch(loadUserFailure(err))
        }
    }
}

const addUserSuccess = (id, user) => ({
    type: 'ADD_USER_SUCCESS',
    id,
    user
})

const addUserFailure = (id) => ({
    type: 'ADD_USER_FAILURE',
    id
})

const addUserRedux = (id, name, phone) => ({
    type: 'ADD_USER',
    id,
    name,
    phone
})

export const addUser = (name, phone) => {
    const id = Date.now()
    return async (dispatch) => {
        dispatch(addUserRedux(id, name, phone))
        try {
            const { data } = await request.post('/phonebooks', { name, phone });
            dispatch(addUserSuccess(id, data.data))
        } catch (err) {
            dispatch(addUserFailure(id))
        }
    }
}

const removeUserSuccess = (id) => ({
    type: 'REMOVE_USER_SUCCESS',
    id
})

const removeUserFailure = () => ({
    type: 'REMOVE_USER_FAILURE'
})

export const removeUser = (id) => {
    return async (dispatch) => {
        try {
            await request.delete(`/phonebooks/${id}`);
            dispatch(removeUserSuccess(id))
        } catch (err) {
            dispatch(removeUserFailure(err))
        }
    }
}

const resendUserSuccess = (id, user) => ({
    type: 'RESEND_USER_SUCCESS',
    id,
    user
})

const resendUserFailure = () => ({
    type: 'RESEND_USER_FAILURE'
})

export const resendUser = (id, name, phone) => {
    return async (dispatch) => {
        try {
            const { data } = await request.post('/phonebooks', { name, phone });
            dispatch(resendUserSuccess(id, data.data))
        } catch (err) {
            dispatch(resendUserFailure(err))
        }
    }
}