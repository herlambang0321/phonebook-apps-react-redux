import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan, faRepeat, faFloppyDisk, faBan } from '@fortawesome/free-solid-svg-icons'

export default class UserItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.user.name,
            phone: props.user.phone,
            isEdit: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleEdit = () => {
        this.setState({
            isEdit: true
        });
    }

    handleCancel = () => {
        this.setState({
            isEdit: false
        });
    }

    saveEdit = () => {
        this.props.update(this.state.name, this.state.phone)
        this.setState({
            isEdit: false
        });
    }

    render() {
        return (
            <tr>
                <td>{this.props.no}</td>
                <td>
                    {this.state.isEdit ?
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} />
                        :
                        this.state.name
                    }
                </td>
                <td>
                    {this.state.isEdit ?
                        <input type="text" className="form-control" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
                        :
                        this.state.phone
                    }
                </td>
                {this.props.user.sent ?
                    this.state.isEdit ?
                        <td>
                            <button type="button" className="btn btn-primary mx-1" onClick={this.saveEdit}><FontAwesomeIcon icon={faFloppyDisk} /> save</button>
                            <button className='btn btn-warning' type='button' onClick={this.handleCancel}><FontAwesomeIcon icon={faBan} style={{ transform: 'rotate(90deg' }} /> cancel</button>
                        </td>
                        :
                        <td>
                            <button type="button" className="btn btn-success mx-1" onClick={this.handleEdit}><FontAwesomeIcon icon={faPencil} /> edit</button>
                            <button className='btn btn-danger' type='button' onClick={this.props.remove}><FontAwesomeIcon icon={faTrashCan} /> delete</button>
                        </td>
                    :
                    <td>
                        <button className='btn btn-warning' type='button' onClick={this.props.resend}><FontAwesomeIcon icon={faRepeat} /> resend</button>
                    </td>
                }
            </tr >
        )
    }
}