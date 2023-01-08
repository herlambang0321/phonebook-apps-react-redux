import React, { Component } from "react";
import UserForm from "../containers/UserForm";
import UserList from "../containers/UserList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class UserBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAdd: false,
        }
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

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header text-center">
                        <h1>Phone Book Apps</h1>
                    </div>
                </div>
                <div className="card-body mt-3">
                    {this.state.showAdd ? <UserForm cancel={this.hiddenAddUser} /> : <button type="submit" className="btn btn-primary" onClick={() => this.showAddUser()}><FontAwesomeIcon icon={faPlus} /> add</button>}
                </div>
                <div className="card-body mt-3">
                    <UserForm
                        search={this.searchUser} submitLabel=" search" fontlabel="Search Form"
                    />
                </div>
                <UserList />
            </div>
        )
    }
}