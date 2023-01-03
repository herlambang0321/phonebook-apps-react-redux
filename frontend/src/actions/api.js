export const loadUser = () => ({
    type: 'LOAD_USER'
})

export const addUser = (id, name, phone) => ({
    type: 'ADD_USER',
    id,
    name,
    phone
})
