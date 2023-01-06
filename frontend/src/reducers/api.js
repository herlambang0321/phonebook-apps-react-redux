const users = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            return action.users.map(user => ({
                id: user.id,
                name: user.name,
                phone: user.phone,
                sent: true

            }))
        case 'ADD_USER':
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone,
                    sent: true
                }
            ]
        case 'REMOVE_USER_SUCCESS':
            return state.filter(user => user.id !== action.id)
        case 'REMOVE_USER_FAILURE':
        case 'LOAD_USER_FAILURE':
        default:
            return state
    }
}

export default users