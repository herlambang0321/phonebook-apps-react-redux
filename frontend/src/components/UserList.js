import UserItem from "./UserItem"

export default function UserList(props) {
    const scrolled = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            props.loadMorePage()
        }
    }

    return (
        <div onScroll={scrolled} style={{ height: 200, overflowY: 'scroll' }}>
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
                    {props.data.map((user, index) => {
                        return (
                            <UserItem
                                key={user.id}
                                no={index + 1}
                                user={user}
                                update={(name, phone) => props.update(user.id, name, phone)}
                                remove={() => props.remove(user.id)}
                                resend={() => props.resend(user.id, user.name, user.phone)}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}