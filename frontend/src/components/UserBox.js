import React, { Component } from 'react'
import axios from 'axios'
import UserForm from "./UserForm";
import UserList from "./UserList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: { 'X-Custom-Header': 'foobar' }
});

export default class UserBox extends Component {
    constructor(props) {
        super(props)
        this.params = {}
        this.state = {
            users: [],
            showAdd: false,
        }
    }

    async componentDidMount() {
        this.loadUser()
    }

    loadUser = async () => {
        try {
            const { data } = await request.get('phonebooks', { params: this.params })
            if (data.success) {
                this.setState(state => ({
                    users: [...(this.params.page === 1 ? [] : state.users), ...data.data.rows.map(item => {
                        item.sent = true
                        return item
                    })]
                }))
                this.params.page = data.data.page
                this.params.totalPage = data.data.totalPage
            } else {
                alert('Failed get data')
            }
        } catch (error) {
            console.error(error)
        }
    }

    loadMore = () => {
        if (this.params.page <= this.params.totalPage) {
            this.params = { ...this.params, page: this.params.page + 1 }
        }
        this.loadUser()
    }

    hiddenAddUser = () => {
        this.setState({
            showAdd: false
        })
    }

    showAddUser = () => {
        this.setState({
            showAdd: true
        })
    }

    searchUser = (query) => {
        this.params = { ...this.params, ...query, page: 1 }
        this.loadUser()
    }

    addUser = async ({ name, phone }) => {
        const id = Date.now()
        this.setState((state) => {
            return {
                users: [
                    ...state.users,
                    {
                        id,
                        name,
                        phone,
                        sent: true
                    }
                ]
            };
        });
        try {
            const { data } = await request.post('phonebooks', { name, phone })
            if (data.success) {
                this.setState((state) => ({
                    users: state.users.map(item => {
                        if (item.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            } else {
                console.log(data.data)
            }
        } catch (error) {
            console.error(error)
            this.setState((state) => ({
                users: state.users.map(item => {
                    if (item.id === id) {
                        return { ...item, sent: false }
                    }
                    return item
                })
            }))
        }
    }

    updateUser = async (id, name, phone) => {
        try {
            const { data } = await request.put(`phonebooks/${id}`, { name, phone })
            if (data.success) {
                this.setState((state) => ({
                    users: state.users.map(item => {
                        if (item.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            } else {
                console.log(data.data)
            }
        } catch (err) {
            alert('Failed to update users')
            console.log(err)
        }
    }

    removeUser = async (id) => {
        try {
            const { data } = await request.delete(`phonebooks/${id}`)
            if (data.success) {
                this.setState((state) => ({
                    users: state.users.filter((user) => user.id !== id)
                }))
            } else {
                alert('users not found')
            }
        } catch (error) {
            console.log(error)
        }
    }

    resendUser = async (id, name, phone) => {
        try {
            const { data } = await request.post('phonebooks', { name, phone })
            if (data.success) {
                this.setState((state) => ({
                    users: state.users.map(item => {
                        if (item.id === id) {
                            return { ...data.data, sent: true }
                        }
                        return item
                    })
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header text-center">
                        <h1>Phone Book Apps</h1>
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-primary" onClick={() => this.showAddUser()}><FontAwesomeIcon icon={faPlus} /> add</button>
                </div>
                <div className="card-body mt-3">
                    {this.state.showAdd ? <UserForm submit={this.addUser} cancel={this.hiddenAddUser} /> : null}
                </div>
                <div className="card-body mt-3">
                    <UserForm
                        search={this.searchUser} submitLabel=" search" fontlabel="Search Form"
                    />
                </div>
                <UserList
                    data={this.state.users}
                    update={this.updateUser}
                    remove={this.removeUser}
                    resend={this.resendUser}
                    loadMorePage={this.loadMore}
                />
            </div>
        )
    }
}