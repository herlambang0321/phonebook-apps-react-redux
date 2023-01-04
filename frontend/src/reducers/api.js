const users = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_USER_SUCCESS':
            return action.data.map(item => ({
                id: item.id,
                name: item.name,
                phone: item.phone,
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
        case 'LOAD_USER_FAILURE':
        default:
            return state
    }
}

export default users