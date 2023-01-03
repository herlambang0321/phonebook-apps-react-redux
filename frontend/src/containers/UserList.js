import React, { Component } from "react";
import { loadUser } from "../actions/api";
import UserItem from "../components/UserItem"
import { connect } from 'react-redux'

class UserList extends Component {

    componentDidMount() {
        this.props.load()
    }

    scrolled = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            this.props.loadMorePage()
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

const mapStateToProps = (state, ownProps) => ({
    users: state.users
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    load: () => dispatch(loadUser())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)