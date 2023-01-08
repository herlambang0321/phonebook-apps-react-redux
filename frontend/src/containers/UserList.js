import React, { Component } from "react";
import { loadUser, removeUser, resendUser, updateUser, loadmoreUser } from "../actions/api";
import UserItem from "../components/UserItem"
import { connect } from 'react-redux'

class UserList extends Component {

    componentDidMount() {
        this.props.load()
    }

    scrolled = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            this.props.loadmore()
        }
    }

    render() {
        return (
            <div onScroll={this.scrolled} style={{ height: 200, overflowY: 'scroll' }}>
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map((user, index) => {
                            return (
                                <UserItem
                                    key={user.id}
                                    no={index + 1}
                                    user={user}
                                    sent={user.sent}
                                    update={(name, phone) => this.props.update(user.id, name, phone)}
                                    remove={() => this.props.remove(user.id)}
                                    resend={() => this.props.resend(user.id, user.name, user.phone)}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users.data
})

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(loadUser()),
    remove: (id) => dispatch(removeUser(id)),
    resend: (id, name, phone) => dispatch(resendUser(id, name, phone)),
    update: (id, name, phone) => dispatch(updateUser(id, name, phone)),
    loadmore: (id, name, phone) => dispatch(loadmoreUser(id, name, phone))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)