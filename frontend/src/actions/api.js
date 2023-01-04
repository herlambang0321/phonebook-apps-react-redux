export const loadUser = () => ({
    type: 'LOAD_USER'
})

export const addUser = (name, phone) => ({
    type: 'ADD_USER',
    name,
    phone
})
