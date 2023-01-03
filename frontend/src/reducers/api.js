const users = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_USER':
            return []
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
        default:
            return state
    }
}

export default users